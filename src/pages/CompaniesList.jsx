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
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Companies</h1>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-3 mb-4">
          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
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
            className="bg-gray-500 text-white rounded px-3 py-2"
          >
            Reset
          </button>

          <button
            onClick={() => navigate("/companies/add")}
            className="bg-blue-500 text-white rounded px-3 py-2"
          >
            Add Company
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Company</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Industry</th>
                <th className="p-3 border">Jobs</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
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
                    <td className="p-3 border">{c.jobsPosted}</td>

                    <td className="p-3 border">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          c.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="p-3 border flex gap-2">
                      <button
                        onClick={() => navigate(`/companies/add/${c.id}`)}
                        className="bg-yellow-400 px-3 py-1 rounded text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-500 px-3 py-1 rounded text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4">
                    No companies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className="flex justify-center items-center gap-3 mt-5">
            <button
              onClick={goPrev}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }`}
            >
              <i className="fa-solid fa-angle-left"></i>
            </button>

            <div className="px-4 py-2 bg-blue-500 text-white rounded font-semibold min-w-[90px] text-center">
              {currentPage} / {totalPages}
            </div>

            <button
              onClick={goNext}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full border flex items-center justify-center ${
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