"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { useDarkMode } from "./hooks/useDarkMode"; 
import TypingAnimation from "@/lib/Animations/TypingAnimation";
import { userLinks, secLinks } from "./data/buttons"; 

interface NavbarProps {
  className?: string; 
  setActiveSection?: (section: string) => void;
}

export default function Navbar({ className, setActiveSection }: NavbarProps) {
    // Placeholder hooks and data structures for compilation
    const { isDark, toggleDarkMode } = useDarkMode(); // Assuming this returns {isDark: boolean, toggleDarkMode: () => void}
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id:string) => {
        const element = document.getElementById(id);
        if (element) {
            // This scrolls the entire page to the element
            element.scrollIntoView({behavior: "smooth", block: "start"})
            // Close mobile menu after clicking a link
            setIsOpen(false); 
        }
    }

    return (
      <nav className="lg:h-full">
    <div className="bg-nav lg:h-full lg:-skew-x-3 sm:px-3 lg:origin-top-left lg:ml-6">
        <div className="flex justify-between items-center px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex flex-col items-start sm:hidden text-foreground">
                <a href="/" className="font-extrabold text-sm">Rahat Hossain</a>
                <div className="mt-[-5px] text-brand text-sm"><TypingAnimation /></div>
                
            </div>
            <div className="flex sm:flex-col-reverse sm:justify-center gap-4 items-center sm:w-full">
                {userLinks.map((link, idx) => (
  <Link key={idx} href={link.href!}>
    {link.image && <Image 
      src={link.image!} 
      alt="Button"
      height={25}
      width={25}
      className="icon-filter"
    />}
  </Link>
))}

                <button onClick={toggleDarkMode}>
                    <Image 
                    src={isDark ? "/images/svg/nav-svg/light.svg" : "/images/svg/nav-svg/dark.svg"}
                    alt="Mode"
                    width={25}
                    height={25}
                    className="icon-filter"
                    />
                </button>
                <button 
                onClick={() => setIsOpen (!isOpen)}
                className="flex flex-col gap-[5px] group">
                    <span className="bg-foreground w-5 h-[2px] group-hover:bg-brand group-hover:w-6 transition-all"></span>
                    <span className="bg-foreground w-6 h-[2px] group-hover:bg-brand group-hover:w-6 transition-all"></span>
                    <span className="bg-foreground w-4 h-[2px] group-hover:bg-brand group-hover:w-6 transition-all"></span>
                </button>
               
            </div>
        </div>

<div className="
  flex sm:flex-col sm:gap-4 justify-between py-4
  overflow-x-auto lg:overflow-visible
  scroll-smooth scrollbar-custom relative
">
  {secLinks.map((link, idx) => (
<div key={idx} className="relative flex-shrink-0 w-[20%] sm:w-[100%] flex items-center justify-center group">
  
  <button
    onClick={() => {
      if (link.sec) {
        if (window.innerWidth >= 1024) {
          setActiveSection?.(link.sec);
        } else {
          scrollToSection(link.sec);
        }
      }
    }}
    className="flex items-center justify-center p-2"
  >
    {link.image && (
      <Image
        src={link.image}
        alt={link.sec || "Button"}
        height={25}
        width={25}
        className="icon-filter"
      />
    )}
  </button>

  {/* Tooltip */}
  {link.hover && (
    <span className="absolute py-1 px-2 rounded transition duration-300 left-12 opacity-0 group-hover:opacity-100 bg-brand hidden lg:flex">      
    {link.hover}
    </span>
  )}

</div>

  ))}
</div>

    </div>
     <div 
className={`
  fixed top-0 left-0 bg-nav sm:-left-20 text-pg w-full sm:w-[400px] h-full z-50
  transform transition-transform duration-700 ease-in-out
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
`}
>
            <button
            onClick={() => setIsOpen(false)}
            className="w-full text-3xl sm:absolute bg-nav sm:w-auto sm:ml-[400px] pt-4 px-4 sm:py-2 left-0 items-center hover:text-brand transition-colors duration-500"
            >✕</button>
            <div className="p-6 sm:ml-20">
             <SearchBox />
             </div>
                <ul className="p-6 sm:ml-20">
                  <li>Hello..</li>
                </ul>
                </div>
    </nav>
    )
}