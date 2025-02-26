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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {/* Galería de imágenes */}
      {images.map((image, index) => (
        <div
          key={index}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
          onClick={() => handleOpenModal(image)}
          style={{ height: "652px" }} // Altura aumentada en 15%
        >
          <Image
            src={image.src}
            alt={image.title}
            width={250} // Mantiene el ancho proporcional
            height={652} // Altura ajustada en 15% más
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
