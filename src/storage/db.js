import Dexie from "dexie";

export const db = new Dexie("FluxDB")

db.version(1).stores({
    sessions: "id, dayId, startTime, endTime",
    days: "id, date"
})

const toIsoDayId = (dayId) => {
    if (!/^\d{2}-\d{2}-\d{4}$/.test(dayId)) return dayId

    const [day, month, year] = dayId.split("-")
    return `${year}-${month}-${day}`
}

// Version 2 adds crash/reload-safe active session storage and normalizes the
// historical day key so a string sort is chronological.
db.version(2)
    .stores({
        sessions: "id, dayId, startTime, endTime",
        days: "id, date",
        activeSessions: "id"
    })
    .upgrade(async (tx) => {
        const sessions = await tx.table("sessions").toArray()
        const normalizedSessions = sessions.map((session) => ({
            ...session,
            dayId: toIsoDayId(session.dayId)
        }))

        await tx.table("sessions").bulkPut(normalizedSessions)

        const dayIds = [...new Set(normalizedSessions.map((session) => session.dayId))]
        await tx.table("days").clear()
        await tx.table("days").bulkPut(dayIds.map((id) => ({ id, date: id })))
    })
