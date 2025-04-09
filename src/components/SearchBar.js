const SearchBar = ({ theme }) => {
  const inputClass =
    theme === "dark"
      ? "border-gray-600 bg-gray-700 text-gray-300 placeholder-gray-400"
      : "border-gray-200 bg-white text-gray-600 placeholder-gray-500";

  return (
    <input
      type="text"
      placeholder="Buscar..."
      className={`px-3 py-1 border rounded-md ${inputClass}`}
    />
  );
};

export default SearchBar;
