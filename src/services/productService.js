import httpClient from "./HttpClient";

export const fetchProducts = async () => {
  try {
    const response = await httpClient("/api/v1/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await httpClient(`api/v1/products/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
