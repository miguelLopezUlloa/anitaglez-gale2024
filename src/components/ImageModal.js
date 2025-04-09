import Image from "next/image";

const ImageModal = ({ src, title, dimensions, onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4 overflow-y-auto"
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl mx-auto p-6"
      >
        {/* Botón de cierre */}
        <button
          className="absolute top-2 right-2 text-amber-400 text-2xl"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Contenido del modal */}
        <div className="flex flex-col items-center">
          {/* Contenedor de la imagen */}
          <div className="w-full max-w-full max-h-[85vh]">
            <div className="relative w-full h-0 pb-[70%]"> {/* Relación 70% más larga */}
              <Image
                src={src}
                alt={title || "Image"}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Título y dimensiones */}
          <div className="text-center mt-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              {dimensions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
