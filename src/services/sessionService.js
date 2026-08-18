import { SessionEngine } from "../modules/session/engine/sessionEngine";
import {
    clearHistory,
    getActiveSession,
    getAllSessions,
    getSessionbyDay,
    saveActiveSession,
    saveSession,
    updateSessionDescription,
} from "../storage/sessionRepository";

class SessionService {
    constructor() {
        this.engine = new SessionEngine();
        this.initialized = false;
        this.initializePromise = null;
        this.finalizingSessionId = null;
        this.finalizePromise = null;
    }

    async initialize() {
        if (this.initialized) return;
        if (this.initializePromise) return this.initializePromise;

        this.initializePromise = (async () => {
            const snapshot = await getActiveSession();
            this.engine.restoreSnapshot(snapshot);
            this.initialized = true;

            const current = this.engine.getCurrentSession();
            if (current?.status === "ended") {
                await this.persistEndedSession(current);
            }
        })();

        try {
            await this.initializePromise;
        } finally {
            this.initializePromise = null;
        }
    }

    async start(description = "Untitled Session", customLimitMs) {
        await this.initialize();
        const session = this.engine.startSession(description, customLimitMs);
        try {
            await this.saveActiveState();
        } catch (error) {
            this.engine.clearSession();
            throw error;
        }
        return session;
    }

    async pause() {
        await this.initialize();
        const session = this.engine.pauseSession();
        await this.saveActiveState();
        return session;
    }

    async resume() {
        await this.initialize();
        const session = this.engine.resumeSession();

        if (session.status === "ended") {
            await this.persistEndedSession(session);
        } else {
            await this.saveActiveState();
        }

        return session;
    }

    async getCurrentSession() {
        await this.initialize();
        const session = this.engine.getCurrentSession();

        if (session?.status === "ended") {
            await this.persistEndedSession(session);
        }

        return session;
    }

    async end({ reason = "manual", description } = {}) {
        await this.initialize();
        const endedSession = this.engine.endedSession(reason);

        if (description !== undefined) {
            endedSession.description = description;
        }

        await this.persistEndedSession(endedSession);
        return endedSession;
    }

    getDayIdFromTimestamp(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    async saveActiveState() {
        const snapshot = this.engine.getSnapshot();
        if (snapshot) await saveActiveSession(snapshot);
    }

    async persistEndedSession(session) {
        if (!session || session.status !== "ended") return;

        if (this.finalizingSessionId === session.id) {
            return this.finalizePromise;
        }

        const dayId = this.getDayIdFromTimestamp(session.startTime);
        this.finalizingSessionId = session.id;
        this.finalizePromise = saveSession(session, dayId);

        try {
            await this.finalizePromise;
        } finally {
            this.finalizingSessionId = null;
            this.finalizePromise = null;
        }
    }

    async getDailySummary(dayId) {
        const sessions = await getSessionbyDay(dayId);
        const totalDuration = sessions.reduce(
            (sum, session) => sum + (Number(session.totalActiveDuration) || 0),
            0
        );

        return {
            dayId,
            totalDuration,
            totalSessions: sessions.length,
            sessions,
        };
    }

    getElapsedTime() {
        return this.engine.getElapsedTime();
    }

    isLimitReached() {
        return this.engine.isLimitReached();
    }

    async hasActiveSession() {
        await this.initialize();
        const session = await this.getCurrentSession();
        return ["running", "pause"].includes(session?.status);
    }

    async getAllDaysWithSessions() {
        const sessions = await getAllSessions();
        const dayMap = new Map();

        sessions.forEach((session) => {
            if (!dayMap.has(session.dayId)) {
                dayMap.set(session.dayId, {
                    dayId: session.dayId,
                    totalDuration: 0,
                    totalSessions: 0,
                    sessions: [],
                });
            }

            const day = dayMap.get(session.dayId);
            day.sessions.push(session);
            day.totalDuration += Number(session.totalActiveDuration) || 0;
            day.totalSessions += 1;
        });

        return [...dayMap.values()].sort((a, b) => b.dayId.localeCompare(a.dayId));
    }

    async updateDescription(id, description) {
        const updatedCount = await updateSessionDescription(id, description);
        if (updatedCount !== 1) {
            throw new Error("The session no longer exists in history");
        }
    }

    async clearHistory() {
        if (this.finalizePromise) {
            await this.finalizePromise;
        }
        if (await this.hasActiveSession()) {
            throw new Error("End the active session before clearing history");
        }
        await clearHistory();
    }
}

export const sessionService = new SessionService();
