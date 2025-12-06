import axios from "axios";

const API = axios.create({
    baseURL: "https://releaso.vercel.app/api/v1", // change if deployed
});

// attaches token automatically if exists
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default API;
