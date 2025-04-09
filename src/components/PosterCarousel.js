"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { openAnIbisArtShop } from "../lib/openAnIbisArtShop";

const TXT_DIGITAL_PRINT = "Impresion digital de alta calidad con" + 
" tinta de archivo derivada de una obra de arte original."

const posters = [
  "/images/digital-prints/anaibis_dp_aleph.jpg",
  "/images/digital-prints/anaibis_dp_caballofuego.jpg",
  "/images/digital-prints/anaibis_dp_confesiones.jpg",
  "/images/digital-prints/anaibis_dp_encruzijada.jpg",
  "/images/digital-prints/anaibis_dp_ingravidez.jpg",
  "/images/digital-prints/anaibis_dp_recomenzar.jpg",
  "/images/digital-prints/anaibis_dp_semejanza.jpg",
];

const aleph_description = "El tiempo es una espirtal de libertad y dinamismo," + 
                          "compartiendo un viaje de memorias acumuladas.";
const fire_horse_description = "Misterio y fuerza de un corcel de fuego, "   + 
"escencia que desafía el espiritu indomable con trazos de libertad.";
const crossroads_description = "Emociones entretejidas en un susurro ancestral, " + 
"universo personal que evoca nuestra propia existencia," + 
" la tranquilidad y el ancia de libertad.";
const ingravidez_description = "Homenaje a la nobleza, a la distinción" +
 " y elegancia de este hermoso animal.";
const semejanza_description = "Espejo simbólico de una segunda piel. " + 
"Identidad que se desvanece con su propio reflejo.";
const confesions_description = "Entre azules un caballo emerge como" +
 " susurro del tiempo. Piel que desgarra hilos " + "de memoria con aires de libertad.";
const restart_description = "Movimiento y serenidad en perfecta armoniá";
const purple_description = "Fragmentando la memoria en una tensión" +
" poética convergen en un velo purpura, donde la figura del caballo," + 
"cargado de melancolía, sugiere una bruma de emociones que" + " cabalgan en el tiempo";

const related = [
  { src: "/images/digital-prints/anaibis_dp_aleph.jpg", title: "Aleph", description: aleph_description, dimensions: "30 x 40 inches", pricing: 49.99 },
  { src: "/images/digital-prints/anaibis_dp_caballofuego.jpg", title: "Caballo de Fuego", description: fire_horse_description , dimensions: "30 x 40 inches", pricing: 49.99 },
  { src: "/images/digital-prints/anaibis_dp_confesiones.jpg", title: "Confesiones en era de Vacío", description: confesions_description, dimensions: "24 x 36 inches", pricing: 39.99 },
  { src: "/images/digital-prints/anaibis_dp_encruzijada.jpg", title: "Hilvanando Encrucijadas", description: crossroads_description, dimensions: "18 x 24 inches", pricing: 29.99 },
  { src: "/images/digital-prints/anaibis_dp_ingravidez.jpg", title: "Ingravidez", description: ingravidez_description, dimensions: "30 x 40 inches", pricing: 49.99 },
  { src: "/images/digital-prints/anaibis_dp_recomenzar.jpg", title: "Restos, Re-comenzar", description: restart_description, dimensions: "30 x 40 inches", pricing: 49.99 },
  { src: "/images/digital-prints/anaibis_dp_semejanza.jpg", title: "A su imagen y semejanza", description: semejanza_description, dimensions: "30 x 40 inches", pricing: 49.99 },
];

// Personalizar flechas del carrusel
const CustomPrevArrow = ({ onClick }) => (
  <button
    className="absolute z-10 left-2 sm:left-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-700 transition-all"
    onClick={onClick}
    aria-label="Previous"
  >
    &#9664;
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className="absolute z-10 right-2 sm:right-5 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-700 transition-all"
    onClick={onClick}
    aria-label="Next"
  >
    &#9654;
  </button>
);

const PosterCarousel = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    lazyLoad: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex), // Actualiza el índice actual
    vertical: false, // Por defecto, horizontal
    responsive: [
      {
        breakpoint: 768, // Pantallas medianas y pequeñas
        settings: {
          dots: false,
          arrows: true,
          vertical: true, // Cambiar a vertical en pantallas pequeñas
          verticalSwiping: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          lazyLoad: true,
        },
      },
      {
        breakpoint: 480, // Pantallas pequeñas. Muestra 1 slide y oculta flechas
        settings: {
          dots: false,
          arrows: false,
          vertical: true, // Mantener vertical en pantallas muy pequeñas
          verticalSwiping: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          lazyLoad: true,
        },
      },
    ],
  };

  const relatedSliderSettings = {
    asNavFor: nav1,
    ref: slider => (sliderRef2 = slider),
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    lazyLoad: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    vertical: false, // Por defecto, horizontal
    responsive: [
      {
        breakpoint: 1024, // Pantallas grandes
        settings: {
          slidesToShow: 2,
          vertical: false,
        },
      },
      {
        breakpoint: 768, // Pantallas medianas
        settings: {
          slidesToShow: 2,
          arrows: false,
          vertical: true, // Cambiar a vertical
          verticalSwiping: true,
          swipeToSlide: true,
          centerMode: true,
          lazyLoad: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 480, // Pantallas pequeñas. Muestra 1 slide y oculta flechas
        settings: {
          slidesToShow: 2,
          arrows: true,
          vertical: true, // Mantener vertical en pantallas muy pequeñas
          verticalSwiping: true,
          swipeToSlide: true,
          centerMode: true,
          lazyLoad: true,
          centerPadding: "15px",
        },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      {/* Carrusel principal e información del producto */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Carrusel principal */}
        <div className="w-full lg:w-6/12 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg relative">
          <Slider {...mainSliderSettings} ref={slider => (sliderRef1 = slider)}>
            {posters.map((src, index) => (
              <div key={index} className="relative h-72 p-4">
                <Image
                  src={src}
                  alt={`Poster ${index + 1}`}
                  width={300} // Proporciona un valor inicial
                  height={300} // Proporciona un valor inicial
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-lg object-contain"
                  priority={index === 0}
                />
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
              {related[currentIndex]?.title || "No Title"}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
              {related[currentIndex]?.description || "No Description"}
          </p>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
             {/*  { TXT_DIGITAL_PRINT } */}
          </p>
          {/* <div className="mt-4">
              <span className="text-2xl font-semibold text-black dark:text-white">
              ${related[currentIndex]?.pricing || "0.00"}
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
          <Slider {...relatedSliderSettings}>
            {related.map((product, index) => (
              <div key={index} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-auto">
                <div className="relative h-64 sm:h-72 md:h-96 lg:h-auto"> {/* Contenedor de la imagen */}
                <Image
                    src={product.src}
                    alt={product.title}
                    width={300} // Proporciona un valor inicial
                    height={300} // Proporciona un valor inicial
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="rounded-lg object-cover h-full"
                    priority={index === 0}
                  />
                </div>
                
                {/* Contenedor de los textos */}
                <div className="w-full max-w-[300px] mt-4 flex flex-col items-center">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center mt-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-center text-gray-600 dark:text-gray-400 mt-1">${product.dimensions}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>  

    </div>
  );
};

export default PosterCarousel;
