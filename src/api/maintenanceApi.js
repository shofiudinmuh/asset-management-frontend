import api from '../utils/axios';

const API_PATH = '/api/maintenances';

export const getMaintenances = () => api.get(API_PATH);
export const createMaintenance = (data) => api.post(API_PATH, data);
export const updateMaintenance = (id, data) => api.put(`${API_PATH}/${id}`, data);
export const deleteMaintenance = (id) => api.delete(`${API_PATH}/${id}`);
