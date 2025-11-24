// app/page.js
"use client";
// Assuming these imports are correct based on your file structure
import BubbleCanvas from "@/lib/Animations/BubbleCanvas"; 
import Image from "next/image"; // Image import is not used but kept
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Resume from "./components/Resume";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col lg:flex-row gap-6">
     <Hero />
      
<div className="relative lg:right-0 lg:-skew-x-3 lg:origin-top-left rounded-xl flex-1 lg:ml-[340px] overflow-hidden lg:h-[93vh]">  
<BubbleCanvas />
<div className="relative flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec lg:h-[93%] lg:top-5 z-10">
      <About />
    <Services />
    </div>  
</div>

<div className="relative lg:right-0 lg:-skew-x-3 lg:origin-top-left rounded-xl flex-1 lg:ml-[340px] overflow-hidden lg:h-[93vh]">  
<BubbleCanvas />
<div className="relative flex flex-col gap-5 p-5 overflow-y-auto scroll-smooth scrollbar-sec lg:h-[93%] lg:top-5 z-10">
      <Resume />
    </div>  
</div>

    </main>
  );
}