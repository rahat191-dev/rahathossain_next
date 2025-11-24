"use client";
import { useState } from "react";
import BubbleCanvas from "@/lib/Animations/BubbleCanvas"; 
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Resume from "./components/Resume";


interface HomeProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Home({ activeSection, setActiveSection }: HomeProps) {

  return (
    <main className="relative w-full flex flex-col lg:flex-row gap-6">
      <Hero />

      <div className="relative lg:right-0 lg:-skew-x-3 lg:origin-top-left rounded-xl flex-1 lg:ml-[340px] overflow-hidden lg:h-[93vh]">
        <BubbleCanvas />
        <div className="relative lg:h-[93%] z-10">
          {activeSection === "about" && (
            <div id="about" className="absolute inset-0 overflow-auto p-5">
              <About />
              <Services />
            </div>
          )}

          {activeSection === "resume" && (
            <div className="absolute inset-0 overflow-auto p-5">
              <Resume />
            </div>
          )}


        </div>
      </div>

      {/* Mobile Layout */}
      <div className="relative lg:hidden rounded-xl flex-1 overflow-hidden">
        <BubbleCanvas />
        <div className="relative flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec lg:h-[93%] lg:top-5 z-10">
          <About />
          <Services />
        </div>
      </div>

      <div id="resume" className="relative lg:hidden rounded-xl flex-1 overflow-hidden">
        <BubbleCanvas />
        <div className="relative flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec lg:h-[93%] lg:top-5 z-10">
          <Resume />
          </div>
        </div>

    </main>
  );
}
