import { useState } from "react";

export default function SessionLayout({ main, sidebar }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen max-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 text-slate-800 transition-colors duration-300">
        {/* <header className="p-4 bg-white shadow-sm flex justify-between items-center">
          <h1 className="text-xl font-semibold">Flux</h1>

          <button
            className="md:hidden text-sm px-3 py-1 bg-gray-200 rounded"
            onClick={() => setIsSidebarOpen(true)}
          >
            History
          </button>
        </header> */}
        <header className="p-4 bg-white/70 backdrop-blur-md border-b border-slate-200 flex justify-between items-center sticky top-0 z-30">
          <h1 className="text-xl font-semibold tracking-tight">Flux</h1>

          <button
            className="text-sm px-3 py-1 bg-emerald-600 text-white rounded shadow-sm hover:shadow-md ac  tive:scale-95 transition-all duration-200"
            onClick={() => setIsSidebarOpen(true)}
          >
            History
          </button>
        </header>

        <main className="p-4">{main}</main>
        {/* <div className="lg:grid lg:grid-cols-[1fr_320px]">
          <main className="p-4">{main}</main>
          <aside className="hidden lg:block border-l bg-white p-4 overflow-y-auto">
            {sidebar}
          </aside>
        </div> */}

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          >
            <div className="absolute right-0 top-0 h-full w-80 bg-white/70 border-l border-slate-200 shadow-2xl p-6 overflow-y-auto transition-transform duration-300"
            onClick={(e)=>{e.stopPropagation()}}
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
      </div>
    </>
  );
}
