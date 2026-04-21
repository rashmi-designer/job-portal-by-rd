import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  initializeApplicants,
  getApplicants,
  updateApplicantStatus,
} from "../services/applicantService";

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  // Load Data from Service
  useEffect(() => {
    initializeApplicants();
    setApplications(getApplicants());
  }, []);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // Update Status using Service
  const updateStatus = (id, newStatus) => {
    const updated = updateApplicantStatus(id, newStatus);
    setApplications(updated);
  };

  // Filter Logic
  const filtered = applications.filter((app) => {
    return (
      (app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.email.toLowerCase().includes(search.toLowerCase()) ||
        app.job.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter ? app.status === statusFilter : true)
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filtered.length / perPage);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const currentData = filtered.slice(firstIndex, lastIndex);

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Applicants</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by name, email, job..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded text-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded text-sm"
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setCurrentPage(1);
            }}
            className="bg-gray-500 text-white rounded px-3 py-2 text-sm font-medium hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block overflow-x-auto bg-white shadow rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Name</th>
                <th className="p-3 border text-left">Email</th>
                <th className="p-3 border text-left">Applied Job</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Change Status</th>
              </tr>
            </thead>

            <tbody>
              {currentData.length > 0 ? (
                currentData.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{app.name}</td>
                    <td className="p-3 border">{app.email}</td>
                    <td className="p-3 border">{app.job}</td>

                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          app.status === "Selected"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td className="p-3 border">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateStatus(app.id, e.target.value)
                        }
                        className="border p-1 rounded text-xs"
                      >
                        <option>Pending</option>
                        <option>Selected</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No applicants found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card View - Mobile */}
        <div className="md:hidden space-y-3">
          {currentData.length > 0 ? (
            currentData.map((app) => (
              <div key={app.id} className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold text-sm flex-1">{app.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                      app.status === "Selected"
                        ? "bg-green-100 text-green-700"
                        : app.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1 break-all"><strong>Email:</strong> {app.email}</p>
                <p className="text-xs text-gray-600 mb-3"><strong>Job:</strong> {app.job}</p>
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app.id, e.target.value)}
                  className="border p-2 rounded text-xs w-full"
                >
                  <option>Pending</option>
                  <option>Selected</option>
                  <option>Rejected</option>
                </select>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-sm text-gray-500">
              No applicants found
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-5 flex-wrap">
            {/* Prev */}
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-sm sm:text-base ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>

            {/* Current Page */}
            <div className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded font-semibold min-w-[80px] sm:min-w-[90px] text-center text-sm">
              {currentPage} / {totalPages}
            </div>

            {/* Next */}
            <button
              onClick={goNext}
              disabled={currentPage === totalPages}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-sm sm:text-base ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}