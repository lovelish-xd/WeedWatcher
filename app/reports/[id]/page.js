'use client';
import { useState, useEffect,use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import fallbackData from '@/data/data.json'

export default function ReportPage({ params }) {
  const { id } = use(params);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`/api/reports/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id]);
  
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!report) return <p className="text-center mt-10">Report not found</p>;

  console.log(report);

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center">
      <div className="max-w-2xl w-full">
        <Link href="/reports" className="text-gray-600 text-sm mb-4 inline-block">
          ← Back to Reports
        </Link>
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className='relative h-80 w-full'>
            <Image
              src={report.image}
              alt={`Close-up of ${report.weedName}`}
              fill
              style={{ objectFit: "cover" }}
              className="w-full h-full object-cover rounded-lg mb-4"
            />
          </div>
          
          <h1 className="text-2xl font-semibold mb-2">{report.weedName}</h1>
          <p className="text-gray-600 mb-4">Analyzed on {report.date}</p>
          <div>
            <h2 className=" text-lg font-semibold mb-2">Description</h2>
            <p>{report.description}</p>
          </div>
          
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Potential Diseases:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {report.potentialDiseases.map((disease, index) => (
                <li key={index}>{disease}</li>
              ))}
            </ul>
          </div>
          <div className='mt-4'>
            <h2 className="text-lg font-semibold mb-2">Recommended Solutions:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {report.solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
