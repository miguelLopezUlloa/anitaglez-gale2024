"use client"; 
import { useState } from 'react';
import ImageModal from '@/components/ImageModal';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  // Agrega más imágenes según sea necesario
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((src, index) => (
        <div key={index} className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-auto cursor-pointer transform transition duration-300 hover:scale-105"
            onClick={() => setSelectedImage(src)}
          />
        </div>
      ))}

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};


export default ImageGallery;
