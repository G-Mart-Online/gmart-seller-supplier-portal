import httpClient from "./HttpClient";

export const createSellerAccount = async (userId, data) => {
  try {
    const response = await httpClient.post(`api/v1/sellers/${userId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
