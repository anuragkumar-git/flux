/**
 * Session Engine
 * Owns the in-memory session state.
 * Persistence is handled by SessionService.
 */

export class SessionEngine {
    constructor() {
        this.currentSession = null;
        this.pauseStartedAt = null;
        this.accumulatedPauseTime = 0;
    }

    /**
     * Start a new session.
     *
     * customLimitMs:
     * - null / undefined = unlimited session
     * - positive number = limited session
     */
    startSession(description = "Untitled Session", customLimitMs = null) {
        if (
            this.currentSession &&
            ["running", "pause"].includes(this.currentSession.status)
        ) {
            throw new Error("Finish or resume the active session first");
        }

        if (
            customLimitMs !== null &&
            customLimitMs !== undefined &&
            (!Number.isFinite(customLimitMs) || customLimitMs <= 0)
        ) {
            throw new Error("Session limit must be a positive duration");
        }

        const now = Date.now();

        this.currentSession = {
            id: crypto.randomUUID(),
            startTime: now,
            endTime: null,
            status: "running",
            totalActiveDuration: 0,
            customLimitMs: customLimitMs ?? null,
            description,
        };

        this.pauseStartedAt = null;
        this.accumulatedPauseTime = 0;

        return this.currentSession;
    }

    pauseSession() {
        if (
            !this.currentSession ||
            this.currentSession.status !== "running"
        ) {
            throw new Error("No running session to pause");
        }

        this.pauseStartedAt = Date.now();
        this.currentSession.status = "pause";

        return this.currentSession;
    }

    resumeSession() {
        if (
            !this.currentSession ||
            this.currentSession.status !== "pause"
        ) {
            throw new Error("No paused session to resume");
        }

        const session = this.getCurrentSession();

        if (session.status === "ended") {
            return session;
        }

        const now = Date.now();

        this.accumulatedPauseTime += now - this.pauseStartedAt;
        this.pauseStartedAt = null;
        this.currentSession.status = "running";

        return this.currentSession;
    }

    updateDescription(description) {
        if (!this.currentSession) {
            throw new Error("No active session");
        }

        if (this.currentSession.status !== "pause") {
            throw new Error("Pause the session before editing its name");
        }

        const nextDescription = String(description ?? "").trim();

        if (!nextDescription) {
            throw new Error("Session name cannot be empty");
        }

        this.currentSession.description = nextDescription;

        return this.currentSession;
    }

    /**
     * Returns actual active session time.
     *
     * Paused time is excluded.
     */
    getElapsedTime(now = Date.now()) {
        if (!this.currentSession) return 0;

        if (this.currentSession.status === "running") {
            return Math.max(
                0,
                now -
                this.currentSession.startTime -
                this.accumulatedPauseTime
            );
        }

        if (this.currentSession.status === "pause") {
            return Math.max(
                0,
                this.pauseStartedAt -
                this.currentSession.startTime -
                this.accumulatedPauseTime
            );
        }

        return this.currentSession.status === "ended"
            ? this.currentSession.totalActiveDuration
            : 0;
    }

    endedSession(reason = "manual", endTime = Date.now()) {
        if (!this.currentSession) {
            throw new Error("No active session to end");
        }

        if (this.currentSession.status === "ended") {
            return this.currentSession;
        }

        const activeEndTime =
            this.currentSession.status === "pause"
                ? this.pauseStartedAt
                : endTime;

        this.currentSession.endTime = Math.max(
            this.currentSession.startTime,
            endTime
        );

        this.currentSession.status = "ended";

        this.currentSession.totalActiveDuration = Math.max(
            0,
            activeEndTime -
            this.currentSession.startTime -
            this.accumulatedPauseTime
        );

        this.currentSession.endedReason = reason;

        return this.currentSession;
    }

    /**
     * Resolve the current session state.
     *
     * Possible automatic endings:
     * 1. Custom session limit
     * 2. Midnight
     *
     * There is intentionally NO pause timeout.
     */
    getCurrentSession(now = Date.now()) {
        if (
            !this.currentSession ||
            this.currentSession.status === "ended"
        ) {
            return this.currentSession;
        }

        const midnight = this.getNextMidnightTimestamp();

        if (this.currentSession.status === "running") {
            /**
             * LIMITED SESSION
             *
             * Only calculate a session limit when one was explicitly set.
             */
            if (this.currentSession.customLimitMs !== null) {
                const limitAt =
                    this.currentSession.startTime +
                    this.accumulatedPauseTime +
                    this.currentSession.customLimitMs;

                if (now >= limitAt && limitAt <= midnight) {
                    return this.endedSession(
                        "session-timeout",
                        limitAt
                    );
                }
            }

            /**
             * Both limited and unlimited sessions
             * end at midnight.
             */
            if (now >= midnight) {
                return this.endedSession("midnight", midnight);
            }
        }

        /**
         * PAUSED SESSION
         *
         * Pause no longer has a 10-minute timeout.
         * It remains paused until:
         * - Resume
         * - Manual End
         * - Midnight
         */
        if (this.currentSession.status === "pause") {
            if (now >= midnight) {
                return this.endedSession("midnight", midnight);
            }
        }

        return this.currentSession;
    }

    getNextMidnightTimestamp() {
        const midnight = new Date(this.currentSession.startTime);

        midnight.setHours(24, 0, 0, 0);

        return midnight.getTime();
    }

    getSnapshot() {
        if (!this.currentSession) return null;

        return {
            currentSession: {
                ...this.currentSession,
            },
            pauseStartedAt: this.pauseStartedAt,
            accumulatedPauseTime: this.accumulatedPauseTime,
        };
    }

    restoreSnapshot(snapshot) {
        if (!snapshot?.currentSession) return;

        this.currentSession = snapshot.currentSession;
        this.pauseStartedAt = snapshot.pauseStartedAt;
        this.accumulatedPauseTime =
            snapshot.accumulatedPauseTime ?? 0;
    }

    clearSession() {
        this.currentSession = null;
        this.pauseStartedAt = null;
        this.accumulatedPauseTime = 0;
    }

    hasActiveSession() {
        return ["running", "pause"].includes(
            this.currentSession?.status
        );
    }

    isLimitReached() {
        if (
            !this.currentSession ||
            this.currentSession.status !== "running" ||
            this.currentSession.customLimitMs === null
        ) {
            return false;
        }

        return (
            this.getElapsedTime() >=
            this.currentSession.customLimitMs
        );
    }
}