import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if user is authenticated by looking for user data in localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user data found, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
}