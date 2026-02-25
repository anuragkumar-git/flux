import { formatTime } from "../../../shared/utils/formatTime";

export default function SessionTimer({ session, elapsed }) {
  const status = session?.status || "idle";
  const statusStyles = {
    running: "text-emerald-600",
    pause: "text-amber-500",
    idle: "text-slate-400",
    ended: "text-slate-400",
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-8 md:p-17 lg:p-20 text-center space-y-4">
        <p
          className={`text-sm uppercase tracking-widest ${statusStyles[status]}`}
        >
          {status}
        </p>

        <h2 className={`text-4xl md:text-7xl font-mono font-semibold tracking-tight`}>
          {formatTime(elapsed)}
        </h2>
      </div>
    </>
  );
}
