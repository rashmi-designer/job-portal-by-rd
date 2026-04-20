
import applicantsList from "../data/applicants";

const STORAGE_KEY = "applications";

// Initialize Data
export const initializeApplicants = () => {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(applicantsList)
    );
  }
};

// Get All Applicants
export const getApplicants = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Get Applicant By ID
export const getApplicantById = (id) => {
  const list = getApplicants();

  return list.find(
    (item) => item.id.toString() === id.toString()
  );
};

// Add Applicant
export const addApplicant = (applicant) => {
  const list = getApplicants();

  const newApplicant = {
    ...applicant,
    id: Date.now().toString(),
    status: "Pending",
  };

  list.push(newApplicant);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(list)
  );
};

// Update Applicant Status
export const updateApplicantStatus = (id, status) => {
  const updated = getApplicants().map((item) =>
    item.id === id ? { ...item, status } : item
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return updated;
};

// Delete Applicant
export const deleteApplicant = (id) => {
  const filtered = getApplicants().filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filtered)
  );
};