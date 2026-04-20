import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";
import {
  initializeApplicants,
  getApplicantById,
  updateApplicantStatus,
} from "../services/applicantService";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);

  // Load Data from Service
  useEffect(() => {
    initializeApplicants();

    const found = getApplicantById(id);
    setApplication(found);
  }, [id]);

  // Update Status
  const updateStatus = (newStatus) => {
    updateApplicantStatus(id, newStatus);

    const updated = getApplicantById(id);
    setApplication(updated);
  };

  if (!application) {
    return (
      <MainLayout>
        <div className="p-6 text-center text-red-500 font-semibold">
          Application not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 max-w-3xl mx-auto">

        <div className="bg-white shadow rounded p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              Application Details
            </h1>

            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back
            </button>
          </div>

          {/* Profile */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">

            <div>
              <p className="text-sm text-gray-500">Applicant Name</p>
              <p className="font-semibold">{application.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{application.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Applied Job</p>
              <p className="font-semibold">{application.job}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Application ID</p>
              <p className="font-semibold">{application.id}</p>
            </div>

          </div>

          {/* Resume */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">Resume</p>

            <a
              href={application.resume || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          </div>

          {/* Status */}
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Current Status</p>

            <span
              className={`px-3 py-1 rounded text-sm font-medium ${
                application.status === "Selected"
                  ? "bg-green-100 text-green-700"
                  : application.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {application.status}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">

            <button
              onClick={() => updateStatus("Selected")}
              disabled={application.status !== "Pending"}
              className={`px-4 py-2 rounded text-white ${
                application.status !== "Pending"
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus("Rejected")}
              disabled={application.status !== "Pending"}
              className={`px-4 py-2 rounded text-white ${
                application.status !== "Pending"
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Reject
            </button>

            <button
              onClick={() => updateStatus("Pending")}
              className="px-4 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Mark Pending
            </button>

          </div>

          {/* Message */}
          {application.status !== "Pending" && (
            <p className="text-sm text-gray-500 mt-4">
              Status already updated.
            </p>
          )}

        </div>

      </div>
    </MainLayout>
  );
};

export default ApplicationDetails;