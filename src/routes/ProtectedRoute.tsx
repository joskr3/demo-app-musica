import { useAuth } from "@/context/AuthContext";
import type { ReactNode } from "react";
import { useLocation } from "wouter";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setLocation('/login'); // Redirigir a login si no hay usuario
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
