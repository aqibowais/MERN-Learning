import { useState } from 'react';
import Column from './componenets/Column/Column';

function App() {
  const statuses = ["Todo", "In Progress", "Done"];
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`min-h-screen w-full flex flex-col items-center transition-colors duration-200 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Header */}
      <h1 className="text-3xl font-bold text-white text-center mt-6">Kanban Board</h1>
       
      {/* Board */}
      <main className="p-6 w-full max-w-7xl">
        <div className="flex flex-col md:flex-row justify-center gap-6 overflow-x-auto">
          {statuses.map((status, index) => (
            <Column 
              key={index}
              status={status} 
              className='flex-shrink-0 w-full md:w-80 bg-gray-800 text-white'/>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
