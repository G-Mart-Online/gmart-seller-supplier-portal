import React from "react";

const ErrorAlert = ({ message, description, showIcon = true }) => {
  return (
    <Alert
      message={message}
      description={description}
      type="error"
      showIcon={showIcon}
    />
  );
};

export default ErrorAlert;
