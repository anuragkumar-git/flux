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
    clearHistory,
  } = useSession();

  return (
    <>
      <SessionLayout
        main={
          <div className="space-y-6">
            <CurrentDateTime />
            <SessionTimer
              session={session}
              elapsed={elapsed}
              dailySummary={dailySummary}
            />
            <SessionActions
              session={session}
              onStart={start}
              onPause={pause}
              onResume={resume}
              onEnd={end}
            />
            {error && <p className="text-center text-sm text-rose-300">{error.message}</p>}
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
