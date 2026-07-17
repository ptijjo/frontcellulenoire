import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8080";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error?.response?.status === 401) {
      const path = window.location.pathname;
      if (path.startsWith("/dashboard")) {
        window.location.assign("/");
      }
    }
    return Promise.reject(error);
  },
);

export default apiClient;
