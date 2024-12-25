import httpClient from "./HttpClient";

export const createOrder = async (data) => {
  try {
    const response = await httpClient.post(`/api/v1/orders`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrdersBySeller = async (sellerId, pageNumber, pageSize) => {
  try {
    const response = await httpClient.get("/api/v1/orders/by-seller", {
      params: {
        sellerId,
        pageNumber,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
