import axios from "axios";

export default axios.create({
    baseURL: 'https://hyrio-backend.onrender.com:10000',
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: 'https://hyrio-backend.onrender.com:10000',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
