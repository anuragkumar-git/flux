import { db } from "./db";

/**
 * Save session to database
 */
export async function saveSession(session, dayId) {
    return db.transaction("rw", db.days, db.sessions, db.activeSessions, async () => {
        await db.days.put({ id: dayId, date: dayId })
        await db.sessions.put({
            ...session,
            dayId
        })
        const activeSession = await db.activeSessions.get("current")
        if (activeSession?.currentSession?.id === session.id) {
            await db.activeSessions.delete("current")
        }
    })
}

/**
 * Get sessions by day
 */
export async function getSessionbyDay(dayId) {
    return db.sessions
        .where("dayId")
        .equals(dayId)
        .sortBy("startTime")
}

export async function getAllSessions() {
    return db.sessions.orderBy("startTime").toArray();
}

export async function updateSessionDescription(id, description) {
    return db.sessions.update(id, { description })
}

export async function clearHistory() {
    return db.transaction(
        "rw",
        db.sessions,
        db.days,
        db.activeSessions,
        async () => {
            const activeSession = await db.activeSessions.get("current");

            const status = activeSession?.currentSession?.status;

            if (status === "running" || status === "pause") {
                throw new Error(
                    "End the active session before clearing history"
                );
            }

            await db.sessions.clear();
            await db.days.clear();
            await db.activeSessions.clear();

        }
    );
}

export async function getActiveSession() {
    return db.activeSessions.get("current")
}

export async function saveActiveSession(snapshot) {
    return db.transaction("rw", db.activeSessions, async () => {
        const existing = await db.activeSessions.get("current")
        const existingId = existing?.currentSession?.id
        const nextId = snapshot?.currentSession?.id

        if (existingId && existingId !== nextId) {
            throw new Error("A session is already active in another tab")
        }

        await db.activeSessions.put({ id: "current", ...snapshot })
    })
}
