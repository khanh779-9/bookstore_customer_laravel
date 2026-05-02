import api from '../api/client';

export const lookupService = {
  getPublishers: async () => {
    const response = await api.get('/publishers');
    return Array.isArray(response.data) ? response.data : (response.data?.data || []);
  },
  
  getProviders: async () => {
    const response = await api.get('/providers');
    return Array.isArray(response.data) ? response.data : (response.data?.data || []);
  },
  
  getAuthors: async () => {
    const response = await api.get('/authors');
    return Array.isArray(response.data) ? response.data : (response.data?.data || []);
  },
  
  getBookTypes: async () => {
    const response = await api.get('/loaisach');
    return Array.isArray(response.data) ? response.data : (response.data?.data || []);
  }
};
