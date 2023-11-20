import { Outlet, Navigate } from "react-router-dom";
import useAuthData from "../zustandStore/useAuthData";

const AuthRoute = () => {
  const { isLoggedIn } = useAuthData();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;