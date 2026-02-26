import { formatClockTime } from "../../../shared/utils/formatClockTime";
import { formatTime } from "../../../shared/utils/formatTime";

export default function SessionHistory({ sessions = [] }) {
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
 
          <div
            // key={session.id}
            className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-4 hover:bg-white transition-colors duration-200"
          >
            <table className="table-fixed">
              <thead>
                <tr>
                  <th>Today</th>                   
                </tr>
              </thead>
            
              <tbody>
                {sessions.map((session, index) => (
                  <tr key={session.id}>
                    <td className="text-sm px-2 font-semibold text-slate-700">{index + 1}</td>
                    <td className="text-sm px-2 text-slate-600">{session.description}</td>
                    <td className="text-xs px-2 text-slate-400">
                      {" "}
                      {formatClockTime(session.startTime)} –{" "}
                      {formatClockTime(session.endTime)}
                    </td>
                    <td className="text-sm   text-emerald-600 font-medium"> {formatTime(session.totalActiveDuration)}</td>
                  </tr>
                ))}
                {/* <td>Malcolm Lockyer</td>
                  <td>1961</td> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
