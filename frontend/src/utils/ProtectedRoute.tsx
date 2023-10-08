import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/userHook";
import { ReactElement } from "react";
type ReactText = string | number;
type ReactChild = ReactElement | ReactText;
type ReactNode = ReactChild;
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.user);
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
