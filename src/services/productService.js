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

export const AddNewProduct = async (data) => {
  try {
    const response = await httpClient.post("/api/v1/products", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Something went wrong";
      throw new Error(message);
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error(error.message || "Unexpected error occurred.");
    }
  }
};
