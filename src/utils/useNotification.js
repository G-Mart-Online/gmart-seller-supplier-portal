import React from "react";
import { notification } from "antd";

const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type,
    title,
    description,
    placement = "bottomRight"
  ) => {
    api[type]({
      message: title,
      description,
      placement,
    });
  };

  return {
    openNotification,
    contextHolder,
  };
};

export default useNotification;
