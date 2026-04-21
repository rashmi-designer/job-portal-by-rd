import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { initializeJobs, getJobs } from "../services/jobService";

export default function Jobs() {
  const [jobData, setJobData] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    initializeJobs();
    setJobData(getJobs());
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Filter Jobs
  const filteredJobs = jobData.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) &&
      (location ? job.location === location : true) &&
      (status ? job.status === status : true)
    );
  });

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, location, status]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Jobs Listing</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
          <input
            type="text"
            placeholder="Search job..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded text-sm"
          />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border p-2 rounded text-sm"
          >
            <option value="">All Locations</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
            <option>Chennai</option>
            <option>Pune</option>
            <option>Mumbai</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded text-sm"
          >
            <option value="">All Status</option>
            <option>Open</option>
            <option>Closed</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setLocation("");
              setStatus("");
              setCurrentPage(1);
            }}
            className="bg-gray-500 text-white rounded px-3 py-2 text-sm font-medium hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block overflow-x-auto bg-white shadow rounded">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left text-sm font-semibold">Job Title</th>
                <th className="p-3 border text-left text-sm font-semibold">Company</th>
                <th className="p-3 border text-left text-sm font-semibold">Location</th>
                <th className="p-3 border text-left text-sm font-semibold">Salary</th>
                <th className="p-3 border text-left text-sm font-semibold">Status</th>
                <th className="p-3 border text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="p-3 border text-sm">{job.title}</td>
                    <td className="p-3 border text-sm">{job.company}</td>
                    <td className="p-3 border text-sm">{job.location}</td>
                    <td className="p-3 border text-sm">{job.salary}</td>

                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          job.status === "Open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td className="p-3 border">
                      <Link
                        to={`/job/${job.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm inline-block"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-sm">
                    No jobs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card View - Mobile */}
        <div className="md:hidden space-y-3">
          {currentJobs.length > 0 ? (
            currentJobs.map((job) => (
              <div key={job.id} className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold text-sm flex-1">{job.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded whitespace-nowrap ${
                      job.status === "Open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1"><strong>Company:</strong> {job.company}</p>
                <p className="text-xs text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
                <p className="text-xs text-gray-600 mb-3"><strong>Salary:</strong> {job.salary}</p>
                <Link
                  to={`/job/${job.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs inline-block"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-sm text-gray-500">
              No jobs found
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