import { SessionEngine } from "../modules/session/engine/sessionEngine";
import { ensureDayExists } from "../storage/dayRepository";
import { getSessionbyDay, saveSession } from "../storage/sessionRepository";

/**
 * SessionService
 * Coordinates Engine + Storage
 */
class SessionService {
    constructor() {
        this.engine = new SessionEngine();
        this.hasPersistedCurrentSession = false
    }
    /**
    * Start new session
    */
    start(description, customLimitMs) {
        this.hasPersistedCurrentSession = false
        return this.engine.startSession(description, customLimitMs);
    }

    /**
     * Pause session
     */
    pause() {
        return this.engine.pauseSession();
    }

    /**
     * Resume session
     */
    resume() {
        return this.engine.resumeSession();
    }

    /**
     * Get Current session
     */
    async getCurrentSession() {
        const session = this.engine.getCurrentSession()
        if (!session) return null

        if (session.status === "ended" && !this.hasPersistedCurrentSession) {
            await this.persistSession(session)
            this.hasPersistedCurrentSession = true
        }
        return session
    }

    /**
     * End session and persist it
     */
    async end(reason = "manual") {
        const endedSession = this.engine.endedSession(reason)

        if (!this.hasPersistedCurrentSession) {
            await this.persistSession(endedSession)
            this.hasPersistedCurrentSession = true
        }

        return endedSession
    }

    /**
    * Utility: Generate dayId in YYYY-MM-DD format
    */
    getDayIdFromTimeStemp(timeStemp) {

        const date = new Date(timeStemp)

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")

        return `${day}-${month}-${year}`;
    }

    async persistSession(session) {
        const dayId = this.getDayIdFromTimeStemp(session.startTime)

        await ensureDayExists(dayId)
        await saveSession(session, dayId)
    }

    async getDailySummary(dayId) {
        const sessions = await getSessionbyDay(dayId)

        const totalDuration = sessions.reduce((sum, session) => sum + session.totalActiveDuration, 0)

        return {
            dayId,
            totalDuration,
            totalSessions: sessions.length,
            sessions
        }
    }

    getElapsedTime() {
        return this.engine.getElapsedTime();
    }

    isLimitReached() {
        return this.engine.isLimitReached();
    }
}


export const sessionService = new SessionService()