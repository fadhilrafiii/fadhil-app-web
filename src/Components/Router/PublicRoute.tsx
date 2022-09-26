import React from 'react';

import {
  IndexRouteProps,
  LayoutRouteProps,
  Navigate,
  Outlet,
  PathRouteProps,
} from 'react-router-dom';

type PublicRouteProps = { isAuthenticated: boolean } & (
  | PathRouteProps
  | LayoutRouteProps
  | IndexRouteProps
);

const PublicRoute = ({ isAuthenticated }: PublicRouteProps) => {
  if (isAuthenticated) return <Navigate to="/to-do" />;

  return <Outlet />;
};

export default PublicRoute;
