import { formatTime } from "../../../shared/utils/formatTime";

export default function SessionHistory({ sessions = [] }) {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold mb-4">Today</h3>

        <div className="space-y-3">
          {sessions.length === 0 && (
            <p className="text-sm text-gray-500">No session yet.</p>
          )}

          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="bg-white/70 backdrop-blur-sm border border-slate-200 rounded-xl p-4 hover:bg-white transition-colors duration-200"
            >
              <p className="text-sm font-semibold text-slate-700">
                Session {index + 1}
              </p>
              <p className="text-sm mt-1">{session?.endedReason}</p>
              <p className="text-sm mt-1 text-emerald-600 font-medium">
                {formatTime(session.totalActiveDuration)}
              </p>

              <p className="text-sm mt-1 text-slate-600">
                {session.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
