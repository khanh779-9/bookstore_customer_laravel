import api from '../api/client';

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  getPromotedProducts: async (limit = 8) => {
    const response = await api.get('/products', { 
      params: { promoted_only: 1, limit } 
    });
    return response.data.data || [];
  },

  getBestSellers: async (limit = 8) => {
    const response = await api.get('/products', { 
      params: { sort_by: 'best_selling', limit } 
    });
    return response.data.data || [];
  },

  getNewArrivals: async (limit = 8) => {
    const response = await api.get('/products', { 
      params: { limit } 
    });
    return response.data.data || [];
  }
};
