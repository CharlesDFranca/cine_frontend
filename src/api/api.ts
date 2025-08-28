import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

type AuthTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

interface FailedRequestQueueItem {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequestQueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((item) => {
    if (error) item.reject(error);
    else if (token) item.resolve(token);
  });

  failedQueue = [];
}

async function refreshTokenRequest(): Promise<AuthTokenResponse> {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("Refresh Token não foi provido.");
  }

  const response: AxiosResponse<AuthTokenResponse> = await api.post(
    "/auth/refreshToken",
    { refreshToken }
  );

  return response.data;
}

function enqueueRequest(originalRequest: AxiosRequestConfig) {
  new Promise<string>((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  }).then((token) => {
    if (originalRequest.headers) {
      originalRequest.headers.Authorization = "Bearer " + token;
    }

    return api(originalRequest);
  });
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) return enqueueRequest(originalRequest);

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await refreshTokenRequest();

        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${tokens.accessToken}`;

        processQueue(null, tokens.accessToken);

        return api(originalRequest);
      } catch (error) {
        processQueue(error, null);

        localStorage.clear();

        window.location.href = "/auth/login";

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
