import httpClient from "./HttpClient";

export const createSupplierAccount = async (userId, data) => {
  try {
    const response = await httpClient.post(`api/v1/suppliers/${userId}`, data);
    console.log("supplier response::", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
