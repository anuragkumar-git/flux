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
    // time: new Intl.DateTimeFormat("en-US", {   //hour12 -> am/pm in capital
      hour: "numeric",
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
      className="absolute left-4 top-4 z-50 rounded-2xl border border-blue-100/10 bg-slate-950/45 px-3.5 py-2.5 text-left shadow-lg shadow-black/20 backdrop-blur-xl sm:left-6 sm:top-6"
    >
      <p className="text-xs font-medium text-blue-100/55">{date}</p>
      <time className="font-mono text-base font-semibold tracking-tight text-slate-100">
        {time}
      </time>
    </div>
  );
}
