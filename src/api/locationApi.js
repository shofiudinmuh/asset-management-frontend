import api from '../utils/axios';

const API_PATH = 'api/locations';

export const getLocations = () => api.get(API_PATH);
export const createLocation = (data) => api.post(API_PATH, data);
export const updateLocation = (id, data) => api.put(`${API_PATH}/${id}`, data);
export const deleteLocation = (id) => api.delete(`${API_PATH}/${id}`);
