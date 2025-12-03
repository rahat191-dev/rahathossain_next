"use client";

import React, { useState, useEffect, useRef } from "react";

// --- CONSTANTS ---
const SIDE_SIZE = 160;
const CENTER_SIZE = 160;
const GAP = 16;
const TRANSITION_DURATION = 500;
const VISIBLE_WIDTH = SIDE_SIZE * 2 + CENTER_SIZE + GAP * 2;

export default function Media() {
  const images = [
    "/images/images/2.jpeg",
    "/images/images/3.jpg",
    "/images/images/4.jpg",
    "/images/images/5.jpg",
    "/images/images/2.jpeg",
    "/images/images/3.jpg",
    "/images/images/4.jpg",
    "/images/images/5.jpg",
  ];

  const total = images.length;
  const sliderImages = [...images, ...images, ...images];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  // --- AUTOPLAY ---
  useEffect(() => {
    if (total > 1) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [currentIndex, total]);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setInterval(() => handleSlide("next"), 3000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  const handleSlide = (direction: "next" | "prev") => {
    if (transitioning || total <= 1) return;
    setTransitioning(true);
    stopAutoSlide();

    const moveStep =
      direction === "next" ? -(CENTER_SIZE + GAP) : CENTER_SIZE + GAP;

    setOffset(moveStep);

    setTimeout(() => {
      let newIndex =
        direction === "next"
          ? (currentIndex + 1) % total
          : (currentIndex - 1 + total) % total;

      setCurrentIndex(newIndex);
      setOffset(0);
      setTransitioning(false);
      startAutoSlide();
    }, TRANSITION_DURATION);
  };

  const totalItemWidth = CENTER_SIZE + GAP;
  const positionOfCurrentElementStart = currentIndex * totalItemWidth;
  const requiredShift =
    positionOfCurrentElementStart + CENTER_SIZE / 2 - VISIBLE_WIDTH / 2;
  const finalTransform = `translateX(${-requiredShift + offset}px)`;

  return (
    <main className="flex flex-col items-center">
      <div className="text-foreground border-b border-pg pb-2 w-full mb-6">
        <h2 className="text-xl font-extrabold">
          <span className="text-brand font-extrabold">M</span>edia
        </h2>
      </div>

      {/* --- CAROUSEL --- */}
      <div
        className="relative h-72 flex justify-center items-center overflow-hidden"
        style={{ width: `${VISIBLE_WIDTH}px` }}
      >
        {/* --- LEFT BUTTON --- */}
        <button
          onClick={() => handleSlide("prev")}
          className="absolute left-7  text-3xl text-white/40 hover:text-brand  top-1/2 -translate-y-1/2 duration-500 transition p-2 rounded-full z-20"
        >
          ◀
        </button>

        {/* --- SLIDER --- */}
        <div
          className="flex items-center"
          style={{
            transform: finalTransform,
            transition: transitioning
              ? `transform ${TRANSITION_DURATION}ms ease-in-out`
              : "none",
          }}
        >
          {sliderImages.map((img, i) => {
            const isCenter = i % total === currentIndex;
            const size = isCenter ? CENTER_SIZE : SIDE_SIZE;
            const opacity = isCenter ? 1 : 0.7;

            return (
              <img
                key={i}
                src={img}
                draggable={false}
                onClick={() => isCenter && setFullscreen(true)}
                className="object-cover rounded-xl cursor-pointer transition-all duration-500"
                style={{
                  width: size,
                  height: size,
                  marginRight: `${GAP}px`,
                  opacity: opacity,
                }}
              />
            );
          })}
        </div>

        {/* --- RIGHT BUTTON --- */}
        <button
          onClick={() => handleSlide("next")}
          className="absolute right-7 top-1/2  -translate-y-1/2 text-3xl text-white/40 hover:text-brand duration-500 transition p-2 rounded-full z-20"
        >
          ▶
        </button>
      </div>

      {/* FULLSCREEN VIEW */}
      {fullscreen && (
        <div
          onClick={() => setFullscreen(false)}
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 cursor-pointer"
        >
          <img
            src={images[currentIndex]}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            draggable={false}
          />
        </div>
      )}
    </main>
  );
}
