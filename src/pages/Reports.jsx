import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import { FadeLoader } from "react-spinners";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  initializeApplicants,
  getApplicants,
} from "../services/applicantService";

import {
  initializeJobs,
  getJobs,
} from "../services/jobService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Reports() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      initializeApplicants();
      initializeJobs();

      setApplications(getApplicants());
      setJobs(getJobs());

      setLoading(false);
    }, 700);
  }, []);

  // Stats
  const totalApplicants = applications.length;

  const selected = applications.filter(
    (item) => item.status === "Selected"
  ).length;

  const rejected = applications.filter(
    (item) => item.status === "Rejected"
  ).length;

  const pending = applications.filter(
    (item) => item.status === "Pending"
  ).length;

  const hiringRate =
    totalApplicants > 0
      ? ((selected / totalApplicants) * 100).toFixed(1)
      : 0;

  // Applications Per Job
  const jobCounts = {};

  applications.forEach((item) => {
    jobCounts[item.job] =
      (jobCounts[item.job] || 0) + 1;
  });

  const barData = {
    labels: Object.keys(jobCounts).slice(0, 6),
    datasets: [
      {
        label: "Applications",
        data: Object.values(jobCounts).slice(0, 6),
        backgroundColor: "#10b981",
      },
    ],
  };

  // Salary Trends
  const lineData = {
    labels: jobs.slice(0, 6).map((item) => item.title),
    datasets: [
      {
        label: "Salary (LPA)",
        data: jobs
          .slice(0, 6)
          .map((item) => parseInt(item.salary) || 0),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
      },
    ],
  };

  // Status Ratio
  const doughnutData = {
    labels: ["Selected", "Rejected", "Pending"],
    datasets: [
      {
        data: [selected, rejected, pending],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#facc15",
        ],
      },
    ],
  };

  return (
    <MainLayout>
      <div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Reports
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
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

              <div className="bg-blue-100 text-blue-700 p-4 rounded shadow">
                <p className="text-xs sm:text-sm">Total Applicants</p>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {totalApplicants}
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded shadow">
                <p className="text-xs sm:text-sm">Selected</p>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {selected}
                </h2>
              </div>

              <div className="bg-red-100 text-red-700 p-4 rounded shadow">
                <p className="text-xs sm:text-sm">Rejected</p>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {rejected}
                </h2>
              </div>

              <div className="bg-yellow-100 text-yellow-700 p-4 rounded shadow">
                <p className="text-xs sm:text-sm">Hiring Rate</p>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {hiringRate}%
                </h2>
              </div>

            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">

              <div className="bg-white p-3 sm:p-4 shadow rounded overflow-x-auto">
                <h2 className="font-semibold text-sm sm:text-base mb-3">
                  Applications Per Job
                </h2>

                {applications.length > 0 ? (
                  <div className="min-h-72 flex items-center">
                    <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No data found</p>
                )}
              </div>

              <div className="bg-white p-3 sm:p-4 shadow rounded overflow-x-auto">
                <h2 className="font-semibold text-sm sm:text-base mb-3">
                  Job Salary Trends
                </h2>

                {jobs.length > 0 ? (
                  <div className="min-h-72 flex items-center">
                    <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">No jobs found</p>
                )}
              </div>

            </div>

            {/* Bottom Chart */}
            <div className="bg-white p-3 sm:p-4 shadow rounded max-w-md mx-auto">
              <h2 className="font-semibold text-sm sm:text-base mb-3 text-center">
                Applicant Status Ratio
              </h2>

              {applications.length > 0 ? (
                <div className="min-h-64 flex items-center">
                  <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              ) : (
                <p className="text-sm text-gray-600 text-center">No data found</p>
              )}
            </div>
          </>
        )}

      </div>
    </MainLayout>
  );
}