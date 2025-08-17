"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { openAnIbisArtShop } from "../lib/openAnIbisArtShop";
import ImageModal from "./ImageModal";

const TXT_DIGITAL_PRINT = "Impresión digital de alta calidad con" + 
" tinta de archivo derivada de una obra de arte original."

// Datos unificados para mantener sincronización
const digitalPrints = [
  {
    id: "aleph",
    src: "/images/digital-prints/anaibis_dp_aleph.jpg",
    title: "Aleph", 
    description: "El tiempo es una espiral de libertad y dinamismo, compartiendo un viaje de memorias acumuladas.",
    dimensions: "30 x 40 inches",
    pricing: 49.99
  },
  {
    id: "caballofuego", 
    src: "/images/digital-prints/anaibis_dp_caballofuego.jpg",
    title: "Caballo de Fuego",
    description: "Misterio y fuerza de un corcel de fuego, esencia que desafía el espíritu indomable con trazos de libertad.",
    dimensions: "30 x 40 inches",
    pricing: 49.99
  },
  {
    id: "confesiones",
    src: "/images/digital-prints/anaibis_dp_confesiones.jpg",
    title: "Confesiones en era de Vacío",
    description: "Entre azules un caballo emerge como susurro del tiempo. Piel que desgarra hilos de memoria con aires de libertad.",
    dimensions: "24 x 36 inches", 
    pricing: 39.99
  },
  {
    id: "encruzijada",
    src: "/images/digital-prints/anaibis_dp_encruzijada.jpg",
    title: "Hilvanando Encrucijadas",
    description: "Emociones entretejidas en un susurro ancestral, universo personal que evoca nuestra propia existencia, la tranquilidad y el ansia de libertad.",
    dimensions: "18 x 24 inches",
    pricing: 29.99
  },
  {
    id: "ingravidez",
    src: "/images/digital-prints/anaibis_dp_ingravidez.jpg", 
    title: "Ingravidez",
    description: "Homenaje a la nobleza, a la distinción y elegancia de este hermoso animal.",
    dimensions: "30 x 40 inches",
    pricing: 49.99
  },
  {
    id: "recomenzar", 
    src: "/images/digital-prints/anaibis_dp_recomenzar.jpg",
    title: "Restos, Re-comenzar",
    description: "Movimiento y serenidad en perfecta armonía.",
    dimensions: "30 x 40 inches",
    pricing: 49.99
  },
  {
    id: "semejanza",
    src: "/images/digital-prints/anaibis_dp_semejanza.jpg",
    title: "A su imagen y semejanza", 
    description: "Espejo simbólico de una segunda piel. Identidad que se desvanece con su propio reflejo.",
    dimensions: "30 x 40 inches",
    pricing: 49.99
  }
];

// Hook personalizado para detectar breakpoints
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, [matches, query]);
  
  return matches;
};

// Flechas mejoradas con mejor UX móvil
const CustomPrevArrow = ({ onClick, isVertical = false }) => (
  <button
    className={`absolute z-20 ${isVertical 
      ? 'left-1/2 top-2 transform -translate-x-1/2' 
      : 'left-2 sm:left-4 top-1/2 transform -translate-y-1/2'
    } bg-gray-800/90 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 active:scale-95`}
    onClick={onClick}
    aria-label="Anterior"
    type="button"
  >
    {isVertical ? '▲' : '◀'}
  </button>
);

const CustomNextArrow = ({ onClick, isVertical = false }) => (
  <button
    className={`absolute z-20 ${isVertical
      ? 'left-1/2 bottom-2 transform -translate-x-1/2'
      : 'right-2 sm:right-4 top-1/2 transform -translate-y-1/2' 
    } bg-gray-800/90 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-200 active:scale-95`}
    onClick={onClick}
    aria-label="Siguiente"
    type="button"
  >
    {isVertical ? '▼' : '▶'}
  </button>
);

const PosterCarousel = () => {
  // Estado y referencias mejoradas
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // Estado para el modal
  const mainSliderRef = useRef(null);
  const navSliderRef = useRef(null);
  const mainContainerRef = useRef(null);
  
  // Breakpoints reactivos
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  
  // Callback mejorado para sincronización inteligente
  const handleSlideChange = useCallback((newIndex, fromNav = false) => {
    setCurrentIndex(newIndex);
    
    // Solo sincronizar el carrusel principal si el cambio viene del nav
    if (fromNav && mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(newIndex);
    }
    // Solo sincronizar el nav si el cambio viene del carrusel principal
    else if (!fromNav && navSliderRef.current) {
      // No forzar posición, solo actualizar el estado visual
      // El nav mantiene su posición actual para navegación suave
    }
  }, []);
  
  // Callback específico para clicks en el carrusel de navegación
  const handleNavClick = useCallback((index) => {
    handleSlideChange(index, true);
    // Enfocar carrusel principal tras seleccionar Related
    setTimeout(() => {
      if (mainContainerRef.current) {
        mainContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 0);
  }, [handleSlideChange]);
  
  // Funciones para manejar el modal de imagen
  const handleImageClick = useCallback((item) => {
    setSelectedImage(item);
  }, []);
  
  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);
  
  // Inicialización mejorada
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Configuración simplificada y consistente del carrusel principal
  const mainSliderSettings = {
    dots: !isMobile,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !isMobile, // No autoplay en móvil para mejor UX
    autoplaySpeed: 4000,
    arrows: true,
    fade: !isMobile, // Transición fade en desktop
    adaptiveHeight: true,
    lazyLoad: 'ondemand',
    pauseOnHover: true,
    swipeToSlide: true,
    touchThreshold: 10,
    prevArrow: <CustomPrevArrow isVertical={false} />,
    nextArrow: <CustomNextArrow isVertical={false} />,
    beforeChange: (oldIndex, newIndex) => {
      handleSlideChange(newIndex, false);
    },
  };

  // Configuración optimizada del carrusel de navegación
  const navSliderSettings = {
    slidesToShow: isMobile ? 2 : isTablet ? 3 : 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: false, // Deshabilitamos para manejar clicks manualmente
    infinite: true,
    arrows: !isMobile,
    centerMode: isMobile,
    centerPadding: isMobile ? '20px' : '0px',
    lazyLoad: 'ondemand',
    speed: 300,
    touchThreshold: 5,
    prevArrow: <CustomPrevArrow isVertical={false} />,
    nextArrow: <CustomNextArrow isVertical={false} />,
    // Removemos beforeChange para evitar loops de sincronización
  };

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto mt-12 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto mt-12 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      {/* Carrusel principal e información del producto */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Carrusel principal */}
        <div className="w-full lg:w-6/12 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg relative" ref={mainContainerRef}>
          <Slider {...mainSliderSettings} ref={mainSliderRef}>
            {digitalPrints.map((item, index) => (
              <div key={item.id} className="relative h-72 p-4">
                <div 
                  className="cursor-pointer h-full w-full flex items-center justify-center"
                  onClick={() => handleImageClick(item)}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={300}
                    height={300}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="rounded-lg object-contain hover:scale-105 transition-transform duration-300"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Información del producto */}
        <div className="w-full p-6 lg:w-6/12">
          <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-300 font-semibold">
            Digital Prints
          </div>
          <h1 className="block mt-1 text-2xl leading-tight font-medium text-black dark:text-white">
            {digitalPrints[currentIndex]?.title || "No Title"}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {digitalPrints[currentIndex]?.description || "No Description"}
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {TXT_DIGITAL_PRINT}
          </p>
          {/* <div className="mt-4">
            <span className="text-2xl font-semibold text-black dark:text-white">
              ${digitalPrints[currentIndex]?.pricing || "0.00"}
            </span>
          </div> */}
          <button
            type="button"
            className="mt-6 px-4 py-2 text-white rounded-md dark:hover:bg-gray-800 transition-all"
            style={{
              backgroundColor: "#284756",
            }}
            onClick={openAnIbisArtShop}
          >
            Shop AnIbis Art
          </button>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="p-8 bg-gray-100 dark:bg-gray-800 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Related Digital Prints</h2>
        <div className="mt-4 overflow-x-hidden">
          <Slider {...navSliderSettings} ref={navSliderRef}>
            {digitalPrints.map((item, index) => (
              <div 
                key={item.id} 
                className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto"
                onClick={() => handleNavClick(index)}
              >
                <div 
                  className={`cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                    currentIndex === index
                      ? 'ring-4 ring-indigo-500 shadow-xl scale-105'
                      : 'hover:shadow-lg hover:scale-102 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="relative h-64 sm:h-72 md:h-96 lg:h-auto"> {/* Contenedor de la imagen */}
                    <Image
                      src={item.src}
                      alt={item.title}
                      width={300}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="rounded-lg object-cover h-full"
                      priority={index === 0}
                    />
                  </div>
                  
                  {/* Contenedor de los textos */}
                  <div className="w-full max-w-[300px] mt-4 flex flex-col items-center">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center mt-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-center text-gray-600 dark:text-gray-400 mt-1">{item.dimensions}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

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

export default PosterCarousel;
