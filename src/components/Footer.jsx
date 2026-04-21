import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <p className="text-xs sm:text-sm">
            © 2026{" "}
            <Link to="/" className="transition group">
              <span className="text-green-500 text-xs sm:text-sm group-hover:text-green-700 transition">
                WorkBridge
              </span>
            </Link>
            {" "}Job Portal Dashboard. All rights reserved.
          </p>

          <div className="flex gap-4 text-xs sm:text-sm">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}