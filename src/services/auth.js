export const authService = {
    login: async (credentials) => {
        const response = await api.post('/login', credentials);
        return response.data;
    },

    logout: async () => {
        await api.post('/logout');
    },

    getUser: async () => {
        const response = await api.get('/api/users');
        return response.data;
    },

    register: async (userData) => {
        const response = await api.post('/register', userData);
        return response.data;
    },
};
