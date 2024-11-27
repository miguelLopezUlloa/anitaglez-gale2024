"use client";

import { useState } from "react";
import Avatar from "@/components/Avatar";
import NavLinks from "@/components/NavLinks";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext"; // Hook para el contexto del tema

const Navbar = () => {
  const { theme } = useTheme(); // Obtenemos el tema del contexto
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`transition-all duration-300 border-b px-4 py-3 sm:px-6 lg:px-8 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700 text-gray-300"
          : "bg-white border-gray-200 text-gray-600"
      }`}
    >
      <div className="flex justify-between items-center">
        {/* Avatar y Enlaces */}
        <div className="flex items-center space-x-4">
          <Avatar />
          <div className="hidden sm:flex">
            <NavLinks isMobile={false} theme={theme} />
          </div>
        </div>

        {/* Barra de Búsqueda y Toggle de Tema */}
        <div className="hidden sm:flex items-center space-x-4">
          <SearchBar theme={theme} />
          <ThemeToggle />
        </div>

        {/* Menú de Hamburguesa para Móviles */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Desplegable para Móviles */}
      {isOpen && (
        <div className="sm:hidden mt-4 space-y-2">
          <NavLinks isMobile={true} theme={theme} />
          <SearchBar theme={theme} />
          <div className="flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
