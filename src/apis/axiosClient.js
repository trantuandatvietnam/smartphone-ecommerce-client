import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://smartphone-server-production.up.railway.app/', //https://smartphone-server-production.up.railway.app/
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient;
