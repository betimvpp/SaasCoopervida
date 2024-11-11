// src/components/ProtectedRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/authContext"; // Importe o novo componente
import { UnAuthorized } from "@/pages/app/UnAuthorized";
import { ReactNode, useEffect, useState } from "react";
import { Collaborator, useCollaborator } from "@/contexts/collaboratorContext";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: ReactNode;
}

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const { getCollaboratorById } = useCollaborator();
  const [collaboratorData, setCollaboratorData] = useState<Collaborator | null>(null);

  useEffect(() => {
    if (user) {
      getCollaboratorById(user.id).then(data => setCollaboratorData(data));
    }
  }, [user, getCollaboratorById]);

  if (!user) return <Navigate to="/login" replace />;
  if (collaboratorData && !allowedRoles.includes(collaboratorData.role)) return <UnAuthorized />;
  return <>{children ? children : <Outlet />}</>;
}
