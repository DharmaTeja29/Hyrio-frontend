import axios from "axios";

export default axios.create({
    baseURL: 'https://hyrio-backend.onrender.com',
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: 'https://hyrio-backend.onrender.com',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
