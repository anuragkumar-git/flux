import { formatClockTime } from "../utils/formatClockTime";
import { formatTime } from "../utils/formatTime";
import { formatDayLabel } from "../utils/formatDayLabel";
import { useEffect, useRef, useState } from "react";

export default function SessionHistory({ allDaysHistory, onClearHistory, onUpdateDescription }) {
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);
  const cancelEditRef = useRef(false);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.select();
    }
  }, [editingId]);

  const commitEdit = async (session) => {
    if (cancelEditRef.current) {
      cancelEditRef.current = false;
      setEditingId(null);
      return;
    }

    const description = editValue.trim();
    if (description !== session.description) {
      await onUpdateDescription(session.id, description);
    }
    setEditingId(null);
  };

  return (
    <>
      <div>
        <div className="space-y-3">
          {allDaysHistory.length === 0 && (
            <p className="mr-25 text-sm text-slate-500 sm:mr-35">No session yet.</p>
          )}

          {allDaysHistory.map((day) => (
            <div
              key={day.dayId}
              className="rounded-2xl border border-blue-100/10 bg-slate-900/60 p-4 backdrop-blur-sm transition-colors duration-200 hover:bg-slate-800/70"
            >
              <div className="flex justify-between px-1">
                <h3 className="text-lg font-semibold text-slate-100">
                  {formatDayLabel(day.dayId)}
                </h3>
                <span className="mt-2 text-xs text-blue-100/50">
                  {formatTime(day.totalDuration)}
                </span>
              </div>
              <table className="table-fixed mt-1">
                <tbody>
                  {day.sessions.map((session, index) => (
                    <tr key={session.id}>
                      <td className="px-2 text-sm font-semibold text-blue-100/80">
                        {index + 1}
                      </td>
                      <td className="px-2 py-1 text-sm text-slate-300">
                        {editingId === session.id ? (
                          <input
                            name="description"
                            ref={inputRef}
                            autoFocus
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => commitEdit(session)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                e.currentTarget.blur();
                              }
                              if (e.key === "Escape") {
                                cancelEditRef.current = true;
                                e.currentTarget.blur();
                              }
                            }}
                            className="w-15 rounded border border-blue-200/20 bg-slate-950/80 px-2 py-1 text-slate-100 shadow-sm outline-none transition focus:border-blue-300/55 md:w-35"
                          />
                        ) : (
                          <span
                            onClick={() => {
                              cancelEditRef.current = false;
                              setEditingId(session.id);
                              setEditValue(session.description ?? "");
                            }}
                            className="w-full rounded px-2 py-1 transition hover:bg-blue-200/5 focus:outline-none focus:ring-2 focus:ring-blue-400/60"
                          >
                            {session?.description}
                          </span>
                        )}
                      </td>
                      <td className="px-2 text-xs text-slate-500">
                        {" "}
                        {formatClockTime(session.startTime)} –{" "}
                        {formatClockTime(session.endTime)}
                      </td>
                      <td className="text-sm font-medium text-cyan-300">
                        {" "}
                        {formatTime(session.totalActiveDuration)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          {allDaysHistory.length > 0 && (
            <button
              className="text-sm text-slate-500 transition hover:text-rose-300"
              onClick={onClearHistory}
            >
              Clear History
            </button>
          )}
        </div>
      </div>
    </>
  );
}
