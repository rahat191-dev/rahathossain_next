"use client";

import { useEffect, useRef } from "react";

// 👇 এখানে পরিবর্তন করা হয়েছে: -60px এর বদলে -250px দেওয়া হয়েছে যাতে আরও উপর থেকে আসে
const ANIMATION_STYLES = `
@keyframes animBack {
  0% { transform: translateY(-250px); } 
  100% { transform: translateY(120vh); }
}
.animate-slide-down {
  animation: animBack 6s linear infinite;
}
`;

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const numberOfColorBoxes = 400;

  useEffect(() => {
    const bgAnimation = bgRef.current;
    if (!bgAnimation) return;

    bgAnimation.innerHTML = ""; // Clear previous boxes

    for (let i = 0; i < numberOfColorBoxes; i++) {
      const colorBox = document.createElement("div");

      // 🔥 Hover remove + pointer remove
      colorBox.className =
        "m-[2px] bg-[#1d1d1d] transition-all duration-[2000ms] ease-in-out filter brightness-[1.1] pointer-events-none";

      bgAnimation.append(colorBox);
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_STYLES }} />

      {/* Background Grid */}
      <div
        ref={bgRef}
        className={`
          fixed inset-0 w-full h-screen
          grid grid-cols-20 grid-rows-20
          bg-[#0f0f0f] filter saturate-[2]
          ${className || ""}
          z-0
        `}
      ></div>

      {/* Moving Blurred Bar */}
      <div
        className="fixed top-0 left-0 w-full h-10 pointer-events-none animate-slide-down z-10"
        style={{
          backgroundColor: "rgba(183, 255, 111, 1)",
          filter: "blur(80px) drop-shadow(0 0 20px rgb(183, 255, 111))",
        }}
      ></div>

      <style className="z-20" jsx global>{`
        .grid-cols-20 {
          grid-template-columns: repeat(20, 1fr);
        }
        .grid-rows-20 {
          grid-template-rows: repeat(20, 1fr);
        }
      `}</style>
    </>
  );
}