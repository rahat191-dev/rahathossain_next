"use client";

import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Resume from "./components/Resume";

interface HomeProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const sections = [
  { id: "about", component: <> <About /> <Services /> </> },
  { id: "resume", component: <Resume /> },
];

export default function Home({ activeSection, setActiveSection }: HomeProps) {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative w-full flex flex-col lg:flex-row gap-6">

      {/* Hero Section */}
      <Hero />

      {/* Desktop Layout */}
      {isDesktop && (
        <div className="relative bg-nav lg:right-0 lg:-skew-x-3 rounded-e-xl flex-1 lg:ml-[270px] lg:h-[95vh]">
          {sections.map(({ id, component }) => (
            <div
              key={id}
              className={`
                absolute inset-0 transition-all duration-1000 ease-out
                ${activeSection === id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 pointer-events-none -translate-x-60"
                }
                overflow-auto scrollbar-sec pl-8 pr-5 top-5 h-[94%]
              `}
            >
              {component}
            </div>
          ))}
        </div>
      )}

      {/* Mobile Layout: separate scrollable sections */}
      {!isDesktop && (
        <>
          <div className="bg-nav flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec z-10">
            {sections[0].component}
          </div>

          <div className="bg-nav flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec z-10">
            {sections[1].component}
          </div>
        </>
      )}

    </main>
  );
}
