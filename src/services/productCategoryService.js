import httpClient from "./HttpClient";

export const fetchProductCategories = async () => {
  try {
    const response = await httpClient(`/api/v1/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
