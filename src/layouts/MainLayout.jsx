import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow p-4 bg-gray-50">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}