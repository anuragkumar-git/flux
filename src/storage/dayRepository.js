import { db } from "./db"

/**
 * Create or get existing day
 */
export async function ensureDayExists(dayId) {
    await db.days.put({
        id: dayId,
        date: dayId
    })
}

/**
 * Get all days
 */
export async function getAllDays() {
    return db.days.toArray()
}
