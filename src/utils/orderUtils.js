export const getOrderStatusTagColor = (status) => {
  switch (status) {
    case "CREATED":
      return "orange";
    case "CONFIRMED":
      return "blue";
    case "SHIPPED":
      return "cyan";
    case "DELIVERED":
      return "green";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};

export const getOrderTypeTagColor = (type) => {
  switch (type) {
    case "WHOLESALE":
      return "green";
    case "RETAIL":
      return "blue";
    default:
      return "gray";
  }
};
