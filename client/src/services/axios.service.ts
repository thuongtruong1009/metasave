import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import useAuthStore from "@/store/auth";

const authStore = useAuthStore();

const axiosConfig: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
  withCredentials: true,
  responseEncoding: "utf8",
}) as AxiosInstance;

axiosConfig.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = localStorage.getItem("token") || undefined;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> => {
    const preRequest = error?.config as AxiosRequestConfig & {
      sent: boolean;
      headers: { Authorization: string };
    };
    if (error?.response?.status === 403 && !preRequest?.sent) {
      preRequest.sent = true;
      const newToken = await axiosConfig.post(
        "/auth/refresh-token",
        {
          refreshToken: authStore.getRefreshToken,
        },
        {
          withCredentials: true,
        }
      );
      preRequest.headers.Authorization = `Bearer ${newToken.data.accessToken}`;
      localStorage.setItem("token", newToken.data.accessToken);
      localStorage.setItem("refreshToken", newToken.data.refreshToken);
      return axiosConfig(preRequest);
    }
    error.response && Promise.reject(error.response.data);

    error.request && Promise.reject(error.request);

    return Promise.reject(error.message);
  }
);

export default axiosConfig;
