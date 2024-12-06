import httpClient from "./HttpClient";

export const createSellerAccount = async (userId, formData) => {
  try {
    const response = await httpClient.post(
      `/api/v1/sellers/${userId}`,
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
