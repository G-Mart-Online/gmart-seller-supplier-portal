import httpClient from "./HttpClient";

export const createSupplierAccount = async (userId, data) => {
  try {
    const response = await httpClient.post(`api/v1/suppliers/${userId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSuppliers = async () => {
  try {
    const response = await httpClient("/api/v1/suppliers");
    return response.data;
  } catch (error) {
    throw error;
  }
};
