import axios from "axios";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

client.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return client(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const userInfo = localStorage.getItem("user-info");
      if (!userInfo) {
        return Promise.reject(error);
      }
      const { email } = JSON.parse(userInfo);

      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/refresh-token`, { email });
        const { token } = response.data;
        localStorage.setItem("user-info", JSON.stringify({ email, token }));
        client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        processQueue(null, token);
        return client(originalRequest);
      } catch (err) {
        processQueue(err, null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);