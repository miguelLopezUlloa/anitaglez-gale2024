"use client";

import { FaSun, FaMoon } from "react-icons/fa"; // Íconos
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Cambiar tema"
    >
      {theme === "light" ? (
        <FaMoon className="text-gray-800" />
      ) : (
        <FaSun className="text-yellow-400" />
      )}
    </button>
  );
};

export default ThemeToggle;
