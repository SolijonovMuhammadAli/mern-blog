import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8888/api",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = JSON.parse(window.localStorage.getItem("userData")).token;
});
