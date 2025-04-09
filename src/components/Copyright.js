import Link from "next/link";
import CenteredButtons from "@/components/CenteredButtons";

const Copyright = () => {
  return (
    <footer className="text-center text-gray-600 dark:text-gray-400 mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <Link href="/" className="text-blue-500 hover:underline">
          Anita Gonzalez Delgado
        </Link>
        . Todos los derechos reservados.
      </p>

      {/* Botones Centrados */}
      <CenteredButtons />
    </footer>
  );
};

export default Copyright;
