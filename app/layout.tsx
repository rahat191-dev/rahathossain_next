"use client";

import "./globals.css";
import AnimatedBackground from "../lib/Animations/AnimatedBackground";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import LoadingAnimation from "@/lib/Animations/LoadingAnimation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fake loading 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="h-full w-full m-0 p-0">
      <body className="h-full w-full bg-[#1e1e1e] m-0 p-0 relative">
        {/* Animated Background */}
        <AnimatedBackground className="fixed top-0 left-0 w-full h-full z-0" />

        {/* Loading or Main Content */}
        {loading ? (
          <div className="flex items-center justify-center h-screen z-50 relative">
            <LoadingAnimation size={140} color="#60A5FA" duration={2} />
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row h-full z-10 relative">
            {/* Navbar */}
            <Navbar className="w-full sm:w-[220px] shrink-0" />

            {/* Main Content */}
            <main className="flex-1 w-full overflow-auto p-4 text-white text-xl">
              {children}
            </main>
          </div>
        )}
      </body>
    </html>
  );
}
