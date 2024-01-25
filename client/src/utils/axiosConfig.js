import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = JSON.parse(window.localStorage.getItem("userData")).token;
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => Promise.reject(err)
);
export default instance;
