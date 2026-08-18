import { formatTime } from "../utils/formatTime";

export default function SessionTimer({ elapsed, dailySummary }) {
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
          {formatTime(dailySummary?.totalDuration ?? 0)}
        </p>
        
      </div>
    </>
  );
}
