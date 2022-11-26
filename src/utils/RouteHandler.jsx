import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = () => {
  return <Outlet />;
};

export const PrivateRoute = () => {
  const { isAuth } = useSelector((state) => state.AuthStore);
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
