"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

const ImageGallery = () => {
  // Datos de la galería
  const images = [
    {
      src: "/images/originals/anaibis_pink.png",
      title: "Confesiones en era de Vacío",
      dimensions: "59 x 24 inches",
    },
    {
      src: "/images/originals/anaibis_fuego.jpg",
      title: "Caballo de Fuego",
      dimensions: "59 x 24 inches",
    },
    {
      src: "/images/originals/anaibis_espiral.jpg",
      title: "Restos, Re-comenzar",
      dimensions: "59 x 24 inches",
    },
    {
      src: "/images/originals/anaibis_rojo.jpg",
      title: "Ingravidez",
      dimensions: "39 x 51 inches",
    },
    {
      src: "/images/originals/anaibis_monarca.jpg",
      title: "Monarca",
      dimensions: "39 x 51 inches",
    },

      
    {
      src: "/images/originals/anaibis_hilvanando.png",
      title: "Hilvanando Encrucijadas",
      dimensions: "39 x 31 inches",
    },
    {
      src: "/images/originals/anaibis_antillana.jpg",
      title: "Por el mar de las antillas",
      dimensions: "51 x 39 inches",
    },
    {
      src: "/images/originals/anaibis_portal.jpg",
      title: "Habrá otras formas",
      dimensions: "39 x 39 inches",
    },
    {
      src: "/images/originals/anaibis_polilla2.jpg",
      title: "Como Polilla a la Luz",
      dimensions: "39 x 39 inches",
    },
  ];

  // Estado para manejar el modal
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 p-4 sm:p-6">
      {/* Galería de imágenes */}
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg bg-white dark:bg-gray-800"
          onClick={() => handleOpenModal(image)}
        >
          {/* Contenedor responsive para la imagen */}
          <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full">
            <Image
              src={image.src}
              alt={image.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              quality={85}
            />
            {/* Overlay mejorado con información en hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                  {image.title}
                </p>
                <p className="text-white/80 text-xs sm:text-sm mt-1">
                  {image.dimensions}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Modal de la imagen */}
      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          title={selectedImage.title}
          dimensions={selectedImage.dimensions}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ImageGallery;
