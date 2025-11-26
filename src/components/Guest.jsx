import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Guest({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to={`/${user.role}`} replace />;
  return children;
}
