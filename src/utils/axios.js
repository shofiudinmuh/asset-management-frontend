import axios from 'axios';
import { error } from 'jquery';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    withCredentials: true, //untuk sanctum cookie
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// interceptor untuk menangani CSRF token
api.interceptors.request.use(async (config) => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
        await axios.get('/sachtum/csrf-cookie', {
            baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
            withCredentials: true,
        });
        return config;
    }
});

// interceptor untuk response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.request?.status === 401) {
            // handle unauthorize
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axios;
