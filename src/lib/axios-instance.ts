import config from "@/config";
import { getToken } from "@/services/auth";
import axios from "axios";

const ax = axios.create({
  baseURL: `${config.api}/api`,
  withCredentials: true,
});

ax.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

ax.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default ax;
