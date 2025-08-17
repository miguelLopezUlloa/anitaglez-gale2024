"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

const ImageModal = ({ src, title, dimensions, onClose }) => {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const panRef = useRef({ lastX: 0, lastY: 0, isPanning: false, mouseDown: false });
  const pinchRef = useRef({ startDistance: 0, startScale: 1 });
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const prevent = (e) => e.preventDefault();
    el.addEventListener("gesturestart", prevent);
    el.addEventListener("gesturechange", prevent);
    el.addEventListener("gestureend", prevent);
    return () => {
      el.removeEventListener("gesturestart", prevent);
      el.removeEventListener("gesturechange", prevent);
      el.removeEventListener("gestureend", prevent);
    };
  }, []);

  // Mostrar hint "Pinch to zoom" solo una vez en móvil
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const seen = localStorage.getItem('pz_seen');
    if (isMobile && !seen) {
      setShowHint(true);
      const t = setTimeout(() => setShowHint(false), 2500);
      localStorage.setItem('pz_seen', '1');
      return () => clearTimeout(t);
    }
  }, []);

  const getDistance = (touches) => {
    const [a, b] = touches;
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  };

  const onTouchStart = (e) => {
    if (e.touches.length === 2) {
      pinchRef.current.startDistance = getDistance(e.touches);
      pinchRef.current.startScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      panRef.current = {
        lastX: e.touches[0].clientX,
        lastY: e.touches[0].clientY,
        isPanning: true,
      };
    }
  };

  // Limitar paneo a los bordes visibles en función del scale y tamaño del wrapper
  const clampTranslate = (nx, ny) => {
    const el = wrapperRef.current;
    if (!el) return { x: nx, y: ny };
    const rect = el.getBoundingClientRect();
    const maxX = ((scale - 1) * rect.width) / 2;
    const maxY = ((scale - 1) * rect.height) / 2;
    return { x: clamp(nx, -maxX, maxX), y: clamp(ny, -maxY, maxY) };
  };

  const onTouchMove = (e) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getDistance(e.touches);
      const newScale = clamp(
        (pinchRef.current.startScale * distance) / pinchRef.current.startDistance,
        1,
        4
      );
      setScale(newScale);
    } else if (e.touches.length === 1 && panRef.current.isPanning) {
      e.preventDefault();
      const dx = e.touches[0].clientX - panRef.current.lastX;
      const dy = e.touches[0].clientY - panRef.current.lastY;
      panRef.current.lastX = e.touches[0].clientX;
      panRef.current.lastY = e.touches[0].clientY;
      setTranslate((t) => clampTranslate(t.x + dx, t.y + dy));
    }
  };

  const onTouchEnd = () => {
    panRef.current.isPanning = false;
    if (scale <= 1.02) {
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    }
  };

  // Desktop: rueda para zoom
  const onWheel = (e) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const factor = delta > 0 ? 0.1 : -0.1;
    setScale((s) => clamp(s + factor, 1, 4));
    if (scale <= 1.01) setTranslate({ x: 0, y: 0 });
  };

  // Desktop: arrastre con mouse cuando hay zoom
  const onMouseDown = (e) => {
    if (scale <= 1) return;
    panRef.current.mouseDown = true;
    panRef.current.lastX = e.clientX;
    panRef.current.lastY = e.clientY;
  };
  const onMouseMove = (e) => {
    if (!panRef.current.mouseDown || scale <= 1) return;
    const dx = e.clientX - panRef.current.lastX;
    const dy = e.clientY - panRef.current.lastY;
    panRef.current.lastX = e.clientX;
    panRef.current.lastY = e.clientY;
    setTranslate((t) => clampTranslate(t.x + dx, t.y + dy));
  };
  const onMouseUp = () => {
    panRef.current.mouseDown = false;
  };

  const onDoubleClick = () => {
    setScale((s) => (s > 1 ? 1 : 2));
    if (scale > 1) setTranslate({ x: 0, y: 0 });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-0 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-[100vw] sm:w-full max-w-none sm:max-w-3xl mx-auto p-1 sm:p-5 h-[calc(95vh-80px)] sm:h-auto sm:max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          className="absolute top-1 right-1 sm:top-2 sm:right-2 text-amber-400 text-3xl sm:text-2xl z-30 pointer-events-auto bg-black/50 rounded-full w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center"
          onClick={onClose}
          aria-label="Close Modal"
        >
          &times;
        </button>

        {/* Contenido del modal */}
        <div className="flex flex-col items-center relative h-full">
          {/* Wrapper con zoom/pan solo dentro, sin afectar overlay */}
          <div
            ref={wrapperRef}
            className="relative w-full h-[calc(100%-60px)] sm:h-[65vh] md:h-[60vh] touch-none select-none overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onDoubleClick={onDoubleClick}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
                transformOrigin: 'center center',
                transition: scale === 1 ? 'transform 120ms ease-out' : 'none',
              }}
            >
              {showHint && (
                <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
                  Pinch to zoom
                </div>
              )}
              <Image
                src={src}
                alt={title || "Image"}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
                className="object-contain rounded-lg pointer-events-none"
                priority
              />
            </div>
          </div>

          {/* Título y dimensiones */}
          <div className="text-center mt-1 sm:mt-3">
            <h2 className="text-base sm:text-xl font-bold text-gray-800 dark:text-gray-100">
              {title}
            </h2>
            <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400">
              {dimensions}
            </p>
            {scale > 1 && (
              <button
                className="mt-2 bg-gray-700 text-white text-xs px-3 py-1 rounded shadow-md hover:bg-gray-600"
                onClick={() => { setScale(1); setTranslate({ x: 0, y: 0 }); }}
              >
                Reset view
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
