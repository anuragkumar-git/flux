import { db } from "./db";

/**
 * Save session to database
 */
export async function saveSession(session, dayId) {
    return db.sessions.add({
        ...session,
        dayId
    })
}

/**
 * Get sessions by day
 */
export async function getSessionbyDay(dayId) {
    return db.sessions
        .where("dayId")
        .equals(dayId)
        .toArray()
}

export async function getAllSessions() {
    return db.sessions.toArray();
}

export async function updateSessionDescription(id, description) {
    return db.sessions.update(id, { description })
}
