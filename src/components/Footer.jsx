import { Link } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          © 2026{" "}
          <Link to="/" className="transition group">
            <span className="text-green-500 text-sm group-hover:text-green-700 transition">
              WorkBridge
            </span>
          </Link>
          {" "}Job Portal Dashboard. All rights reserved.
        </p>

        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
          <a href="#" className="hover:text-white transition">Support</a>
        </div>
      </div>
    </footer>
  );
}