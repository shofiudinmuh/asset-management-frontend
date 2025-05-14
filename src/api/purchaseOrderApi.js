import api from '../utils/axios';

const API_PATH = '/api/purchase-orders';

export const getPurchaseOrders = () => api.get(API_PATH);
export const createPurchaseOrder = (data) => api.post(API_PATH, data);
export const updatePurchaseOrder = (id, data) => api.put(`${API_PATH}/${id}`, data);
export const deletePurchaseOrder = (id) => api.delete(`${API_PATH}/${id}`);
