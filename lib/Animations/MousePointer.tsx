"use client";

import { useEffect, useRef } from "react";

interface MousePointerProps {
  className?: string;
}

export default function MousePointer({ className }: MousePointerProps) {
  const pointerRef = useRef<HTMLDivElement>(null);

  const pos = useRef({ x: 0, y: 0 });       // current pointer position
  const target = useRef({ x: 0, y: 0 });    // actual mouse position

  const hoveringRef = useRef(false);        // hover state ref

  useEffect(() => {
    // --- Mouse move ---
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // --- Hover tracking ---
    const interactiveElement = document.querySelector(".mousepointer");
    const handleMouseEnter = () => (hoveringRef.current = true);
    const handleMouseLeave = () => (hoveringRef.current = false);

    if (interactiveElement) {
      interactiveElement.addEventListener("mouseenter", handleMouseEnter);
      interactiveElement.addEventListener("mouseleave", handleMouseLeave);
    }

    // --- Animation loop ---
    let animationFrame: number;
    const speed = 0.1;

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * speed;
      pos.current.y += (target.current.y - pos.current.y) * speed;

      if (pointerRef.current) {
        const scale = hoveringRef.current ? 3 : 1;
        pointerRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${scale})`;

        // Hover style
        pointerRef.current.style.backgroundColor = hoveringRef.current ? "transparent" : "rgb(183, 255, 111)"; // replace with brand
        pointerRef.current.style.opacity = hoveringRef.current ? "0.7" : "0.5";
        pointerRef.current.style.border = hoveringRef.current ? "1px solid rgb(183, 255, 111)" : "0";
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (interactiveElement) {
        interactiveElement.removeEventListener("mouseenter", handleMouseEnter);
        interactiveElement.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={pointerRef}
      className={`
        hidden lg:flex fixed pointer-events-none z-50
        w-6 h-6 rounded-full
        -left-3 -top-3
        transform -translate-x-1/2 -translate-y-1/2
        transition-all duration-200 ease-out
      `}
    />
  );
}
