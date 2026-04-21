import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import {
  initializeCompanies,
  getCompanies,
  deleteCompany,
} from "../services/companiesService";

export default function CompaniesList() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;

  const navigate = useNavigate();

  // Load Data
  useEffect(() => {
    initializeCompanies();
    setCompanies(getCompanies());
  }, []);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // Delete
  const handleDelete = (id) => {
    deleteCompany(id);
    setCompanies(getCompanies());
  };

  // Filter Logic
  const filtered = companies.filter((item) => {
    return (
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter ? item.status === statusFilter : true)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / perPage);

  const lastIndex = currentPage * perPage;
  const firstIndex = lastIndex - perPage;

  const currentData = filtered.slice(firstIndex, lastIndex);

  const goPrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Companies</h1>

        {/* Filters & Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
          <input
            type="text"
            placeholder="Search company..."
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
            <option>Active</option>
            <option>Inactive</option>
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

          <button
            onClick={() => navigate("/companies/add")}
            className="bg-blue-500 text-white rounded px-3 py-2 text-sm font-medium hover:bg-blue-600"
          >
            Add Company
          </button>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block overflow-x-auto bg-white shadow rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Company</th>
                <th className="p-3 border text-left">Email</th>
                <th className="p-3 border text-left">Location</th>
                <th className="p-3 border text-left">Industry</th>
                <th className="p-3 border text-left">Jobs</th>
                <th className="p-3 border text-left">Status</th>
                <th className="p-3 border text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentData.length > 0 ? (
                currentData.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{c.name}</td>
                    <td className="p-3 border">{c.email}</td>
                    <td className="p-3 border">{c.location}</td>
                    <td className="p-3 border">{c.industry}</td>
                    <td className="p-3 border text-center">{c.jobsPosted}</td>

                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          c.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="p-3 border">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/companies/add/${c.id}`)}
                          className="bg-yellow-400 px-3 py-1 rounded text-white text-xs hover:bg-yellow-500"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(c.id)}
                          className="bg-red-500 px-3 py-1 rounded text-white text-xs hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-sm">
                    No companies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card View - Mobile */}
        <div className="md:hidden space-y-3">
          {currentData.length > 0 ? (
            currentData.map((c) => (
              <div key={c.id} className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold text-sm flex-1">{c.name}</h3>
                  <span
                    className={`px-2 py-1 rounded text-xs whitespace-nowrap ${
                      c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1 break-all"><strong>Email:</strong> {c.email}</p>
                <p className="text-xs text-gray-600 mb-1"><strong>Location:</strong> {c.location}</p>
                <p className="text-xs text-gray-600 mb-1"><strong>Industry:</strong> {c.industry}</p>
                <p className="text-xs text-gray-600 mb-3"><strong>Jobs Posted:</strong> {c.jobsPosted}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/companies/add/${c.id}`)}
                    className="flex-1 bg-yellow-400 px-2 py-2 rounded text-white text-xs hover:bg-yellow-500 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="flex-1 bg-red-500 px-2 py-2 rounded text-white text-xs hover:bg-red-600 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-4 text-sm text-gray-500">
              No companies found
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-5 flex-wrap">
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

            <div className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-500 text-white rounded font-semibold min-w-[80px] sm:min-w-[90px] text-center text-sm">
              {currentPage} / {totalPages}
            </div>

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