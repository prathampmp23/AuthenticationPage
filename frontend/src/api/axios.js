import axios from "axios";

const api = axios.create({
  // backend base URL
  baseURL: "http://localhost:8000/api",
  withCredentials: false,
});

export default api;
