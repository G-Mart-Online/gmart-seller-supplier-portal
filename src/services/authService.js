import httpClient from "./HttpClient";

export const getCsrfToken = async () => {
  try {
    await httpClient.get("/api/v1/auth/csrf");
  } catch (error) {
    throw error;
  }
};

export const getUserlogedin = async (data) => {
  try {
    const response = await httpClient.post("/api/v1/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("error in service::", error);
    throw error;
  }
};

export const getUserRegistered = async (data) => {
  try {
    const response = await httpClient.post("/api/v1/auth/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAuthenticatedUser = async () => {
  try {
    const response = await httpClient.get("/api/v1/auth/me");
    console.log("Response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserLogedOut = async () => {
  try {
    const response = await httpClient.post("api/v1/auth/logout");
    return response;
  } catch (error) {
    throw error;
  }
};
