import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { getJobs } from "../services/jobService";

export default function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const jobs = getJobs();

    const selectedJob = jobs.find(
      (item) => item.id.toString() === id
    );

    setJob(selectedJob);
  }, [id]);

  // Dummy Applicants (later dynamic)
  const applicants = [
    {
      id: 1,
      name: "Ravi Kumar",
      email: "ravi@gmail.com",
      resume: "#",
      status: "Pending",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      resume: "#",
      status: "Selected",
    },
  ];

  if (!job) {
    return (
      <MainLayout>
        <div className="p-4 sm:p-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-red-500 mb-4">
            Job Not Found
          </h2>

          <Link
            to="/jobs"
            className="inline-block bg-blue-500 text-white px-3 sm:px-4 py-2 rounded text-sm sm:text-base hover:bg-blue-600"
          >
            Back to Jobs
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>

        {/* Job Card */}
        <div className="bg-white shadow rounded p-4 sm:p-6 mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4">{job.title}</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4">
            <p className="text-sm sm:text-base"><strong>Company:</strong> <span className="text-gray-700">{job.company}</span></p>
            <p className="text-sm sm:text-base"><strong>Location:</strong> <span className="text-gray-700">{job.location}</span></p>
            <p className="text-sm sm:text-base"><strong>Salary:</strong> <span className="text-gray-700">{job.salary}</span></p>
            <p className="text-sm sm:text-base"><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${job.status === "Open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{job.status}</span></p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-sm sm:text-base mb-2">Description</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {job.description}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-sm sm:text-base mb-2">Requirements</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              {job.requirements}
            </p>
          </div>
        </div>

        {/* Applicants */}
        <div className="bg-white shadow rounded p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Applicants
          </h2>

          {/* Table - Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border text-left">Name</th>
                  <th className="p-3 border text-left">Email</th>
                  <th className="p-3 border text-left">Status</th>
                  <th className="p-3 border text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50">
                    <td className="p-3 border">{app.name}</td>
                    <td className="p-3 border">{app.email}</td>
                    <td className="p-3 border">
                      <span className={`px-2 py-1 rounded text-xs ${app.status === "Selected" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3 border">
                      <Link
                        to={`/application/${app.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card View - Mobile */}
          <div className="md:hidden space-y-3">
            {applicants.map((app) => (
              <div key={app.id} className="bg-gray-50 p-3 rounded border">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-semibold text-sm flex-1">{app.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs whitespace-nowrap ${app.status === "Selected" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2 break-all">{app.email}</p>
                <Link
                  to={`/application/${app.id}`}
                  className="inline-block bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

        </div>

      </div>
    </MainLayout>
  );
}