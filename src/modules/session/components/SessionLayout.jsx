import { useState } from "react";

export default function SessionLayout({ main, sidebar }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="focus-shell relative flex min-h-dvh flex-col text-slate-100">
        <div className="ambient-blob ambient-blob--one" aria-hidden="true" />
        <div className="ambient-blob ambient-blob--two" aria-hidden="true" />
        <div className="ambient-blob ambient-blob--three" aria-hidden="true" />

        <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-7 sm:px-6  ">
          {main}
        </main>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-[min(100vw,30rem)] overflow-y-auto border-l border-blue-200/10 bg-slate-950/90 p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-6"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="mb-5 text-sm font-medium text-slate-400 transition hover:text-white"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>
              {sidebar}
            </div>
          </div>
        )}

        <footer className="relative z-10 flex items-center justify-between border-t border-blue-100/10 bg-slate-950/35 p-4 backdrop-blur-md">
          <a
            href={"https://anuragkumar-git.github.io/anurag-portfolio/"}
            target="_blank"
            className="text-xl font-semibold tracking-tight text-slate-100"
          >
            Flux
          </a>

          <button
            className="rounded-full border border-blue-200/15 bg-blue-300/5 px-4 py-1.5 text-sm font-medium text-blue-100 transition hover:border-blue-200/30 hover:bg-blue-300/10"
            onClick={() => setIsSidebarOpen(true)}
          >
            History
          </button>
        </footer>
      </div>
    </>
  );
}
