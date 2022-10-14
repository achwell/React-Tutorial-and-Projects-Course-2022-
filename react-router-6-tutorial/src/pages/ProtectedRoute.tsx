import { FC } from "react";
import { Navigate } from "react-router-dom";
import IUser from "../IUser";

const ProtectedRoute: FC<{ children: JSX.Element; user?: IUser }> = ({
  children,
  user,
}) => {
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default ProtectedRoute;
