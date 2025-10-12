import axios from "axios";

// factory function instead of hook
export const createAxiosInstance = ({ accessToken, refreshToken, logout }) => {
  const axiosInstance = axios.create({
    baseURL:
      import.meta.env.VITE_API_URL || "https://farmtrack-api.onrender.com",
    withCredentials: true,
  });

  // Attach access token
  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle 401 → try refresh
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          logout();
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
