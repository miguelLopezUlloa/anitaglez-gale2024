"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        {/* Avatar and Menu items */}
        <div className="flex items-center space-x-4">
          <Image
            src="/avatar.jpg" // Ajusta el path a tu imagen
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              Artesanias
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              Pinturas
            </Link>
            <Link href="#" className="text-gray-600 hover:text-gray-800">
              Obra artística
            </Link>
          </div>
        </div>
        {/* Search Input */}
        <div className="hidden sm:block">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-3 py-1 border rounded-md"
          />
        </div>
        {/* Hamburger Icon for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
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
      {/* Responsive Menu */}
      {isOpen && (
        <div className="sm:hidden mt-4 space-y-2">
          <Link href="#" className="block text-gray-600 hover:text-gray-800">
            Artesanias
          </Link>
          <Link href="#" className="block text-gray-600 hover:text-gray-800">
            Pinturas
          </Link>
          <Link href="#" className="block text-gray-600 hover:text-gray-800">
            Obra artística
          </Link>
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full px-3 py-1 border rounded-md"
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
