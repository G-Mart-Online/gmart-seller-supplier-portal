import useAuthGuard from "@/utils/useAuthGuard";
import React from "react";

const RoleGuard = ({ allowedRoles, children }) => {
  const { user } = useAuthGuard({ middleware: "auth" });

  if (!user || !allowedRoles.includes(user.role) || user.status !== "ACTIVE") {
    return null;
  }

  return children;
};

export default RoleGuard;
