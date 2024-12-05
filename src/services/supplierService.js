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

export const fetchSuppliers = async () => {
  try {
    const response = await httpClient("/api/v1/suppliers");
    console.log("suppliers::response::", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
