import httpClient from "./HttpClient";

export const createOrder = async (data) => {
  try {
    const response = await httpClient.post(`/api/v1/orders`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
