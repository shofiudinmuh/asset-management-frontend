import api from '../utils/axios';

const API_PATH = '/api/users';

// export const getUsers = () => api.get(API_PATH);
// export const createUser = (data) => api.post(API_PATH, data);
// export const updateUser = (id, data) => api.put(`${API_PATH}/${id}`, data);
// export const deleteuser = (id) => api.delete(`${API_PATH}/${id}`);

export const getUsers = (params) => api.get(API_PATH, { params });
export const createUser = (data) => api.post(API_PATH, data);
export const updateUser = (id, data) => api.put(`${API_PATH}/${id}`, data);
export const deleteUser = (id) => api.delete(`${API_PATH}/${id}`);

export const getUserSearch = (query) =>
    api.get(`${API_PATH}/search`, {
        params: { q: query },
    });
