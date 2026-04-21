import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import PostJob from "../pages/PostJob";
import JobDetails from "../pages/JobDetails";
import Applicants from "../pages/Applicants";
import ApplicationDetails from "../pages/ApplicationDetails";

import CompaniesList from "../pages/CompaniesList";
import AddCompany from "../pages/AddCompany";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
        <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
        <Route path="/job/:id" element={<ProtectedRoute><JobDetails /></ProtectedRoute>} />
        <Route path="/applicants" element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
        <Route path="/application/:id" element={<ProtectedRoute><ApplicationDetails /></ProtectedRoute>} />
        <Route path="/companies" element={<ProtectedRoute><CompaniesList /></ProtectedRoute>} />
        <Route path="/companies/add" element={<ProtectedRoute><AddCompany /></ProtectedRoute>} />
        <Route path="/companies/add/:id" element={<ProtectedRoute><AddCompany /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
