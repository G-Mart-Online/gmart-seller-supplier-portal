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

export const fetchSellerDashboardDetails = async (sellerId) => {
  try {
    const response = await httpClient.get(`api/v1/sellers/dashboard-details`, {
      params: {
        sellerId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSalesSummaryForSeller = async (sellerId, timeFrame) => {
  try {
    const response = await httpClient.get(
      `api/v1/sellers/dashboard-details/product-summary`,
      {
        params: {
          sellerId,
          timeFrame,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
