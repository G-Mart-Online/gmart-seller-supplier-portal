import httpClient from "./HttpClient";

export const createOrder = async (data) => {
  try {
    const response = await httpClient.post(`/api/v1/orders`, data);
    console.log("response::", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
