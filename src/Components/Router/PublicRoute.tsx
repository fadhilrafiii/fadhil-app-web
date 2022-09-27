import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from 'Redux/hooks';
import { userSelector } from 'Redux/Slices/userSlice';

const PublicRoute = () => {
  const { isAuthenticated } = useAppSelector(userSelector);

  if (isAuthenticated) return <Navigate to="/to-do" />;

  return <Outlet />;
};

export default PublicRoute;
