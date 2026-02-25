import { useState } from "react";
import { useSession } from "./modules/session/hooks/useSession";
import SessionLayout from "./modules/session/components/SessionLayout";
import SessionTimer from "./modules/session/components/SessionTimer";
import SessionActions from "./modules/session/components/SessionActions";
import SessionHistory from "./modules/session/components/SessionHistory";
import { formatTime } from "./shared/utils/formatTime";

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
              <>
                <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">
                        Sessions
                      </p>
                      <p className="text-3xl font-semibold text-slate-800">
                        {dailySummary.totalSessions}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide">
                        Time
                      </p>
                      <p className="text-3xl font-semibold text-slate-800">
                        {formatTime(dailySummary.totalDuration)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        }
        sidebar={<SessionHistory sessions={dailySummary?.sessions || []} />}
      />
    </>
  );
}

export default App;
