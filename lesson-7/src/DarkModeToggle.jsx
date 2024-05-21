import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkModeToggle = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    onToggle(isDarkMode); // Memanggil callback ketika mode gelap diaktifkan/nonaktifkan
  }, [isDarkMode, onToggle]);

  const toggleDarkMode = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <DarkModeSwitch
      checked={isDarkMode}
      onChange={toggleDarkMode}
      size={24}
      moonColor="white"
      sunColor="black"
    />
  );
};

export default DarkModeToggle;
