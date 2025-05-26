"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import { ChevronRight, LogOut } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import { ThemeContext } from "@/context/ThemeContext"; // Import Theme Context
import { LanguageContext } from "@/context/LanguageContext"; // Import Language Context
import { translations } from "@/context/translations"; // Import Translations
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';



const Settings = () => {
    const { theme, toggleTheme } = useContext(ThemeContext); // Use Global Theme
    const { language, changeLanguage } = useContext(LanguageContext); // Use Global Language
    const [isOpen, setIsOpen] = useState(false);
    const { user, signOut } = useAuth();

    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <>
            <ProtectedRoute>
                <Navbar />
                <div className={`flex justify-start mt-10 flex-col items-center ${theme === "dark" ? "text-white" : "text-black"}`}>
                <div className='w-36 h-36 relative rounded-full overflow-hidden'>
                    <Image
                        src={user?.profilePic || ""}
                        alt="Profile"
                        fill
                        sizes='150px'
                        className='rounded-full border-2 object-cover'
                        priority
                    />
                </div>
                    <h1 className="text-xl font-bold mt-2">{user?.name || 'User'}</h1>
                    <Link href="/settings/updateprofile" className="border-2 mt-2 py-2 px-4 rounded-md">
                        {translations[language].editProfile}
                    </Link>
                </div>

                <div className={`mx-4 rounded-lg p-4 mt-10 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
                    {/* Language Section */}
                    <div className="flex justify-between items-center p-3 border-b cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                        <span className="flex items-center gap-2">🌍 <span>{translations[language].language}</span></span>
                        <span className="text-gray-500 ml-20 text-sm">{language}</span>
                        <ChevronRight size={20} className={`transform ${isOpen ? "rotate-90" : ""}`} />
                    </div>

                    {/* Language Options */}
                    {isOpen && (
                        <div className={`mt-2 p-4 border rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-50"}`}>
                            <ul className="list-none">
                                <li
                                    className="py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 rounded-md"
                                    onClick={() => {
                                        changeLanguage("English");
                                        setIsOpen(false); // Close dropdown immediately
                                    }}
                                >
                                    English
                                </li>
                                <li
                                    className="py-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 px-2 rounded-md"
                                    onClick={() => {
                                        changeLanguage("Hindi");
                                        setIsOpen(false); // Close dropdown immediately
                                    }}
                                >
                                    हिंदी
                                </li>
                            </ul>
                        </div>
                    )}

                    {/* Theme Toggle */}
                    <div className="flex justify-between items-center p-3 border-b">
                        <span className="flex items-center gap-2">{theme==="dark" ? "☀️" : "🌙"} <span>{translations[language].theme}</span></span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={theme === "dark"} onChange={toggleTheme} />
                            <div className={`w-11 h-6 rounded-full peer-focus:outline-none transition-colors ${theme === "dark" ? "bg-white" : "bg-black"}`}></div>
                        </label>
                    </div>

                    {/* Help & FAQ */}
                    <Link href="/settings/faq" className="flex justify-between items-center p-3 border-b">
                        <span className="flex items-center gap-2">❓ <span>{translations[language].helpFaq}</span></span>
                        <ChevronRight size={20} />
                    </Link>

                    {/* Contact Support */}
                    <Link href="mailto:support@weedwatcher.com" className="flex justify-between items-center p-3 border-b">
                        <span className="flex items-center gap-2">📞 <span>{translations[language].contactSupport}</span></span>
                        <ChevronRight size={20} />
                    </Link>

                    {/* Logout */}
                    <button className="flex mx-auto p-3 text-red-600 font-semibold cursor-pointer mt-3" onClick={handleSignOut}>
                        <LogOut size={20} className="mr-2" />
                        <span>{translations[language].logout}</span>
                    </button>
                </div>
            </ProtectedRoute>
        </>
    );
};

export default Settings;
