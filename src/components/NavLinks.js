"use client";

import Link from "next/link";
import { useState } from "react";
import ContactModal from "@/components/ContactModal";
import { openAnIbisArtShop } from "../lib/openAnIbisArtShop";

const NavLinks = ({ isMobile, theme }) => {
  const baseClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const hoverClass = "hover:text-gray-800 dark:hover:text-white";
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactOpen(true);
  };

  return (
   <> 
    <div className={isMobile ? "space-y-2" : "hidden sm:flex space-x-4"}>
      <Link href="/original-paintings" className={`${baseClass} ${hoverClass} block`}>
        Original paintings
      </Link>
      <Link href="/digital-prints" className={`${baseClass} ${hoverClass} block`}>
        Digital prints
      </Link>
      <button
        onClick={openAnIbisArtShop}
        className={`${baseClass} ${hoverClass} block`}
      >
        Shop
      </button>
      {/* Opción de Contacto */}
      <button
          onClick={handleContactClick}
          className="block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
        >
          Contact
      </button>
    </div>

      {/* Modal de Contacto */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

    </>
  );
};

export default NavLinks;
