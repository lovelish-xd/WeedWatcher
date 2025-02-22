'use client';
import { useState } from "react";
import { Home, Camera, FileText, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Navbar = () => {
  const pathname = usePathname();
  return (
      <>        
      <div className="items-center bg-green-600 text-white p-4 shadow-md rounded-b-2xl">
        <h1 className="text-lg text-center font-bold">WeedWatcher</h1>
      </div>
        <nav className="fixed bg-white bottom-0 left-0 w-full md:px-6 rounded-t-2xl shadow-top z-10">
        <div className="flex justify-around md:justify-start md:space-x-8 w-full md:w-auto py-3 ">
          <Link href="/" onClick={() => setActive("home")}>
            <div className={`flex flex-col items-center ${pathname === "/" ? "text-green-500" : "text-gray-500"}`}>
              <Home size={24} />
              <span className="text-xs">Home</span>
            </div>
          </Link>
          <Link href="/camera" onClick={() => setActive("camera")}>
            <div className={`flex flex-col items-center ${pathname === "/camera" ? "text-green-500" : "text-gray-500"}`}>
              <Camera size={24} />
              <span className="text-xs">Camera</span>
            </div>
          </Link>
          <Link href="/reports" onClick={() => setActive("reports")}>
            <div className={`flex flex-col items-center ${pathname === "/reports" ? "text-green-500" : "text-gray-500"}`}>
              <FileText size={24} />
              <span className="text-xs">Reports</span>
            </div>
          </Link>
          <Link href="/settings" onClick={() => setActive("settings")}>
            <div className={`flex flex-col items-center ${pathname === "/settings" ? "text-green-500" : "text-gray-500"}`}>
              <Settings size={24} />
              <span className="text-xs">Settings</span>
            </div>
          </Link>
        </div>
      </nav>
      </>
        
  );
};

export default Navbar;
