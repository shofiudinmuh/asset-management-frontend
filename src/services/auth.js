import api from '../utils/axios';

export const authService = {
    login: async (email, password) => {
        await api.get('/sanctum/csrf-cookie');

        // return api.post('/api/login', { email, password });
        const response = await api.post('/api/login', { email, password });

        const token = response.data.token;
        if (token) {
            localStorage.setItem('access_token', token);
        }
        return response;
    },
    logout: async () => {
        await api.post('api/logout');
        localStorage.removeItem('access_token');
    },

    getUser: async () => {
        const response = await api.get('api/users');
        return response.data;
    },

    getLoggedInUser: async () => {
        const response = await api.get('api/users/me');
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('api/register', userData);
        return response;
    },
};
