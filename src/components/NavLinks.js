import Link from "next/link";

const NavLinks = ({ theme }) => {
  const linkClass = theme === "dark" ? "text-gray-300" : "text-gray-600";
  const hoverClass = theme === "dark" ? "hover:text-white" : "hover:text-gray-800";

  return (
    <div className="hidden sm:flex sm:items-center sm:space-x-4">
      <Link href="#" className={`${linkClass} ${hoverClass}`}>
        Artesanias
      </Link>
      <Link href="#" className={`${linkClass} ${hoverClass}`}>
        Pinturas
      </Link>
      <Link href="#" className={`${linkClass} ${hoverClass}`}>
        Obra artística
      </Link>
    </div>
  );
};

export default NavLinks;
