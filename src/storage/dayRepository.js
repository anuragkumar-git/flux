import { db } from "./db"

/**
 * Create or get existing day
 */
export async function ensureDayExists(dayId) {
    const exsists = await db.days.get(dayId)

    if (!exsists) {
        await db.days.add({
            id: dayId,
            date: dayId
        })
    }
}

/**
 * Get all days
 */
export async function getAllDays() {
    return db.days.toArray()
}