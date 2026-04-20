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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/application/:id" element={<ApplicationDetails />} />
        <Route path="/companies" element={<CompaniesList />} />
        <Route path="/companies/add" element={<AddCompany />} />
        <Route path="/companies/add/:id" element={<AddCompany />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
