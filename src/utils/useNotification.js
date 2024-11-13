import React from "react";
import { notification } from "antd";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, title, description) => {
    api[type]({
      message: title,
      description,
    });
  };

  return {
    openNotification,
    contextHolder,
  };
};

export default useNotification;
