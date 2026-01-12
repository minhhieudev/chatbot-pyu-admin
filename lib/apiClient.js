"use client";

import axios from "axios";

const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000").replace(
    /\/$/,
    "",
  ),
  headers: {
    Accept: "application/json",
  },
});

const extractErrorMessage = (data) => {
  if (!data) return null;
  if (typeof data === "string") return data;
  if (typeof data.detail === "string") return data.detail;
  if (Array.isArray(data.detail)) {
    const messages = data.detail
      .map((item) => item?.msg || item?.message || item?.detail)
      .filter(Boolean);
    if (messages.length) return messages.join(", ");
  }
  if (data.message) return data.message;
  return null;
};

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      extractErrorMessage(error?.response?.data) ??
      error?.message ??
      "Request failed. Please try again.";
    const wrappedError = new Error(message);
    wrappedError.status = error?.response?.status;
    wrappedError.data = error?.response?.data;
    return Promise.reject(wrappedError);
  },
);

export default apiClient;
