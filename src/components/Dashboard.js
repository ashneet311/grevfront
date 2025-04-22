import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
  });

  // Fetch complaints from the backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("/api/complaints");
        const data = await response.json();
        setComplaints(data);

        // Calculate stats
        const resolved = data.filter((c) => c.status === "Resolved").length;
        const pending = data.filter((c) => c.status === "Pending").length;
        setStats({
          total: data.length,
          resolved,
          pending,
        });
      } catch (error) {
        console.error("Failed to fetch complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        College Grievance Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Complaints</h2>
          <p className="text-4xl font-bold text-gray-800">{stats.total}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Resolved</h2>
          <p className="text-4xl font-bold text-green-600">{stats.resolved}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-600">Pending</h2>
          <p className="text-4xl font-bold text-yellow-500">{stats.pending}</p>
        </div>
      </div>

      {/* Complaint Status Visualization */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Complaint Status</h2>
        <div className="flex items-center space-x-4">
          <div className="w-1/2">
            <p className="text-gray-600 mb-2">Resolved</p>
            <div className="bg-green-600 h-4 rounded-full" style={{ width: `${(stats.resolved / stats.total) * 100 || 0}%` }}></div>
          </div>
          <div className="w-1/2">
            <p className="text-gray-600 mb-2">Pending</p>
            <div className="bg-yellow-500 h-4 rounded-full" style={{ width: `${(stats.pending / stats.total) * 100 || 0}%` }}></div>
          </div>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Complaint Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-4">Student</th>
                <th className="border-b p-4">Complaint</th>
                <th className="border-b p-4">Date</th>
                <th className="border-b p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map((complaint) => (
                  <tr key={complaint._id} className="hover:bg-gray-100">
                    <td className="border-b p-4">{complaint.user.name}</td>
                    <td className="border-b p-4">{complaint.title}</td>
                    <td className="border-b p-4">
                      {new Date(complaint.date).toLocaleDateString()}
                    </td>
                    <td
                      className={`border-b p-4 ${
                        complaint.status === "Resolved"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {complaint.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
