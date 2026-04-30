import { useState, useEffect } from 'react';
import api from '../../api/client';
import { FiEye, FiMail, FiPhone } from 'react-icons/fi';

export default function EmployeeCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/employee/customers');
      setCustomers(res.data.data || res.data || []);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1>Quản lý khách hàng</h1>
      </div>

      <div className="admin-card">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã KH</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Điện thoại</th>
                <th>Giới tính</th>
                <th>Ngày tham gia</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.khachhang_id}>
                  <td>#{c.khachhang_id}</td>
                  <td style={{ fontWeight: 500 }}>{c.ho} {c.tendem} {c.ten}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FiMail className="text-muted" /> {c.email}
                    </div>
                  </td>
                  <td>
                    {c.sdt ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FiPhone className="text-muted" /> {c.sdt}
                      </div>
                    ) : (
                      <span className="text-muted">Không có</span>
                    )}
                  </td>
                  <td>{c.gioitinh === 'nam' ? 'Nam' : c.gioitinh === 'nu' ? 'Nữ' : 'Khác'}</td>
                  <td>{c.ngaythamgia ? new Date(c.ngaythamgia).toLocaleDateString('vi-VN') : 'Không rõ'}</td>
                  <td>
                    <button className="btn-secondary" style={{ padding: '0.25rem 0.5rem' }} title="Xem chi tiết">
                      <FiEye />
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>Không có dữ liệu.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}



