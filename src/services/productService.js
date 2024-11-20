import httpClient from "./HttpClient";

export const fetchProducts = async () => {
  try {
    const response = await httpClient("/api/v1/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddNewProduct = async (data) => {
  try {
    const response = await httpClient.post("/api/v1/products", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
