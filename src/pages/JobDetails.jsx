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
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-red-500">
            Job Not Found
          </h2>

          <Link
            to="/jobs"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
          >
            Back to Jobs
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4">

        {/* Job Card */}
        <div className="bg-white shadow rounded p-6 mb-6">
          <h1 className="text-2xl font-bold mb-3">{job.title}</h1>

          <div className="grid md:grid-cols-2 gap-3">
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Status:</strong> {job.status}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Description</h3>
            <p className="text-gray-700">
              {job.description}
            </p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Requirements</h3>
            <p className="text-gray-700">
              {job.requirements}
            </p>
          </div>
        </div>

        {/* Applicants */}
        <div className="bg-white shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4">
            Applicants
          </h2>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>

            <tbody>
              {applicants.map((app) => (
                <tr key={app.id}>
                  <td className="p-3 border">{app.name}</td>
                  <td className="p-3 border">{app.email}</td>
                  <td className="p-3 border">{app.status}</td>
                  <td className="p-3 border">
                    <Link
                      to={`/application/${app.id}`}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </MainLayout>
  );
}