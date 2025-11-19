// app/layout.tsx
import "./globals.css";
import AnimatedBackground from "./components/AnimatedBackground";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full w-full m-0 p-0">
      <body className="h-full w-full bg-[#1e1e1e] m-0 p-0 overflow-hidden relative">

        {/* Background Animation */}
        <AnimatedBackground className="fixed top-0 left-0 w-full h-full z-0" />

        {/* Content Wrapper */}
        <div
          className="
            absolute top-0 left-0 w-full h-full z-10
            flex flex-col
            sm:flex-row
          "
        >
          {/* Navbar (Top on mobile, Left on desktop) */}
          <Navbar className="w-full sm:w-[220px] shrink-0" />

          {/* Page Content */}
          <main className="flex-1 w-full h-full overflow-auto p-4">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
