import { useState } from "react";

export default function SessionLayout({ main, sidebar }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-800 flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          {main}
        </main>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div
              className="absolute right-0 top-0 h-full w-auto bg-white/70 border-l border-slate-200 shadow-2xl p-6 overflow-y-auto"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <button
                className="mb-4 text-sm text-gray-500"
                onClick={() => setIsSidebarOpen(false)}
              >
                Close
              </button>
              {sidebar}
            </div>
          </div>
        )}

        <footer className="bg-white/70 backdrop-blur-md border-t border-slate-200 p-4 flex justify-between items-center ">
          <h1 className="text-xl font-semibold tracking-tight">Flux</h1>

          <button
            className="text-md px-4 py-1"
            onClick={() => setIsSidebarOpen(true)}
          >
            History
          </button>
        </footer>
      </div>
    </>
  );
}
