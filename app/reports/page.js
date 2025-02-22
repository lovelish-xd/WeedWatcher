import Navbar from "@/components/layout/navbar";

const Reports = () => {
    const reports = [
      { date: "2025-02-10", status: "High Weed Growth" },
      { date: "2025-02-09", status: "Moderate Growth" },
    ];
  
    return (
      <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Recent Reports</h2>
        <ul>
          {reports.map((report, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              {report.date} - <span className="text-green-600 font-semibold">{report.status}</span>
            </li>
          ))}
        </ul>
      </div>
      </>
      
    );
  };
  
  export default Reports;
  