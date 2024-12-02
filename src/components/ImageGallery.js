"use client";

import { useState } from "react";
import Image from "next/image";
import ImageModal from "./ImageModal";

const ImageGallery = () => {
  // Datos de la galería
  const images = [
    {
      src: "/images/image1.jpg",
      title: "Sunset in the Mountains",
      dimensions: "24 x 36 inches",
    },
    {
      src: "/images/image2.jpg",
      title: "Ocean Breeze",
      dimensions: "18 x 24 inches",
    },
    {
      src: "/images/image3.jpg",
      title: "Golden Forest",
      dimensions: "30 x 40 inches",
    },
    {
      src: "/images/image4.jpg",
      title: "Black Forest",
      dimensions: "30 x 40 inches",
    },
    {
      src: "/images/image5.jpg",
      title: "Titan World",
      dimensions: "30 x 40 inches",
    },
    {
      src: "/images/image6.jpg",
      title: "Fantastic Dream",
      dimensions: "30 x 40 inches",
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* Galería de imágenes */}
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
          onClick={() => handleOpenModal(image)}
          style={{ height: "460px" }} // Altura ajustada en un 20%
        >
          <Image
            src={image.src}
            alt={image.title}
            width={460} // Ancho ajustado en un 20%
            height={40} // Altura ajustada proporcionalmente
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {/* Superposición de información en hover */}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <p className="text-white text-sm sm:text-base text-center">
              {image.title}
            </p>
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
