import httpClient from "./HttpClient";

export const createSupplierAccount = async (userId, formData) => {
  try {
    const response = await httpClient.post(
      `/api/v1/suppliers/${userId}`,
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

export const fetchSuppliers = async () => {
  try {
    const response = await httpClient("/api/v1/suppliers");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSupplierById = async (supplierId) => {
  try {
    const response = await httpClient(`/api/v1/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSupplierDashboardDetails = async (supplierId) => {
  try {
    const response = await httpClient.get(
      `api/v1/suppliers/dashboard-details`,
      {
        params: {
          supplierId,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSalesSummaryForSupplier = async (supplierId, timeFrame) => {
  try {
    const response = await httpClient.get(
      `api/v1/suppliers/dashboard-details/sales-summary`,
      {
        params: {
          supplierId,
          timeFrame,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
