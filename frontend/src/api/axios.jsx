import axios from "axios";

const API = axios.create({
  baseURL: "https://referrals-w8nx.onrender.com/api", // change when deployed
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
