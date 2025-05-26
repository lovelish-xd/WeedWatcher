"use client";
import { Home, Camera, FileText, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext"; // Import Theme Context

const Navbar = () => {
  const pathname = usePathname();
  const { theme } = useContext(ThemeContext); // Get current theme

  return (
    <>
      {/* Top Header */}
      {/* <div className={`items-center p-4 shadow-md rounded-b-3xl 
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-green-600 text-white"}`}>
        <h1 className="text-lg text-center font-bold">
          {pathname === "/" && "Home"}
          {pathname === "/upload" && "Upload"}
          {pathname === "/reports" && "Reports"}
          {pathname === "/settings" && "Settings"}
        </h1>
      </div> */}

      {/* Bottom Navigation Bar */}
      <nav className={`fixed bottom-0 left-0 w-full md:px-6 rounded-t-3xl shadow-top z-10 
        ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <div className="flex justify-around  py-3">
          <Link href="/">
            <div className={`flex flex-col items-center 
              ${pathname === "/" ? (theme === "dark" ? "text-green-400" : "text-green-500") : "text-gray-500"}`}>
              <Home size={36} />
            </div>
          </Link>
          <Link href="/upload">
            <div className={`flex flex-col items-center 
              ${pathname === "/camera" ? (theme === "dark" ? "text-green-400" : "text-green-500") : "text-gray-500"}`}>
              <Camera size={36} />
            </div>
          </Link>
          <Link href="/reports">
            <div className={`flex flex-col items-center 
              ${pathname === "/reports" ? (theme === "dark" ? "text-green-400" : "text-green-500") : "text-gray-500"}`}>
              <FileText size={36} />
            </div>
          </Link>
          <Link href="/settings">
            <div className={`flex flex-col items-center 
              ${pathname === "/settings" ? (theme === "dark" ? "text-green-400" : "text-green-500") : "text-gray-500"}`}>
              <Settings size={36} />
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
