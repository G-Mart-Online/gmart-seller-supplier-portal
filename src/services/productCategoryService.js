import httpClient from "./HttpClient";

export const fetchProductCategories = async (
  pageNumber = null,
  pageSize = null
) => {
  try {
    const response = await httpClient(`/api/v1/categories`, {
      params: {
        pageNumber,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
