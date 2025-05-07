import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    withCredentials: true, // tidak perlu cookie karena pakai token
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

// Tambahkan token ke header Authorization
api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
            withCredentials: true,
        });
    }
    return config;
});

// Handle error unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized (misal: redirect ke login)
            console.warn('Unauthorized. User might be unauthenticated!');
        }
        return Promise.reject(error);
    }
);

export default api;
