import api from '../utils/axios';

const API_PATH = '/api/transactions';

export const createTransaction = (data) => api.post(API_PATH, data);
export const updateTransaction = (id, data) => api.put(`${API_PATH}/${id}`, data);
export const deleteTransaction = (id) => api.delete(`${API_PATH}/${id}`);
