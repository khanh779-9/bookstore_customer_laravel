import { useState, useEffect } from 'react';
import api from '../../api/client';
import { FiTrendingUp, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function EmployeeReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/employee/reports')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Lỗi tải báo cáo');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Đang tải báo cáo...</div>;

  const { revenueByMonth = [] } = data || {};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Báo cáo doanh thu</h1>
        <p className="text-sm text-gray-500">Thống kê hoạt động kinh doanh của nhà sách</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-none border border-gray-100 shadow-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-none"><FiDollarSign className="w-6 h-6" /></div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng doanh thu</div>
              <div className="text-2xl font-bold text-gray-800">
                {(revenueByMonth.reduce((acc, curr) => acc + parseFloat(curr.doanhthu), 0)).toLocaleString('vi-VN')}₫
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-none border border-gray-100 shadow-none">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-none"><FiShoppingBag className="w-6 h-6" /></div>
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng đơn hàng</div>
              <div className="text-2xl font-bold text-gray-800">
                {revenueByMonth.reduce((acc, curr) => acc + curr.sodon, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 className="text-lg font-bold mb-6">Chi tiết doanh thu theo tháng</h3>
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tháng</th>
                <th>Số đơn hàng</th>
                <th className="text-right">Doanh thu</th>
                <th className="text-right">Trung bình đơn</th>
              </tr>
            </thead>
            <tbody>
              {revenueByMonth.map(item => (
                <tr key={item.thang}>
                  <td className="font-bold">{item.thang}</td>
                  <td>{item.sodon} đơn</td>
                  <td className="text-right font-bold text-primary">{parseFloat(item.doanhthu).toLocaleString('vi-VN')}₫</td>
                  <td className="text-right text-gray-500">
                    {Math.round(parseFloat(item.doanhthu) / item.sodon).toLocaleString('vi-VN')}₫
                  </td>
                </tr>
              ))}
              {revenueByMonth.length === 0 && (
                <tr><td colSpan="4" className="text-center py-12 text-gray-400">Chưa có dữ liệu thống kê</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



