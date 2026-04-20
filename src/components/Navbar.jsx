import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/updatedLogo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const linkClass = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="RD Job Portal"
              className="h-36 w-auto object-contain pt-3"
            />
            
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-2">

            {/* Links */}
            <div className="flex gap-2">
              <Link to="/" className={linkClass("/")}>Dashboard</Link>
              <Link to="/jobs" className={linkClass("/jobs")}>Jobs</Link>
              <Link to="/post-job" className={linkClass("/post-job")}>Post Job</Link>
              <Link to="/applicants" className={linkClass("/applicants")}>Applicants</Link>
              <Link to="/companies" className={linkClass("/companies")}>Companies</Link>
              <Link to="/reports" className={linkClass("/reports")}>Reports</Link>
            </div>

            {/* Profile Section */}
            {user ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md text-white"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>

                  {/* Name */}
                  <span className="hidden sm:block text-sm">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 bg-blue-600 px-3 py-2 rounded text-white"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}
