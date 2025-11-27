"use client";

import { useEffect, useRef, useState } from "react";

export default function MousePointer() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });      // current pointer position
  const target = useRef({ x: 0, y: 0 });   // mouse target position
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Hover on navbar
    const navbar = document.querySelector(".navbar-container");
    const handleMouseEnter = () => setHovering(true);
    const handleMouseLeave = () => setHovering(false);
    if (navbar) {
      navbar.addEventListener("mouseenter", handleMouseEnter);
      navbar.addEventListener("mouseleave", handleMouseLeave);
    }

    // Smooth trailing animation
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.05;
      pos.current.y += (target.current.y - pos.current.y) * 0.05;

      if (pointerRef.current) {
        const rect = pointerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const scale = hovering ? 3 : 1;

        // Center the pointer exactly at the mouse
        const offsetX = (width * scale) / 2;
        const offsetY = (height * scale) / 2;

        pointerRef.current.style.transform = `translate3d(${pos.current.x - offsetX}px, ${pos.current.y - offsetY}px, 0) scale(${scale})`;
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (navbar) {
        navbar.removeEventListener("mouseenter", handleMouseEnter);
        navbar.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [hovering]);

  return (
    <div
      ref={pointerRef}
      className={`
        fixed pointer-events-none z-50
        w-6 h-6 rounded-full left-0
        ${hovering 
          ? "bg-transparent opacity-100 ring-[1px] ring-brand" 
          : "bg-brand opacity-50 ring-0"
        }
      `}
    />
  );
}
