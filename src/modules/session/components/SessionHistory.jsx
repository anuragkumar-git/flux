import React from "react";
import { fomatTime } from "../utils/formatTime";

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
            <div key={session.id} className="p-3 bg-gray-50 rounded-lg border">
              <p className="text-sm font-medium">Session {index + 1}</p>

              <p className="text-sm text-gray-500">
                {fomatTime(session.totalActiveDuration)}
              </p>

              <p className="text-sm mt-1">{session?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
