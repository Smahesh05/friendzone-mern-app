import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  //   const { userInfo } = useSelector((state) => state.auth);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
