import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useAppSelector } from "../app/hooks";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAppSelector((store) => store.user);
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return <>{children}</>;
};
export default ProtectedRoute;
