import React from 'react';

import {
  IndexRouteProps,
  LayoutRouteProps,
  Navigate,
  Outlet,
  PathRouteProps,
} from 'react-router-dom';

type PrivateRouterProps = { isAuthenticated: boolean } & (
  | PathRouteProps
  | LayoutRouteProps
  | IndexRouteProps
);

const PrivateRoute = ({ isAuthenticated }: PrivateRouterProps) => {
  if (!isAuthenticated) return <Navigate to="/" />;

  return <Outlet />;
};

export default PrivateRoute;
