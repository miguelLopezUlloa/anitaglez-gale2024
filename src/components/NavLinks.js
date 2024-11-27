import Link from "next/link";

const NavLinks = ({ isMobile, theme }) => {
  const baseClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const hoverClass = "hover:text-gray-800 dark:hover:text-white";

  return (
    <div className={isMobile ? "space-y-2" : "hidden sm:flex space-x-4"}>
      <Link href="#" className={`${baseClass} ${hoverClass} block`}>
        Artesanias
      </Link>
      <Link href="#" className={`${baseClass} ${hoverClass} block`}>
        Pinturas
      </Link>
      <Link href="#" className={`${baseClass} ${hoverClass} block`}>
        Obra artística
      </Link>
    </div>
  );
};

export default NavLinks;
