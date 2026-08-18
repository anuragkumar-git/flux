import { useEffect, useState } from "react";
import { useSession } from "./modules/session/hooks/useSession";
import SessionLayout from "./modules/session/components/SessionLayout";
import SessionTimer from "./modules/session/components/SessionTimer";
import SessionActions from "./modules/session/components/SessionActions";
import SessionHistory from "./modules/session/components/SessionHistory";
import CurrentDateTime from "./modules/session/components/CurrentDateTime";

function App() {
  const {
    session,
    elapsed,
    dailySummary,
    allDaysHistory,
    error,
    start,
    resume,
    pause,
    end,
    updateDescription,
    updateCurrentDescription,
    clearHistory,
  } = useSession();

  const [customLimitMs, setCustomLimitMs] = useState(null);
  const [sessionName, setSessionName] = useState("Focus Session");

  useEffect(() => {
    if (session?.status === "ended") {
      setCustomLimitMs(null);
      setSessionName("Focus Session");
    }
  }, [session?.status]);

  const handleStart = () => {
    start(sessionName.trim() || "Focus Session", customLimitMs);
  };

  return (
    <>
      <SessionLayout
        session={session}
        customLimitMs={customLimitMs}
        onSetCustomLimit={setCustomLimitMs}
        sessionName={sessionName}
        onSetSessionName={setSessionName}
        onUpdateCurrentDescription={updateCurrentDescription}
        main={
          <div className="sm:space-y-6">
            <CurrentDateTime />

            <SessionTimer
              session={session}
              elapsed={elapsed}
              dailySummary={dailySummary}
              onUpdateDescription={updateCurrentDescription}
            />

            <SessionActions
              session={session}
              onStart={handleStart}
              onPause={pause}
              onResume={resume}
              onEnd={end}
            />

            {error && (
              <p className="text-center text-sm text-rose-300">
                {error.message}
              </p>
            )}
          </div>
        }
        sidebar={
          <SessionHistory
            allDaysHistory={allDaysHistory}
            onClearHistory={clearHistory}
            onUpdateDescription={updateDescription}
          />
        }
      />
    </>
  );
}

export default App;
