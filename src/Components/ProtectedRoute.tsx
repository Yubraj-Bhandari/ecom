import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { validateToken } from '../Services/authService';

const ProtectedRoute: React.FC = () => {
  if (!validateToken()) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;

