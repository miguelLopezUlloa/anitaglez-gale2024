import { useState } from 'react';
import ImageModal from './ImageModal';
import styles from '../styles/ImageGallery.module.css';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
  // Agrega más imágenes según sea necesario
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className={styles.gallery}>
      {images.map((src, index) => (
        <div key={index} className={styles.imageContainer}>
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className={styles.image}
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
