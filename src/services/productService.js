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
    console.log("This is passed data", data);
    const response = await httpClient.post("/api/v1/products", data);
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
