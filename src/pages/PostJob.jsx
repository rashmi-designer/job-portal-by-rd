import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";
import { addJob, getJobs } from "../services/jobService";

export default function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
  });

  // 🔹 State to track validation errors
  const [errors, setErrors] = useState({});

  // 🔹 Logic to validate each field
  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "title":
        if (!value.trim()) error = "Job title is required";
        else if (value.length < 5) error = "Title must be at least 5 chars";
        break;
      case "company":
        if (!value.trim()) error = "Company name is required";
        break;
      case "location":
        if (!value.trim()) error = "Location is required";
        break;
      case "salary":
        if (!value.trim()) error = "Salary is required";
        else if (isNaN(value) || Number(value) <= 0) error = "Enter a valid amount";
        break;
      case "description":
        if (!value.trim()) error = "Description is required";
        else if (value.length < 20) error = "Description is too short";
        break;
      case "requirements":
        if (!value.trim()) error = "Requirements are required";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setForm({ ...form, [name]: value });

    // 🔹 Validate on every keystroke
    const fieldError = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = () => {
    // Check for empty fields and trigger all validations
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validate(key, form[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please verify all the fields in the form");
      return;
    }

    addJob({
      ...form,
      status: "Open",
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("totalJobs", getJobs().length);
    toast.success("Job posted successfully!");
    
    handleReset();
    setTimeout(() => navigate("/jobs"), 1000);
  };

  const handleReset = () => {
    setForm({ title: "", company: "", location: "", salary: "", description: "", requirements: "" });
    setErrors({});
  };

  // Helper to apply error styles
  const inputClass = (name) => `
    w-full border p-2 rounded outline-none transition
    ${errors[name] ? "border-red-500 ring-1 ring-red-500" : "focus:ring-2 focus:ring-blue-400"}
  `;

  return (
    <MainLayout>
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Post Job</h1>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input type="text" name="title" placeholder="Enter job title" value={form.title} onChange={handleChange} className={inputClass("title")} />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input type="text" name="company" placeholder="Enter company name" value={form.company} onChange={handleChange} className={inputClass("company")} />
            {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input type="text" name="location" placeholder="Enter job location" value={form.location} onChange={handleChange} className={inputClass("location")} />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary *
            </label>
            <input type="text" name="salary" placeholder="Enter salary amount" value={form.salary} onChange={handleChange} className={inputClass("salary")} />
            {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea name="description" placeholder="Describe the job role and responsibilities" value={form.description} onChange={handleChange} rows="3" className={inputClass("description")} />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements *
            </label>
            <textarea name="requirements" placeholder="List the required skills and qualifications" value={form.requirements} onChange={handleChange} rows="3" className={inputClass("requirements")} />
            {errors.requirements && <p className="text-red-500 text-xs mt-1">{errors.requirements}</p>}
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition">
              Post Job
            </button>
            <button onClick={handleReset} className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-300 transition">
              Reset
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
