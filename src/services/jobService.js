import jobData from "../data/jobs";

const STORAGE_KEY = "job_portal_jobs";

// First Load
export const initializeJobs = () => {
  const jobs = localStorage.getItem(STORAGE_KEY);

  if (!jobs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobData));
  }
};

// Get All Jobs
export const getJobs = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// Add Job
export const addJob = (job) => {
  const jobs = getJobs();

  const newJob = {
    ...job,
    id: Date.now(),
  };

  jobs.push(newJob);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
};

// Delete Job
export const deleteJob = (id) => {
  const jobs = getJobs().filter((job) => job.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
};

// Update Job
export const updateJob = (updatedJob) => {
  const jobs = getJobs().map((job) =>
    job.id === updatedJob.id ? updatedJob : job
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
};