"use client";

import Avatar from "@/components/Avatar";
import NavLinks from "@/components/NavLinks";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext"; // Hook para el contexto del tema

const Navbar = () => {
  const { theme } = useTheme(); // Obtenemos el tema del contexto

  return (
    <nav
      className={`transition-all duration-300 border-b px-4 py-3 sm:px-6 lg:px-8 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-300"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar />
          <NavLinks theme={theme} />
        </div>
        <div className="hidden sm:flex items-center space-x-4">
          <SearchBar theme={theme} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
