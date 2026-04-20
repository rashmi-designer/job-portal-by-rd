import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";
import {
  initializeCompanies,
  getCompanies,
  addCompany,
  updateCompany,
} from "../services/companiesService";

export default function AddCompany() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    industry: "",
    jobsPosted: "",
    status: "Active",
  });

  const [editId, setEditId] = useState(null);

  // 🔹 State to track validation errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  // Load Data
  useEffect(() => {
    initializeCompanies();
    if (id) {
      const companies = getCompanies();
      const company = companies.find((c) => c.id === parseInt(id));
      if (company) {
        setForm(company);
        setEditId(company.id);
      }
    }
  }, [id]);

  // 🔹 Logic to validate each field
  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Company name is required";
        else if (value.length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address";
        break;
      case "location":
        if (!value.trim()) error = "Location is required";
        break;
      case "industry":
        if (!value.trim()) error = "Industry is required";
        break;
      case "jobsPosted":
        if (!value.trim()) error = "Jobs posted is required";
        else if (isNaN(value) || Number(value) < 0) error = "Enter a valid number (0 or more)";
        break;
      default:
        break;
    }
    return error;
  };

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setForm({
      ...form,
      [name]: value,
    });

    // 🔹 Validate on every keystroke
    const fieldError = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  // Submit
  const handleSubmit = () => {
    const { name, email, location, industry, jobsPosted, status } = form;

    // Check for empty fields and trigger all validations
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (key !== 'status') { // Skip status as it's always valid
        const error = validate(key, form[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please verify all the fields in the form");
      return;
    }

    if (editId) {
      updateCompany({
        ...form,
        id: editId,
      });
      toast.success("Company updated successfully!");
    } else {
      addCompany(form);
      toast.success("Company added successfully!");
    }

    navigate("/companies");
  };

  // Helper to apply error styles
  const inputClass = (name) => `
    w-full border p-2 rounded outline-none transition
    ${errors[name] ? "border-red-500 ring-1 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}
  `;

  return (
    <MainLayout>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {editId ? "Edit Company" : "Add Company"}
        </h1>

        {/* Form */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter company name"
                value={form.name}
                onChange={handleChange}
                className={inputClass("name")}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={form.location}
                onChange={handleChange}
                className={inputClass("location")}
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry *
              </label>
              <input
                type="text"
                name="industry"
                placeholder="Enter industry"
                value={form.industry}
                onChange={handleChange}
                className={inputClass("industry")}
              />
              {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
            </div>

            {/* Jobs Posted */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jobs Posted *
              </label>
              <input
                type="number"
                name="jobsPosted"
                placeholder="Enter number of jobs"
                value={form.jobsPosted}
                onChange={handleChange}
                className={inputClass("jobsPosted")}
              />
              {errors.jobsPosted && <p className="text-red-500 text-xs mt-1">{errors.jobsPosted}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8 pt-6 border-t">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
            >
              {editId ? "Update Company" : "Add Company"}
            </button>

            <button
              onClick={() => navigate("/companies")}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-600 transition duration-200"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}