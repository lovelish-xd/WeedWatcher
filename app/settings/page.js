'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import { ChevronRight, LogOut } from "lucide-react";
import Navbar from '@/components/layout/navbar';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState("English");

    const toggleLanguageSection = () => {
        setIsOpen((prev) => !prev); // Toggle open/close
    };

    const changeLanguage = (language) => {
        setCurrentLanguage(language); // Update current language
        setIsOpen(false); // Close the language list after selection
    };

    return (
        <>
            <Navbar />
            <div className='flex justify-start mt-10 flex-col items-center'>
                <Image src="/assets/image/user.jpg" alt="Settings" width={150} height={150} className='rounded-full border-2 ' />
                <h1 className='text-xl font-bold mt-2'>Lovelish chauhan</h1>
                <Link href="/settings/updateprofile" className='border-2 mt-2 py-2 px-4 rounded-md'>Edit Profile</Link>
            </div>
            <div className="mx-4 bg-gray-100 rounded-lg p-4 mt-10 relative z-1">
                {/* Language Link */}
                <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={toggleLanguageSection}>
                    <span className="flex items-center gap-2">
                        🌍 <span>Language</span>
                    </span>
                    <span className="text-gray-500 ml-20 text-sm">{currentLanguage}</span> {/* Current Language */}
                    <ChevronRight size={20} className={`transform ${isOpen ? "rotate-90" : ""}`} />
                </div>

                {/* Language Options */}
                {isOpen && (
                    <div className="mt-2 p-4 border rounded-md bg-gray-50">
                        <ul className="list-none">
                            <li className="py-1 cursor-pointer hover:bg-gray-200 px-2 rounded-md" onClick={() => changeLanguage("English")}>English</li>
                            <li className="py-1 cursor-pointer hover:bg-gray-200 px-2 rounded-md" onClick={() => changeLanguage("Spanish")}>Spanish</li>
                            <li className="py-1 cursor-pointer hover:bg-gray-200 px-2 rounded-md" onClick={() => changeLanguage("French")}>French</li>
                            <li className="py-1 cursor-pointer hover:bg-gray-200 px-2 rounded-md" onClick={() => changeLanguage("Hindi")}>Hindi</li>
                            <li className="py-1 cursor-pointer hover:bg-gray-200 px-2 rounded-md" onClick={() => changeLanguage("German")}>German</li>
                        </ul>
                    </div>
                )}
                {/* Theme Toggle */}
                <div className="flex justify-between items-center p-3 border-b">
                    <span className="flex items-center gap-2">
                        🎨 <span>Theme</span>
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={darkMode}
                            onChange={() => setDarkMode(!darkMode)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-black"></div>
                    </label>
                </div>

                {/* Help & FAQ */}
                <Link href="/settings/faq" className="flex justify-between items-center p-3 border-b">
                    <span className="flex items-center gap-2">
                        ❓ <span>Help & FAQ</span>
                    </span>
                    <ChevronRight size={20} />
                </Link>

                {/* Contact Support */}
                <Link href='mailto:support@weedwatcher.com' className="flex justify-between items-center p-3 border-b">
                    <span className="flex items-center gap-2">
                        📞 <span>Contact Support</span>
                    </span>
                    <ChevronRight size={20} />
                </Link>

                {/* Logout */}
                <button className="flex mx-auto p-3 text-red-600 font-semibold cursor-pointer mt-3" onClick={() => alert("Logged out!")}>
                    <LogOut size={20} className="mr-2" />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );
};
export default Settings;