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
   * Returns current active session
   */
    getCurrentSession() {
        return this.currentSession
    }

    /**
     * Starts a new session
     * @param {string} description
     * @param {number} customLimitMs
     */
    startSession(description, customLimitMs = 3 * 60 * 60 * 1000) {
        if (this.currentSession && this.currentSession.status === "running") {
            throw new Error("Session already running")
        }

        const now = Date.now()

        this.currentSession = {
            id: crypto.randomUUID(),
            startTime: now,
            endTime: null,
            status: "running",
            totalActiveDuration: 0,
            customLimitMs,
            description
        }

        this.pauseStartedAt = null;
        this.accumulatedPauseTime = 0

        return this.currentSession;
    }

}