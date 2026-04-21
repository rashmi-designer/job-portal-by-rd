import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/updatedLogo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setOpen(false);
  };

  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center h-16 md:h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={closeMenus}>
            <img
              src={logo}
              alt="RD Job Portal"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white text-xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-2">

            {/* Links */}
            <div className="flex gap-1">
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
                  className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-md text-white hover:bg-gray-700 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm">
                    {user.name}
                  </span>
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setOpen(false);
                      }}
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
                className="ml-2 bg-blue-600 px-3 py-2 rounded text-white hover:bg-blue-700 transition text-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className={`${linkClass("/")} block`} onClick={closeMenus}>Dashboard</Link>
            <Link to="/jobs" className={`${linkClass("/jobs")} block`} onClick={closeMenus}>Jobs</Link>
            <Link to="/post-job" className={`${linkClass("/post-job")} block`} onClick={closeMenus}>Post Job</Link>
            <Link to="/applicants" className={`${linkClass("/applicants")} block`} onClick={closeMenus}>Applicants</Link>
            <Link to="/companies" className={`${linkClass("/companies")} block`} onClick={closeMenus}>Companies</Link>
            <Link to="/reports" className={`${linkClass("/reports")} block`} onClick={closeMenus}>Reports</Link>

            {/* Mobile Profile Section */}
            {user ? (
              <div className="pt-2 border-t border-gray-700">
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-gray-300 hover:bg-gray-700 rounded"
                  onClick={closeMenus}
                >
                  👤 {user.name}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenus();
                  }}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={closeMenus}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
