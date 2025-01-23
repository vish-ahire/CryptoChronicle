import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Footer,History,Overview,Dashboard,Header} from './index'

function App() {
  const [theme, setTheme] = useState("light"); 
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme); 
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme); 
    }
  }, []);
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow overflow-auto pt-24 pb-28 dark:bg-gray-900 dark:text-black">
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/history" element={<History />} />
      </Routes>
      </main>
      <Footer/>
      <button
          onClick={toggleTheme}
          className="fixed bottom-4 right-4 p-3 mb-16 bg-gray-800 text-white rounded-full shadow-lg transition duration-300 hover:bg-gray-600 "
        >
          {theme === "light" ? (
            <span>🌙</span> 
          ) : (
            <span>🌞</span> 
          )}
        </button>
      </div>
    </Router>
  );
}

export default App;