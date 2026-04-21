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
        <div className="p-4 sm:p-6 text-center text-red-500 font-semibold text-sm sm:text-base">
          Application not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-2 sm:px-4">

        <div className="bg-white shadow rounded p-4 sm:p-6">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
            <h1 className="text-xl sm:text-2xl font-bold">
              Application Details
            </h1>

            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm sm:text-base"
            >
              Back
            </button>
          </div>

          {/* Profile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">

            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Applicant Name</p>
              <p className="font-semibold text-sm sm:text-base">{application.name}</p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Email</p>
              <p className="font-semibold text-sm sm:text-base break-all">{application.email}</p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Applied Job</p>
              <p className="font-semibold text-sm sm:text-base">{application.job}</p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">Application ID</p>
              <p className="font-semibold text-sm sm:text-base">{application.id}</p>
            </div>

          </div>

          {/* Resume */}
          <div className="mb-6">
            <p className="text-xs sm:text-sm text-gray-500 mb-2">Resume</p>

            <a
              href={application.resume || "#"}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-xs sm:text-sm hover:text-blue-800"
            >
              View Resume
            </a>
          </div>

          {/* Status */}
          <div className="mb-6">
            <p className="text-xs sm:text-sm text-gray-500 mb-2">Current Status</p>

            <span
              className={`inline-block px-3 py-1 rounded text-xs sm:text-sm font-medium ${
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
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-wrap">

            <button
              onClick={() => updateStatus("Selected")}
              disabled={application.status !== "Pending"}
              className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded text-white text-sm sm:text-base font-medium transition ${
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
              className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded text-white text-sm sm:text-base font-medium transition ${
                application.status !== "Pending"
                  ? "bg-red-300 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Reject
            </button>

            <button
              onClick={() => updateStatus("Pending")}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 rounded bg-yellow-500 text-white text-sm sm:text-base font-medium hover:bg-yellow-600 transition"
            >
              Mark Pending
            </button>

          </div>

          {/* Message */}
          {application.status !== "Pending" && (
            <p className="text-xs sm:text-sm text-gray-500 mt-4">
              Status already updated.
            </p>
          )}

        </div>

      </div>
    </MainLayout>
  );
};

export default ApplicationDetails;