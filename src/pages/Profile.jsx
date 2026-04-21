import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Admin",
  });

  const [passwordForm, setPasswordForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      const updatedUser = {
        ...storedUser,
        role: storedUser.role || "Admin",
      };

      setUser(updatedUser);
      setForm(updatedUser);
    }
  }, []);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  // ======================
  // FIELD VALIDATION
  // ======================

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (value.trim().length < 3) {
          error = "Minimum 3 characters required";
        } else if (value.trim().length > 30) {
          error = "Maximum 30 characters allowed";
        } else if (!/^[A-Za-z ]+$/.test(value)) {
          error = "Only alphabets allowed";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          error = "Enter valid email";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 8) {
          error = "Minimum 8 characters required";
        } else if (!/[A-Z]/.test(value)) {
          error = "At least one uppercase required";
        } else if (!/[a-z]/.test(value)) {
          error = "At least one lowercase required";
        } else if (!/[0-9]/.test(value)) {
          error = "At least one number required";
        } else if (!/[@$!%*?&]/.test(value)) {
          error = "At least one special character required";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Confirm password is required";
        } else if (value !== passwordForm.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // ======================
  // PROFILE CHANGE
  // ======================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  // ======================
  // PASSWORD CHANGE
  // ======================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...passwordForm,
      [name]: value,
    };

    setPasswordForm(updatedForm);

    setPasswordErrors({
      ...passwordErrors,
      [name]: validateField(name, value),
      ...(name === "password" && passwordForm.confirmPassword
        ? {
            confirmPassword: validateField(
              "confirmPassword",
              passwordForm.confirmPassword
            ),
          }
        : {}),
    });
  };

  const handlePasswordBlur = (e) => {
    const { name, value } = e.target;

    setPasswordErrors({
      ...passwordErrors,
      [name]: validateField(name, value),
    });
  };

  // ======================
  // SAVE PROFILE
  // ======================

  const handleSave = () => {
    const newErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email) return;

    localStorage.setItem("user", JSON.stringify(form));
    setUser(form);
    setEditMode(false);
    setSuccessMsg("Profile updated successfully");
  };

  // ======================
  // UPDATE PASSWORD
  // ======================

  const handlePasswordUpdate = () => {
    const newErrors = {
      password: validateField("password", passwordForm.password),
      confirmPassword: validateField(
        "confirmPassword",
        passwordForm.confirmPassword
      ),
    };

    setPasswordErrors(newErrors);

    if (newErrors.password || newErrors.confirmPassword) return;

    const updatedUser = {
      ...user,
      password: passwordForm.password,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setPasswordForm({
      password: "",
      confirmPassword: "",
    });

    setSuccessMsg("Password updated successfully");
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and security settings</p>
        </div>

        {successMsg && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">{successMsg}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Information Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile Information
              </h2>
            </div>

            <div className="p-6 h-full flex flex-col">
              {/* VIEW MODE */}
              {!editMode ? (
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-sm text-gray-900">{user?.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="text-sm text-gray-900">{user?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Account Role</p>
                      <p className="text-sm text-gray-900">{user?.role}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-auto">
                    <button
                      onClick={() => setEditMode(true)}
                      className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 flex-grow">
                  {/* NAME */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.name ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                        errors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* ROLE */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Role
                    </label>
                    <input
                      type="text"
                      value={form.role}
                      disabled
                      className="w-full border p-3 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Role cannot be changed</p>
                  </div>

                  <div className="flex gap-3 pt-4 mt-auto">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Save Changes
                    </button>

                    <button
                      onClick={() => {
                        setEditMode(false);
                        setErrors({});
                        setForm(user);
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Password Change Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Change Password
              </h2>
            </div>

            <div className="p-6 h-full flex flex-col">
              <div className="space-y-6 flex-grow">
                {/* PASSWORD */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password *
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={passwordForm.password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                    passwordErrors.password ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                  }`}
                />
                {passwordErrors.password && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {passwordErrors.password}
                  </p>
                )}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                  className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${
                    passwordErrors.confirmPassword ? "border-red-500 ring-1 ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                  }`}
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="mt-auto pt-4">
                <button
                onClick={handlePasswordUpdate}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Update Password
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
}
