import { useState } from 'react';
import Column from './componenets/Column/Column';

function App() {
  const statuses = ["Todo", "In Progress", "Done"];
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center transition-colors duration-200 ${isDarkMode ? 'bg-neutral-950' : 'bg-neutral-100'}`}>
      <header className="w-full flex flex-col items-center py-10 bg-gradient-to-b from-neutral-900 to-neutral-950 shadow-lg">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg mb-2">Kanban Board</h1>
        {/* <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-neutral-400">Light</span>
          <button
            className="w-10 h-6 rounded-full bg-neutral-800 relative transition-colors duration-200 focus:outline-none border border-neutral-700"
            onClick={() => setIsDarkMode((v) => !v)}
          >
            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-gradient-to-br from-white/80 to-neutral-400 shadow-md transition-transform duration-200 ${isDarkMode ? 'translate-x-4' : ''}`}></span>
          </button>
          <span className="text-xs text-neutral-400">Dark</span>
        </div> */}
      </header>
      <main className="flex-1 w-full max-w-7xl px-2 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-10 overflow-x-auto">
          {statuses.map((status, index) => (
            <Column 
              key={index}
              status={status}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
