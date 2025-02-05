import axios from "axios";
import Storage from "../utils/Storage";
import { StorageKeys } from "../../constants/storageKeys";

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

client.interceptors.request.use(
  (config) => {
    const user = Storage.getItem(StorageKeys.USER_INFO);
    if (user) {
      const { token } = user;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);