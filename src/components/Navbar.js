"use client";
import { useState } from "react";
import Avatar from "@/components/Avatar";
import NavLinks from "@/components/NavLinks";
import SearchBar from "@/components/SearchBar";
import ThemeToggle from "@/components/ThemeToggle";
import BioModal from "@/components/BioModal"; // Importamos el modal
import { useTheme } from "@/context/ThemeContext"; // Hook para el contexto del tema
import { inter } from '../app/fonts';

const Navbar = () => {
  const { theme } = useTheme(); // Obtenemos el tema del contexto
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú móvil
  const [isBioModalOpen, setIsBioModalOpen] = useState(false); // Estado para el modal

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`${inter.className} transition-all duration-300 border-b px-4 py-3 sm:px-6 lg:px-8 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700 text-gray-300"
            : "bg-white border-gray-200 text-gray-600"
        }`}
        style={{ maxWidth: "100vw", overflow: "hidden" }}
      >
        <div className="flex justify-between items-center">
          {/* Avatar y Enlaces */}
          <div className="flex items-center w-full">
            {/* Container for Avatar and Name */}
            <div className="flex items-center cursor-pointer" onClick={() => setIsBioModalOpen(true)}>
              <div className="flex-shrink-0">
                <Avatar />
              </div>
              <span 
                className="text-2xl sm:text-3xl ml-2 sm:ml-4 tracking-wider"
              >
                ANA IBIS GONZÁLEZ
              </span>
            </div>

            {/* Adjusted spacing for NavLinks */}
            <div className="hidden sm:flex flex-grow ml-20">
              <NavLinks isMobile={false} theme={theme} />
            </div>
          </div>

          {/* Barra de Búsqueda y Toggle de Tema */}
          <div className="hidden sm:flex items-center space-x-4">
            <ThemeToggle />
          </div>

          {/* Menú de Hamburguesa para Móviles */}
          <div className="sm:hidden flex-shrink-0">
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
          <div className="sm:hidden mt-4 space-y-2 overflow-x-hidden">
            <NavLinks isMobile={true} theme={theme} />
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        )}
      </nav>

      {/* Modal de Biografía */}
      <BioModal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        title= " "
        text= " "
      />
    </>
  );
};

export default Navbar;