import { FaFacebookF, FaInstagram, FaPinterest, FaPinterestP } from "react-icons/fa";

export default function CenteredButtons() {
  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      {/* Pinteres Button */}
      <a
        href="https://mx.pinterest.com/a8921/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Anita Pinteres"
        className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:ring focus:ring-blue-300"
      >
        <FaPinterest className="w-5 h-5" />
      </a>

      {/* Instagram Button */}
      <a
        href="https://www.instagram.com/anaibisgonzalezdelgado/"
        aria-label="Anita Instagram"
        className="p-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90 focus:ring focus:ring-pink-300"
      >
        <FaInstagram className="w-5 h-5" />
      </a>
    </div>
  );
}
