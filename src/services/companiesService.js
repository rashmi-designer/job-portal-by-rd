// src/services/companiesService.js

import companiesList from "../data/companies";

const STORAGE_KEY = "companies";

// Initialize localStorage with dummy data
export const initializeCompanies = () => {
  const existing = localStorage.getItem(STORAGE_KEY);

  if (!existing) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(companiesList)
    );
  }
};

// Get All Companies
export const getCompanies = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Get Single Company By ID
export const getCompanyById = (id) => {
  const list = getCompanies();

  return list.find(
    (item) => item.id.toString() === id.toString()
  );
};

// Add Company
export const addCompany = (company) => {
  const list = getCompanies();

  const newCompany = {
    ...company,
    id: Date.now().toString(),
    jobsPosted: company.jobsPosted || 0,
    status: company.status || "Active",
    createdAt: new Date().toISOString(),
  };

  list.push(newCompany);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(list)
  );

  return newCompany;
};

// Update Full Company
export const updateCompany = (updatedCompany) => {
  const updated = getCompanies().map((item) =>
    item.id.toString() === updatedCompany.id.toString()
      ? updatedCompany
      : item
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return updated;
};

// Update Company Status
export const updateCompanyStatus = (id, status) => {
  const updated = getCompanies().map((item) =>
    item.id.toString() === id.toString()
      ? { ...item, status }
      : item
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return updated;
};

// Increase Jobs Posted Count
export const incrementJobsPosted = (id) => {
  const updated = getCompanies().map((item) =>
    item.id.toString() === id.toString()
      ? {
          ...item,
          jobsPosted: Number(item.jobsPosted) + 1,
        }
      : item
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

  return updated;
};

// Delete Company
export const deleteCompany = (id) => {
  const filtered = getCompanies().filter(
    (item) => item.id.toString() !== id.toString()
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(filtered)
  );

  return filtered;
};

// Dashboard Stats
export const getCompanyStats = () => {
  const list = getCompanies();

  return {
    total: list.length,
    active: list.filter((x) => x.status === "Active").length,
    inactive: list.filter((x) => x.status === "Inactive").length,
    totalJobsPosted: list.reduce(
      (sum, item) => sum + Number(item.jobsPosted || 0),
      0
    ),
  };
};

// Reset to Original Dummy Data
export const resetCompanies = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(companiesList)
  );
};