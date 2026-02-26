import { formatClockTime } from "../../../shared/utils/formatClockTime";
import { formatTime } from "../../../shared/utils/formatTime";
import { formatDayLabel } from "../../../shared/utils/formatDayLabel";
import { useSession } from "../hooks/useSession";

export default function SessionHistory({ sessions = [] }) {
  const { allDaysHistory } = useSession();
  // console.log("Db:26-02-2026", formatDayLabel("26-02-2026"));
  // console.log("not string 26-02-2026", formatDayLabel(26-02-2026));
  // console.log("2026-26-02", formatDayLabel("2026-26-02"));
  // console.log("2026-02-26", formatDayLabel("2026-02-26"));

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
                      <td className="text-sm px-2 text-slate-600">
                        {session.description}
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
