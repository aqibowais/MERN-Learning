import { useCallback, useEffect, useState } from 'react';

function App() {
  const [password, setPassword] = useState("");
  const [passwordLen, setPasswordLen] = useState(8);
  const [isNumbersIncluded, setIsNumbersIncluded] = useState(false);
  const [isSymbolsIncluded, setIsSymbolsIncluded] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [copiedText,setCopiedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  const generatePassword = useCallback(() => {
    let charSet = characters;
    if(isNumbersIncluded) charSet += numbers;
    if(isSymbolsIncluded) charSet += symbols;
    let generatePassword = "";
    for (let index = 0; index < passwordLen; index++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatePassword += charSet[randomIndex];
      setPassword(generatePassword);
      
    }
  }, );

  useEffect(()=>{
    generatePassword();
  },[!autoGenerate||passwordLen])


  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    setIsCopied(true);
    
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, [password]);

  useEffect(() => {
    setIsCopied(false);
  }, [password, passwordLen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-center mt-10 text-white mb-8">
        Password Generator
      </h1>

      <div className="w-full max-w-md bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50">
        <div className="p-8 space-y-6">
          <div className="relative group">
            <input 
              type="text" 
              placeholder='Generated Password...'
              readOnly 
              value={password} 
              className="w-full px-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-100 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            />
            <button onClick={handleCopy} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-300">
             {!isCopied ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-12a2 2 0 00-2-2h-2M8 5a2 2 0 002-2h4a2 2 0 002 2M8 5a2 2 0 012-2h4a2 2 0 012 2" />
              </svg>:
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>}
            </button>
            
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="text-gray-300 font-medium">Password Length: {passwordLen}</label>
                <span className="text-purple-400 font-mono text-sm">{passwordLen}</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                value={passwordLen} 
                onChange={(e) => setPasswordLen(e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500" 
              />
            </div>
            
            <div className="flex justify-between pt-2">
              <label className="flex items-center space-x-2 text-gray-300 font-medium text-xs">
                <input type="checkbox" onChange={()=>setIsNumbersIncluded(!isNumbersIncluded)} className="form-checkbox h-5 w-5 text-purple-500 rounded border-gray-600 focus:ring-purple-500" />
                <span>Include Numbers</span>
              </label>
              
              <label className="flex items-center space-x-2 text-gray-300 font-medium text-xs">
                <input type="checkbox" onChange={()=>setIsSymbolsIncluded(!isSymbolsIncluded)} className="form-checkbox h-5 w-5 text-purple-500 rounded border-gray-600 focus:ring-purple-500" />
                <span>Include Symbols</span>
              </label>
               <label className="flex items-center space-x-2 text-gray-300 font-medium text-xs">
                <input type="checkbox" onChange={()=>setAutoGenerate(!autoGenerate)} className="form-checkbox h-5 w-5 text-purple-500 rounded border-gray-600 focus:ring-purple-500" />
                <span>Auto Generate</span>
              </label>
            </div>
          </div>

          <button onClick={generatePassword} className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1">
            Generate Password
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
