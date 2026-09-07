import axios from "axios";

export const UNAUTHORIZED_EVENT = "portfolio:unauthorized";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:2000"}/api/v1`,
  withCredentials: true, // Kirim cookie session Better Auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menangani error respons global (misal: 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
      }
    }
    return Promise.reject(error);
  }
);
