import * as React from 'react';
import { Navigate, Outlet, RouteProps } from 'react-router-dom';

export function PrivateRoute() {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
