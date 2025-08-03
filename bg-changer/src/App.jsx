import { useState } from 'react';

function App() {
  const [bgColor, setBgColor] = useState('bg-purple-600');
  
  const colors = [
    { name: 'Red', class: 'bg-red-600' },
    { name: 'Green', class: 'bg-green-600' },
    { name: 'Blue', class: 'bg-blue-600' },
    { name: 'Purple', class: 'bg-purple-600' },
    { name: 'Yellow', class: 'bg-yellow-600' },
    { name: 'Gray', class: 'bg-gray-600' }
  ];

  return (
    <div className={`w-full h-screen duration-300 transition-colors ${bgColor}`}>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center gap-3 
                      bg-white/20 backdrop-blur-md px-5 py-4 rounded-full shadow-2xl border border-white/30">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setBgColor(color.class)}
            className={`h-12 w-12 rounded-full shadow-md transform transition-transform 
                      hover:scale-110 focus:ring-2 focus:ring-white focus:outline-none ${color.class}`}
            aria-label={`Change background to ${color.name}`}
          >
            {bgColor === color.class && (
              <span className="flex items-center justify-center h-full">
                <span className="h-2 w-2 rounded-full bg-white"></span>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
