import httpClient from "./HttpClient";

export const fetchProducts = async (
  activeStatus,
  approveStatus,
  pageNumber,
  pageSize
) => {
  try {
    const response = await httpClient.get("/api/v1/products", {
      params: {
        pageNumber,
        activeStatus,
        approveStatus,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
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
