import axios from "axios";
import eventEmitter from "./eventEmitter";

const service = axios.create({
  baseURL: "http://127.0.0.1:8080/",
  timeout: 10000,
});

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    let data = response.data;
    if (data.errno == 0) {
      return response.data;
    } else if (response.data.errno == 501) {
      window.location.href = "/";
    } else {
      const message = data.errmsg || "Error";
      eventEmitter.emit("apiError", message);
      return Promise.reject(new Error(message));
    }
  },
  (error) => {
    const message = error.message || "Error";
    eventEmitter.emit("apiError", message);
    return Promise.reject(new Error(message));
  }
);

export default service;
