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
 * @property {number | null} customLimitMs
 * @property {string} description
*/