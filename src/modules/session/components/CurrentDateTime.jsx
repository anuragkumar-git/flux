import { useEffect, useState } from "react";

function formatDateTime(date) {
  return {
    date: new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date),
    time: new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date),
  };
}

export default function CurrentDateTime() {
  const [now, setNow] = useState(() => new Date());
  const { date, time } = formatDateTime(now);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      aria-label={`Current date and time: ${date}, ${time}`}
      className="absolute right-4 top-4 z-10 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-right shadow-sm backdrop-blur-md sm:right-6 sm:top-6"
    >
      <p className="text-xs font-medium text-slate-500">{date}</p>
      <time className="font-mono text-base font-semibold tracking-tight text-slate-800">
        {time}
      </time>
    </div>
  );
}
