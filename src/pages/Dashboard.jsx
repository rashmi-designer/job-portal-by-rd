import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import { Bar, Line } from "react-chartjs-2";
import { FadeLoader } from "react-spinners";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaList,
} from "react-icons/fa";

import {
  initializeJobs,
  getJobs,
} from "../services/jobService";

import {
  initializeApplicants,
  getApplicants,
} from "../services/applicantService";

import {
  initializeCompanies,
  getCompanies,
} from "../services/companiesService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    activeJobs: 0,
    shortlisted: 0,
  });

  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      initializeJobs();
      initializeApplicants();
      initializeCompanies();

      const jobsData = getJobs();
      const applicantsData = getApplicants();
      const companiesData = getCompanies();

      setJobs(jobsData);
      setCompanies(companiesData);

      setStats({
        totalJobs: jobsData.length,
        totalApplicants: applicantsData.length,
        activeJobs: jobsData.filter(
          (item) => item.status === "Open"
        ).length,
        shortlisted: applicantsData.filter(
          (item) => item.status === "Selected"
        ).length,
      });

      setLoading(false);
    }, 800);
  }, []);

  // Applications Per Job
  const applicationsMap = {};

  getApplicants().forEach((item) => {
    applicationsMap[item.job] =
      (applicationsMap[item.job] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(applicationsMap).slice(0, 6),
    datasets: [
      {
        label: "Applications",
        data: Object.values(applicationsMap).slice(0, 6),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  // Jobs by Companies
  const lineData = {
    labels: companies.slice(0, 6).map((c) => c.name),
    datasets: [
      {
        label: "Jobs Posted",
        data: companies
          .slice(0, 6)
          .map((c) => Number(c.jobsPosted)),
        borderColor: "#10b981",
        backgroundColor: "#10b981",
      },
    ],
  };

  const recentJobs = [...jobs].reverse().slice(0, 5);

  return (
    <MainLayout>
      <div className="p-4">

        <h1 className="text-2xl font-bold mb-4">
          Dashboard
        </h1>

        {loading ? (
          <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex justify-center items-center">
            <div className="text-center">
              <FadeLoader
                color="#3b82f6"
                height={15}
                width={5}
                radius={2}
                margin={2}
              />

             
            </div>
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">

              <div className="bg-blue-100 text-blue-700 p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="text-sm">Total Jobs</p>
                  <h2 className="text-2xl font-bold">
                    {stats.totalJobs}
                  </h2>
                </div>
                <FaBriefcase size={24} />
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    Total Applicants
                  </p>
                  <h2 className="text-2xl font-bold">
                    {stats.totalApplicants}
                  </h2>
                </div>
                <FaUsers size={24} />
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="text-sm">Active Jobs</p>
                  <h2 className="text-2xl font-bold">
                    {stats.activeJobs}
                  </h2>
                </div>
                <FaList size={24} />
              </div>

              <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg shadow flex justify-between items-center">
                <div>
                  <p className="text-sm">Shortlisted</p>
                  <h2 className="text-2xl font-bold">
                    {stats.shortlisted}
                  </h2>
                </div>
                <FaCheckCircle size={24} />
              </div>

            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">

              <div className="bg-white p-4 shadow rounded">
                <h2 className="font-semibold mb-2">
                  Applications per Job
                </h2>
                <Bar data={barData} />
              </div>

              <div className="bg-white p-4 shadow rounded">
                <h2 className="font-semibold mb-2">
                  Jobs by Companies
                </h2>
                <Line data={lineData} />
              </div>

            </div>

            {/* Recent Jobs */}
            <div className="bg-white shadow rounded p-4">
              <h2 className="font-semibold mb-3">
                Recent Job Posts
              </h2>

              <ul className="space-y-2">
                {recentJobs.map((job) => (
                  <li
                    key={job.id}
                    className="p-3 border rounded flex justify-between hover:bg-gray-50"
                  >
                    <span>{job.title}</span>

                    <span className="text-gray-500">
                      {job.company}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

      </div>
    </MainLayout>
  );
}