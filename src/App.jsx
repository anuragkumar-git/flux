import { useSession } from "./modules/session/hooks/useSession";
import SessionLayout from "./modules/session/components/SessionLayout";
import SessionTimer from "./modules/session/components/SessionTimer";
import SessionActions from "./modules/session/components/SessionActions";
import SessionHistory from "./modules/session/components/SessionHistory";

function App() {
  const { session, elapsed, dailySummary, start, resume, pause, end } =
    useSession();

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
          </div>
        }
        sidebar={<SessionHistory sessions={dailySummary?.sessions || []} />}
      />
    </>
  );
}

export default App;
