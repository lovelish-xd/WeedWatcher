"use client";
import { useContext, useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import { LanguageContext } from "@/context/LanguageContext";
import { translations } from "@/context/translations";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from '@/components/ProtectedRoute';
import { ThemeContext } from "@/context/ThemeContext"; // Import Theme Context
import { useAuth } from "@/context/AuthContext";


const Reports = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext); // Use Global Theme
  const { user } = useAuth(); // Get current user
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reports from MongoDB
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        if (!user) return;
        // Fetch reports from MongoDB API route
        const response = await fetch(`/api/reports?userId=${encodeURIComponent(user.id)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user]);

  console.log(reports);


  

  return (
    <>
      <ProtectedRoute>
        <Navbar />
        <div className="p-4 mb-16">
          <h2 className="text-2xl font-bold mb-4">{translations[language].recentReports}</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading reports...</p>
            </div>
          ) : reports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.map((report,index) => (
                <div key={report.id || index} className={` rounded-lg overflow-hidden shadow-md ${theme === "dark" ? "text-white bg-gray-800" : "text-black bg-white"}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={report.image}
                      alt={report.weedName || "processing ..."}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className={`text-2xl font-bold mb-2`}>{report.weedName || "Processing ..."}</h3>

                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600 text-sm">{report.date}</span>
                    </div>


                    <Link href={`/reports/${report._id}`} className="block w-full">
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition-colors">
                        {translations[language].viewDetails || "View Details"}
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>No reports found. Create your first report!</p>
            </div>
          )}
        </div>
      </ProtectedRoute>
    </>
  );
};

export default Reports;
