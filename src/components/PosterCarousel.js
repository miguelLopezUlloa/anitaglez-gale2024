"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

const posters = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
];

const related = [
  { src: "/images/image1.jpg", title: "Titan World", description: "This is a brief description", dimensions: "30 x 40 inches", pricing: 49.99 },
  { src: "/images/image2.jpg", title: "Fantastic Dream", description: "This is a brief description", dimensions: "24 x 36 inches", pricing: 39.99 },
  { src: "/images/image3.jpg", title: "Ocean Breeze", description: "This is a brief description", dimensions: "18 x 24 inches", pricing: 29.99 },
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
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentIndex(newIndex), // Actualiza el índice actual
    responsive: [
      {
        breakpoint: 768, // Pantallas medianas y pequeñas
        settings: { dots: false, arrows: true },
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
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Pantallas grandes
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768, // Pantallas medianas
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md overflow-hidden">
      {/* Carrusel principal e información del producto */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Carrusel principal */}
        <div className="lg:w-6/12 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg relative">
          <Slider {...mainSliderSettings} ref={slider => (sliderRef1 = slider)}>
            {posters.map((src, index) => (
              <div key={index} className="relative h-72 p-4">
                <Image
                  src={src}
                  alt={`Poster ${index + 1}`}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Información del producto */}
        <div className="p-6 lg:w-6/12">
          <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-300 font-semibold">
            Digital Prints
          </div>
          <h1 className="block mt-1 text-2xl leading-tight font-medium text-black dark:text-white">
              {related[currentIndex]?.title || "No Title"}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
              {related[currentIndex]?.description || "No Description"}
          </p>
          <div className="mt-4">
              <span className="text-2xl font-semibold text-black dark:text-white">
              ${related[currentIndex]?.pricing || "0.00"}
              </span>
          </div>
            <button
              type="button"
              className="mt-6 px-4 py-2 text-white rounded-md dark:hover:bg-gray-800 transition-all"
              style={{
                backgroundColor: "#284756",
              }}
            >
              Etsy Shop
            </button>
        </div>
      </div>

      {/* Productos relacionados */}
      <div className="p-8 bg-gray-100 dark:bg-gray-800 mt-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Related Digital Prints</h2>
        <div className="mt-4">
          <Slider {...relatedSliderSettings}>
            {related.map((product, index) => (
              <div key={index} className="p-2">
                <div className="relative h-48">
                  <Image src={product.src} alt={product.title} layout="fill" objectFit="cover" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 text-center mt-2">
                  {product.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mt-1">${product.pricing}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PosterCarousel;
