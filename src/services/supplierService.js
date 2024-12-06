import httpClient from "./HttpClient";

export const createSupplierAccount = async (userId, formData) => {
  try {
    const response = await httpClient.post(
      `/api/v1/suppliers/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
