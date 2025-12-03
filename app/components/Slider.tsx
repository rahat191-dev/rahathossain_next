"use client";

import React, { useState, useEffect, useRef } from "react";

// Image constants
const CENTER_SIZE = 256;
const SIDE_SIZE = 192;
const GAP = 16;

// FIX: Recalculate SLIDE_DISTANCE for correct center-to-center alignment.
// Distance = (Half of Center Size) + (Half of Side Size) + Gap
const SLIDE_DISTANCE = CENTER_SIZE / 2 + SIDE_SIZE / 2 + GAP; // 128 + 96 + 16 = 240

const TRANSITION_DURATION = 500; // ms

export default function Slider() {
  const images: string[] = [
    "images/images/2.jpeg",
    "images/images/3.jpg",
    "images/images/4.jpg",
    "images/images/5.jpg",
  ];

  const total = images.length;

  // --- State ---
  const [current, setCurrent] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [transitioning, setTransitioning] = useState<boolean>(false);

  // --- Refs ---
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const startX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // --- Auto Slide ---
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideInterval.current = setInterval(() => {
      handleSmoothSlide("next");
    }, 2000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  // --- Smooth Slide ---
  const handleSmoothSlide = (direction: "next" | "prev") => {
    if (transitioning) return;
    stopAutoSlide();
    setTransitioning(true);

    const distance = direction === "next" ? -SLIDE_DISTANCE : SLIDE_DISTANCE;
    setOffset(distance);

    setTimeout(() => {
      setCurrent((prev) => (prev + (direction === "next" ? 1 : -1) + total) % total);
      setOffset(0);
      setTransitioning(false);
      startAutoSlide();
    }, TRANSITION_DURATION);
  };

  const smoothPrevSlide = () => handleSmoothSlide("prev");
  const smoothNextSlide = () => handleSmoothSlide("next");

  // --- Drag / Touch Handlers ---
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (transitioning) return;
    stopAutoSlide();
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging.current || transitioning) return;
    const diff = e.touches[0].clientX - startX.current;
    setOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (offset > 50) handleSmoothSlide("prev");
    else if (offset < -50) handleSmoothSlide("next");
    else {
      // Snap back smoothly
      setOffset(0);
      startAutoSlide();
    }
  };

  // --- Helpers ---
  const getPrev = (index: number): number => (index - 1 + total) % total;
  const getNext = (index: number): number => (index + 1) % total;
  const visibleIndices: number[] = [getPrev(current), current, getNext(current)];

  // --- Render ---
  return (
    <div
      className="w-full h-72 overflow-hidden select-none flex justify-center items-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative flex justify-center items-center gap-4"
        style={{
          transform: `translateX(${offset}px)`,
          transition: transitioning ? `transform ${TRANSITION_DURATION}ms ease-out` : "none",
        }}
      >
        {visibleIndices.map((i) => {
          const isCenter = i === current;

          // ratio is calculated based on the new, corrected SLIDE_DISTANCE
          const ratio = Math.min(Math.abs(offset) / SLIDE_DISTANCE, 1);
          let opacity = isCenter ? 1 : 0.7;
          let scale = isCenter ? 1.1 : 1.0;
          let width = isCenter ? CENTER_SIZE : SIDE_SIZE;
          let height = width;

          const incomingIndex = offset < 0 ? getNext(current) : getPrev(current);

          if ((transitioning || isDragging.current) && ratio > 0) {
            if (isCenter) {
              opacity = 1 - ratio * 0.3;
              scale = 1.1 - ratio * 0.1;
              width = CENTER_SIZE - ratio * (CENTER_SIZE - SIDE_SIZE);
              height = width;
            } else if (i === incomingIndex) {
              opacity = 0.7 + ratio * 0.3;
              scale = 1.0 + ratio * 0.1;
              width = SIDE_SIZE + ratio * (CENTER_SIZE - SIDE_SIZE);
              height = width;
            }
          }

          return (
            <img
              key={i}
              src={images[i]}
              draggable={false}
              className={`object-cover rounded-xl z-${isCenter ? 10 : 0}`}
              style={{
                width,
                height,
                transform: `scale(${scale})`,
                opacity,
                transition: `opacity ${TRANSITION_DURATION}ms ease-out, transform ${TRANSITION_DURATION}ms ease-out, width ${TRANSITION_DURATION}ms ease-out, height ${TRANSITION_DURATION}ms ease-out`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}