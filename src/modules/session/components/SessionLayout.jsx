import { useState } from "react";

export default function SessionLayout({ main, sidebar }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="p-4 bg-white shadow-sm flex justify-between items-center">
          <h1 className="text-xl font-semibold">Flux</h1>

          <button
            className="md:hidden text-sm px-3 py-1 bg-gray-200 rounded"
            onClick={() => setIsSidebarOpen(true)}
          >
            History
          </button>
        </header>

        <div className="md:grid md:grid-cols-[1fr_320px]">
          <main className="p-4">{main}</main>

          <aside className="hidden md:block border-l bg-white p-4 overflow-y-auto">
            {sidebar}
          </aside>
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40">
            <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-lg p-4 overflow-y-auto">
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
