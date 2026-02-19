import Dexie from "dexie";

export const db = new Dexie("FluxDB")

db.version(1).stores({
    sessions: "id, dayId, startTime, endTime",
    days: "id, date"
})