import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // 🔹 State to track validation errors
  const [errors, setErrors] = useState("");

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

  // 🔹 Logic to validate each field
  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Enter a valid email address";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      default:
        break;
    }
    return error;
  };

  const handleSubmit = () => {
    const { email, password } = form;

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

    // ✅ Dummy Login Success
    const userData = {
      name: email.split("@")[0], // generate name from email
      email,
    };

    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Login successful! Welcome back!");
    
    // redirect to dashboard
    navigate("/");
  };

  // Helper to apply error styles
  const inputClass = (name) => `
    w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition duration-200
    ${errors[name] ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-transparent"}
  `;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your credentials to continue.
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className={inputClass("password")}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Credentials</span>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-600">
              <p><strong>Email:</strong> admin@example.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}