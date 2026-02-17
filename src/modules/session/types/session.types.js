/**
* @typedef {"idle" | "running" | "pause" | "ended"} SessionStatus
*/

/**
 * @typedef {Object} Session
 * @property {string} id
 * @property {number} startTime
 * @property {number | null } endTime
 * @property {SessionStatus} status
 * @property {number} totalActiveDuration
 * @property {number} customLimitMs
 * @property {string} description
*/