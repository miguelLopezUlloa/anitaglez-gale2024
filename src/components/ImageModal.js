import styles from '../styles/ImageModal.module.css';

const ImageModal = ({ src, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="Selected" className={styles.modalImage} />
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
