import api from '../utils/axios';

const API_PATH = 'api/suppliers';

export const getSuppliers = () => api.get(API_PATH);
export const createSupplier = (data) => api.post(API_PATH, data);
export const updateSupplier = (id, data) => api.put(`${API_PATH}/${id}`, data);
export const deleteSupplier = (id) => api.delete(`${API_PATH}/${id}`);
export const getSupplierSearch = (query) =>
    api.get(`${API_PATH}/search`, {
        params: { q: query },
    });
