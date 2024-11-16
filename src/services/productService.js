import httpClient from "./HttpClient";

export const fetchProducts = async () => {
  try {
    const response = await httpClient("/api/v1/products");
    console.log("products service::", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
