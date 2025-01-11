import httpClient from "./HttpClient";

export const createOrder = async (data) => {
  try {
    const response = await httpClient.post(`/api/v1/orders`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrdersBySeller = async (sellerId, pageNumber, pageSize) => {
  try {
    const response = await httpClient.get("/api/v1/orders/by-seller", {
      params: {
        sellerId,
        pageNumber,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrderById = async (id) => {
  try {
    const response = await httpClient(`api/v1/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOrdersBySupplier = async (
  supplierId,
  pageNumber,
  pageSize,
  orderStatus = null
) => {
  try {
    const response = await httpClient.get("/api/v1/orders/by-supplier", {
      params: {
        supplierId,
        pageNumber,
        pageSize,
        orderStatus,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
