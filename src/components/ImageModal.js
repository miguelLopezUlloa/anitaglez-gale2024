
const ImageModal = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
    <div className="relative w-full max-w-3xl mx-auto p-4">
      <button
        className="absolute top-2 right-2 text-amber-400 text-2xl"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="flex justify-center items-center">
        <img
          src={src}
          alt="Selected"
          className="max-h-screen max-w-full object-contain rounded-lg" // Clase que asegura que la imagen no se corta
        />
      </div>
    </div>
  </div>
  );
};

export default ImageModal;
