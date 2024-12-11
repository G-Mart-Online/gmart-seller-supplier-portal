import useAuthGuard from "@/utils/useAuthGuard";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const PermissionGuard = ({
  allowedRoles,
  errorStatus = "403",
  errorTitle = "403",
  errorMessage = "Sorry, you are not authorized to access this page.",
  buttonText = "Back Home",
  link,
}) => {
  const router = useRouter();
  const { user } = useAuthGuard({ middleware: "auth" });

  if (user && allowedRoles.includes(user?.role) && user.status === "ACTIVE") {
    return null;
  }

  return (
    <div className="unauthorize-container">
      <Result
        status={errorStatus}
        title={errorTitle}
        subTitle={errorMessage}
        extra={
          <Button type="primary" onClick={() => router.push(`${link}`)}>
            {buttonText}
          </Button>
        }
      />
    </div>
  );
};

export default PermissionGuard;
