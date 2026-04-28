import api from '../api/client';

export const notificationService = {
  getNotifications: async () => {
    const response = await api.get('/notifications');
    const notifs = response.data?.notifications || response.data || [];
    return Array.isArray(notifs) ? notifs : [];
  },

  markAllRead: async () => {
    const response = await api.post('/notifications/mark-all');
    return response.data;
  }
};
