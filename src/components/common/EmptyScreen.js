import { Empty, Typography } from "antd";
import React from "react";

const EmptyScreen = ({ message }) => {
  return (
    <Empty
      className="empty-screen"
      description={<Typography.Text>{message}</Typography.Text>}
    ></Empty>
  );
};

export default EmptyScreen;
