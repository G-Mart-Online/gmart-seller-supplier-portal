"use client";
import useAuthGuard from "@/utils/useAuthGuard";
import { Spin } from "antd";
import React from "react";

const AccountSetup = () => {
  const { user } = useAuthGuard({ middleware: "auth" });

  if (!user) return <Spin size="large" />;

  return <div>Account Setup</div>;
};

export default AccountSetup;
