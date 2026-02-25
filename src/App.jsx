import { useState } from "react";
import { useSession } from "./modules/session/hooks/useSession";
import SessionLayout from "./modules/session/components/SessionLayout";
import SessionTimer from "./modules/session/components/SessionTimer";
import SessionActions from "./modules/session/components/SessionActions";
import SessionHistory from "./modules/session/components/SessionHistory";

function App() {
  const {
    session,
    elapsed,
    dailySummary,
    showDecsriptionInput,
    start,
    resume,
    pause,
    end,
    requestEnd,
    confirmEnd,
  } = useSession();

  const [description, setDescription] = useState("");

  // const handleConfirmEnd = async () => {
  //   await confirmEnd(description);
  //   setDescription("");
  // };
  return (
    <>
      <SessionLayout
        main={
          <div className="space-y-6">
            <SessionTimer session={session} elapsed={elapsed} />
            <SessionActions
              session={session}
              onStart={start}
              onPause={pause}
              onResume={resume}
              onEnd={end}
            />

            {/* {showDecsriptionInput && (
              <div className="bg-white p-4 rounded-xl shadow space-y-3">
                <input
                  type="text"
                  placeholder="What did you work on?"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="w-full border rounded-lg px-3 py-2"
                  name="descriptionInput"
                />
                <button
                  onClick={handleConfirmEnd}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  Save Session
                </button>
              </div>
            )} */}

            {dailySummary && (
              <div className="bg-white rounded-xl shadow p-4">
                <h3 className="text-sm text-gray-500 uppercase mb-2">
                  Today's Summary
                </h3>

                <p className="text-lg font-semibold">
                  Total sessions: {dailySummary?.totalSessions}
                </p>
                <p className="text-lg font-semibold">
                  Total Time:{" "}
                  {dailySummary?.totalDuration
                    ? new Date(dailySummary?.totalDuration)
                        .toISOString()
                        .slice(11, 19)
                    : "00:00:00"}
                </p>
              </div>
            )}
          </div>
        }
        sidebar={<SessionHistory sessions={dailySummary?.sessions || []} />}
      />
    </>
  );
}

export default App;
