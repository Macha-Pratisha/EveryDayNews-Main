// src/lib/axiosInstance.ts
import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api" // local dev
    : "https://everydaynewsbackend.onrender.com/api"; // Render backend

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
