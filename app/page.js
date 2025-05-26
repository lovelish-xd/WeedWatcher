
"use client";
import Navbar from "@/components/layout/navbar";
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head';
import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext"; // Import Language Context
import { translations } from "@/context/translations"; // Import Translation
import ProtectedRoute from '@/components/ProtectedRoute';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const Home = () => {
  const { language } = useContext(LanguageContext); // Use selected language
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <div className="min-h-screen flex flex-col">
          <Head>
            <title>WeedWatcher</title>
            <meta name="description" content="Upload images of plants in your garden, identify unwanted weeds, and get information about potential diseases and solutions." />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="flex-grow">
            {/* Hero Section */}
            <section className="text-center py-16 px-4 bg-green-50">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-6 text-gray-900">Identify Weeds & Get Solutions</h1>
                <p className="text-xl text-gray-600 mb-10">
                  Upload images of weeds in your garden and get
                  information about potential diseases and solutions.
                </p>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-md transition duration-300"
                  onClick={() => router.push('/upload')}
                >
                  Get Started
                </button>
              </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How It Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="border rounded-lg p-8 text-center">
                    <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Upload</h3>
                    <p className="text-gray-600">
                      Take a photo or upload an image of the plant you want to identify.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="border rounded-lg p-8 text-center">
                    <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Identify</h3>
                    <p className="text-gray-600">
                      Our system will identify the plant and provide detailed information.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="border rounded-lg p-8 text-center">
                    <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-900">Track</h3>
                    <p className="text-gray-600">
                      View your history and keep track of all your identified plants.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 bg-green-50">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Features</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex">
                    <div className="mr-6">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">Weed Identification</h3>
                      <p className="text-gray-600">Quickly identify unwanted weeds in your garden to take proper action.</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-6">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">Disease Detection</h3>
                      <p className="text-gray-600">Identify plant diseases early and get recommendations for treatment.</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-6">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">Care Instructions</h3>
                      <p className="text-gray-600">Get detailed care instructions for identified plants to help them thrive.</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-6">
                      <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">Seasonal Tips</h3>
                      <p className="text-gray-600">Receive seasonal gardening tips and reminders tailored to your plants.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          <footer className="bg-white py-8 border-t">
            <div className="max-w-6xl mx-auto px-4 text-center text-gray-500">
              <p>© 2025 WeedWatcher. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Home;
