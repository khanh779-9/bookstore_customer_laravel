import api from '../api/client';

export const categoryService = {
  getAllCategories: async () => {
    const response = await api.get('/categories');
    const data = response.data;
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  }
};
