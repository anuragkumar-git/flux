import { formatClockTime } from "../../../shared/utils/formatClockTime";
import { formatTime } from "../../../shared/utils/formatTime";
import { formatDayLabel } from "../../../shared/utils/formatDayLabel";
import { useSession } from "../hooks/useSession";
import { useEffect, useRef, useState } from "react";
import { sessionService } from "../../../services/sessionService";

export default function SessionHistory({ sessions = [] }) {
  const { allDaysHistory } = useSession();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.select();
    }
  }, [editingId]);

  return (
    <>
      <div>
        {/* <h3 className="text-lg font-semibold mb-4">Today</h3> */}

        <div className="space-y-3">
          {sessions.length === 0 && (
            <p className="text-sm text-gray-500">No session yet.</p>
          )}

          {/* {sessions.map((session, index) => (
            <div
              key={session.id}
              className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-4 hover:bg-white transition-colors duration-200"
            >
              <p className="text-sm font-semibold text-slate-700">
                Session {index + 1}
              </p>
              <p className="text-xs mt-1 text-slate-400">
                {formatClockTime(session.startTime)} –{" "}
                {formatClockTime(session.endTime)}
              </p>
              <p className="text-sm mt-1 text-emerald-600 font-medium">
                {formatTime(session.totalActiveDuration)}
              </p>

              <p className="text-sm mt-1 text-slate-600">
                {session.description}
              </p>
            </div>
          ))}*/}

          {allDaysHistory.map((day, i) => (
            <div
              key={day.dayId}
              className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-4 hover:bg-white transition-colors duration-200"
            >
              <div className="flex justify-between px-1">
                <h3 className="text-lg font-semibold">
                  {i === 0 ? "Today" : formatDayLabel(day.dayId)}
                </h3>
                <span className="mt-2 text-xs text-slate-500 ">
                  {formatTime(day.totalDuration)}
                </span>
              </div>
              <table className="table-fixed mt-1">
                <tbody>
                  {day.sessions.map((session, index) => (
                    <tr key={session.id}>
                      <td className="text-sm px-2 font-semibold text-slate-700">
                        {index + 1}
                      </td>
                      <td className="text-sm px-2 py-1 text-slate-600">
                        {editingId === session.id ? (
                          <input
                            ref={inputRef}
                            autoFocus
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={async () => {
                              if (editValue.trim()) {
                                await sessionService.updateDescription(
                                  session.id,
                                  editValue.trim(),
                                );
                              }
                              setEditingId(null);
                            }}
                            onKeyDown={async (e) => {
                              if (e.key === "Enter") {
                                console.log(editValue);

                                if (editValue.trim()) {
                                  await sessionService.updateDescription(
                                    session.id,
                                    editValue.trim(),
                                  );
                                }
                                setEditingId(null);
                              }
                              if (e.key === "Escape") {
                                setEditingId(null);
                              }
                            }}
                            className="shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 focus:outline-none focus:ring-0 focus:rounded"
                          />
                        ) : (
                          <span
                            onClick={() => {
                              setEditingId(session.id);
                              setEditValue(session.description);
                            }}
                            className=" rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            {session?.description}
                          </span>
                        )}
                      </td>
                      <td className="text-xs px-2 text-slate-400">
                        {" "}
                        {formatClockTime(session.startTime)} –{" "}
                        {formatClockTime(session.endTime)}
                      </td>
                      <td className="text-sm   text-emerald-600 font-medium">
                        {" "}
                        {formatTime(session.totalActiveDuration)}
                      </td>
                    </tr>
                  ))}
                  {/* <td>Malcolm Lockyer</td>
                  <td>1961</td> */}
                </tbody>
              </table>
              {/* <div className="mt-3 text-xs text-slate-500 flex justify-between">
                <span></span>
                <span className="text-xs text-slate-500 ">{formatTime(day.totalDuration)}</span>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
