// Component/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ path, element: Element }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      path={path}
      element={isLoggedIn ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;
