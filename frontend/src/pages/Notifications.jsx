import { useState, useEffect } from 'react';
import api from '../api/client';
import { FiBell, FiCheck, FiArchive } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.notifications?.data || []);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAll = async () => {
    try {
      await api.post('/notifications/mark-all');
      fetchNotifications();
      toast.success('Đã đánh dấu tất cả là đã đọc');
    } catch (e) {}
  };

  const toggleRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/toggle`);
      fetchNotifications();
    } catch (e) {}
  };

  const archive = async (id) => {
    try {
      await api.post(`/notifications/${id}/archive`);
      fetchNotifications();
    } catch (e) {}
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div></div>;

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1><FiBell /> Thông báo của bạn</h1>
        {notifications.some(n => n.trang_thai === 'chua_doc') && (
          <button className="btn-secondary" onClick={handleMarkAll}>Đánh dấu tất cả đã đọc</button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <FiBell className="empty-icon" />
          <p>Bạn chưa có thông báo nào.</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map(notif => (
            <div key={notif.thongbao_id} className={`notification-item ${notif.trang_thai === 'chua_doc' ? 'unread' : ''}`}>
              <div className="notification-content">
                <p className="notification-title">{notif.noidung}</p>
                <small className="notification-time">{new Date(notif.ngaytao).toLocaleString('vi-VN')}</small>
              </div>
              <div className="notification-actions">
                <button onClick={() => toggleRead(notif.thongbao_id)} title={notif.trang_thai === 'chua_doc' ? 'Đánh dấu đã đọc' : 'Đánh dấu chưa đọc'}>
                  <FiCheck className={notif.trang_thai === 'chua_doc' ? 'text-primary' : 'text-muted'} />
                </button>
                <button onClick={() => archive(notif.thongbao_id)} title="Lưu trữ">
                  <FiArchive />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
