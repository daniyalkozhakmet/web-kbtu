import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/userHook";
import { ReactElement } from "react";
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactNode = ReactChild;
export const AdminProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.user);
  if (!user || (user && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
