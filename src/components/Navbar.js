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
  const [showTooltip, setShowTooltip] = useState(false); // Estado para el tooltip

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
            <div 
              className="flex items-center cursor-pointer relative group"
              onClick={() => setIsBioModalOpen(true)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <div className="flex-shrink-0">
                <Avatar />
              </div>
              <span 
                className="text-lg sm:text-2xl md:text-3xl ml-2 sm:ml-4 tracking-wider 
                          transition-all duration-500 relative inline-flex items-center artist-name-effect
                          group-hover:text-yellow-400"
                style={{
                  textShadow: showTooltip
                    ? theme === "dark" 
                      ? "0 0 15px rgba(250, 204, 21, 0.5), 0 0 30px rgba(250, 204, 21, 0.3)"
                      : "0 0 10px rgba(250, 204, 21, 0.4), 0 0 20px rgba(250, 204, 21, 0.2)"
                    : "none"
                }}
              >
                <span className="relative">
                  ANA IBIS GONZÁLEZ
                  {/* Elegant underline that appears on hover */}
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                </span>
                <svg 
                  className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  fill="currentColor" 
                  viewBox="0 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                    clipRule="evenodd"
                  />
                </svg>
                {/* Small text hint */}
                <span className="absolute -bottom-8 sm:-bottom-10 left-0 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap">
                  Click for Artist Biography
                </span>
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