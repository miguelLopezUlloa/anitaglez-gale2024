import React from "react";
import styles from "@/app/styles/BioModal.module.css"; // Ruta relativa correcta

const BioModal = ({ isOpen, onClose, title, text  }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderiza nada

  // Variable para configurar el porcentaje de transparencia
  const transparency = 0.1; // Puedes ajustar este valor según tus necesidades

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 overflow-y-auto"
    >
      {/* Contenedor principal del modal */}
      <div
        className={styles.modalContainer} // Aplicamos los estilos del archivo CSS modular
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, ${transparency}), rgba(0, 0, 0, ${transparency})), url('/images/AnitaGonzalezDelgadoEng.jpg')`,
        }}
      >
        {/* Botón de cierre */}
        <button
          className={styles.closeButton} // Aplicamos los estilos del archivo CSS modular
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Contenido del modal */}
        <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {title && <h2 className={styles.title}>{title}</h2>}
          {!title && <h2 className={styles.title}>Sin título disponible</h2>}
          {text && <p className={styles.text}>{text}</p>}
          {!text && <p className={styles.text}>Sin descripción disponible.</p>}
        </div>
      </div>
    </div>
  );
};

export default BioModal;