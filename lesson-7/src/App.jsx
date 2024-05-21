import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import Card from "./Card";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl">{isDarkMode ? "Dark Mode" : "Light Mode"}</h1>
        <DarkModeToggle onToggle={handleToggle} />
      </header>
      <main className="p-4">
        <Card />
      </main>
    </div>
  );
}

export default App;
