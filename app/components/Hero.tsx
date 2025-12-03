"use client"
import Image from "next/image";
import Link from "next/link";
import TypingAnimation from "@/lib/Animations/TypingAnimation";
import { contactLinks } from "./data/buttons";

export default function Hero() {
  return (
    <div className="relative flex-shrink-0 w-full h-[500px] 
                    lg:fixed z-20 lg:w-[300px] lg:h-[95%] 
                    rounded-xl overflow-hidden 
                    lg:-skew-x-3 lg:origin-top-left">
      
      <Image
        src="/images/brand/rahat.webp"
        alt="Rahat Hossain"
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 300px "
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-30 px-4">
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-center items-center z-30">
          <h1 className="text-white text-3xl lg:text-4xl font-extrabold drop-shadow-lg">
            Rahat Hossain
          </h1>

          <div className="text-base mb-5 text-brand2 drop-shadow-md">
            <TypingAnimation />
          </div>

          <div className="flex mb-14 gap-4">
            <a href="tel:+8801920852271" className="icon-filter">
              <img src="/images/svg/contacts/call.svg"/>
              </a>
            <a href="mailto:rahat292.dev@gmail.com" className="icon-filter">
              <img src="/images/svg/contacts/email.svg"/>
              </a>
          </div>

          <div className="flex w-full text-sm text-white font-extrabold justify-between border-t border-white relative">
            <div className="absolute left-1/2 top-0 h-full w-px bg-white"></div>

            <a 
            href="/images/downloads/resume.pdf" 
            download="Rahat_Hossain_CV"   
            className="flex gap-2 cursor-pointer p-4 w-[50%] justify-center group"
            > 
              DOWNLOAD CV
              <Image 
                src="/images/svg/contacts/cv-download.svg" 
                alt="Contact"
                width={20}
                height={20}
                className="filter invert brightness-0 group-hover:filter-none transition duration-200"
              /> 
            </a>

            {/* ✅ Scroll to contact section */}
            <a
              href="#contact"
              className="flex gap-2 p-4 w-[50%] cursor-pointer justify-center group"
            > 
              CONTACT ME
              <Image 
                src="/images/svg/contacts/contact-me.svg" 
                alt="Contact"
                width={20}
                height={20}
                className="filter invert brightness-0 group-hover:filter-none transition duration-200"
              /> 
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
