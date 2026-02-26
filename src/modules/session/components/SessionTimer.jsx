import { formatTime } from "../../../shared/utils/formatTime";
import { useSession } from "../hooks/useSession";

export default function SessionTimer({ session, elapsed }) {
  const status = session?.status || "idle";
  const statusStyles = {
    running: "text-emerald-600",
    pause: "text-amber-500",
    idle: "text-slate-400",
    ended: "text-slate-400",
  };
  const { dailySummary } = useSession();
  

  return (
    <>
      <div className="text-center space-y-4">
        {/* <p
          className={`text-sm uppercase tracking-widest ${statusStyles[status]}`}
        >
          {status}
        </p> */}

        <h2
          className={`text-6xl md:text-7xl font-mono font-semibold tracking-tight`}
        >
          {formatTime(elapsed)}
        </h2>
        <p className="text-2xl  font-mono tracking-tight  text-slate-800">
          {formatTime(dailySummary?.totalDuration)}
        </p>
        
      </div>
    </>
  );
}
