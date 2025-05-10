import api from '../utils/axios';

const API_PATH = 'api/assets';

export const getAssets = () => api.get(API_PATH);
export const createAsset = (data) => api.post(API_PATH, data);
export const updateAsset = (id, data) => api.put(`${API_PATH}/${id}`, data);
export const deleteAsset = (id) => api.delete(`${API_PATH}/${id}`);
