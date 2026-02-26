const PAUSE_TIME_MS = 10 * 60 * 1000; //10 minutes

/**
 * Session Engine
 * Manages only ONE active session at a time.
 */
export class SessionEngine {
    constructor() {
        this.currentSession = null;
        this.pauseStartedAt = null
        this.accumulatedPauseTime = 0
    }


    /**
     * Starts a new session
     * @param {string} description
     * @param {number} customLimitMs
     */
    startSession(description, customLimitMs = 9 * 60 * 60 * 1000) {

        if (this.currentSession && this.currentSession.status === "running") {
            throw new Error("Session already running")
        }

        const now = Date.now()

        this.currentSession = {
            // id: crypto.randomUUID(),
            id: Date.now(),
            startTime: now,
            endTime: null,
            status: "running",
            totalActiveDuration: 0,
            customLimitMs,
            description,
        }

        this.pauseStartedAt = null;
        this.accumulatedPauseTime = 0

        return this.currentSession;
    }

    /**
     *  Pause current session
     */
    pauseSession() {

        if (!this.currentSession || this.currentSession.status !== "running") {

            throw new Error("No running session to pause")
        }
        this.pauseStartedAt = Date.now()
        this.currentSession.status = "pause"

        return this.currentSession
    }

    /**
     *  resume currently paused session
     */
    resumeSession() {
        if (!this.currentSession || this.currentSession.status !== "pause") {

            throw new Error("No paused session to resume")
        }


        const now = Date.now()
        const pauseDuration = now - this.pauseStartedAt

        if (pauseDuration > PAUSE_TIME_MS) {
            return this.endedSession("pause-timeout")
        }

        this.accumulatedPauseTime += pauseDuration
        this.pauseStartedAt = null
        this.currentSession.status = "running"

        return this.currentSession
    }

    /**
    *  getElapsedTime
    */
    getElapsedTime() {
        if (!this.currentSession) return 0

        const now = Date.now();

        if (this.currentSession.status === "running") {
            return (
                now -
                this.currentSession.startTime -
                this.accumulatedPauseTime)
        }

        if (this.currentSession.status === "pause") {
            return (
                this.pauseStartedAt -
                this.currentSession.startTime -
                this.accumulatedPauseTime
            )
        }

        if (this.currentSession.status === "ended") {
            return this.currentSession.totalActiveDuration
        }

        return 0
    }

    /**
   *  End currently active session
   */
    endedSession(reason = "manual") {
        if (!this.currentSession) {
            throw new Error("No active session to end")
        }

        const now = Date.now()

        let finalDuration

        if (this.currentSession.status === "running") {
            finalDuration =
                now -
                this.currentSession.startTime -
                this.accumulatedPauseTime
        } else if (this.currentSession.status === "pause") {
            finalDuration =
                this.pauseStartedAt -
                this.currentSession.startTime -
                this.accumulatedPauseTime
        } else {
            return this.currentSession
        }

        this.currentSession.endTime = now;
        this.currentSession.status = "ended"
        this.currentSession.totalActiveDuration = finalDuration
        this.currentSession.endedReason = reason

        return this.currentSession
    }

    /**
   * Returns current active session
   */
    getCurrentSession() {
        if (!this.currentSession) return null

        if (this.currentSession.status === "running" && this.isLimitReached()) {
            return this.endedSession("session-timout")
        }
        // Check midnight crossing
        if (this.currentSession.status === "running" && this.hasCrossedMidnight()) {
            return this.endedSession("midnight")
        }

        if (this.currentSession.status === "pause") {

            const now = Date.now()
            const pauseDuration = now - this.pauseStartedAt

            if (pauseDuration > PAUSE_TIME_MS) {
                return this.endedSession("pause-timeout")
            }
        }

        return this.currentSession
    }

    /**
    * Checks time limit of current active session
    */
    isLimitReached() {
        if (!this.currentSession) return null

        const elapsed = this.getElapsedTime()
        return elapsed >= this.currentSession.customLimitMs
    }

    /**
    * Detect Midnight current active session
    */
    hasCrossedMidnight() {
        if (!this.currentSession) return null

        const startDate = new Date(this.currentSession.startTime)
        const nowDate = new Date()

        return (
            startDate.getFullYear() !== nowDate.getFullYear() ||
            startDate.getMonth() !== nowDate.getMonth() ||
            startDate.getDate() !== nowDate.getDate()
        )
    }
}