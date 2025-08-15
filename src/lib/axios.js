import axios from "axios";

const api = axios.create({
  baseURL: "https://job-portal-backend-44uu.onrender.com",
  withCredentials: true,
});

export default api;