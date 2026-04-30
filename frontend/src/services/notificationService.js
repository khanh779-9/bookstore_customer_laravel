import api from '../api/client';

export const notificationService = {
  getNotifications: async () => {
    try {
      const response = await api.get('/notifications');
      const notifs = response.data?.data || response.data || [];
      return Array.isArray(notifs) ? notifs : [];
    } catch (err) {
      // If backend returns error, gracefully return empty array so UI doesn't crash
      return [];
    }
  },

  markAllRead: async () => {
    const response = await api.post('/notifications/mark-all');
    return response.data;
  }
};
