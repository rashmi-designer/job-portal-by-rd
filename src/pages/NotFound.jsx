import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-2">404</h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6">Page Not Found</p>
          <p className="text-sm sm:text-base text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}