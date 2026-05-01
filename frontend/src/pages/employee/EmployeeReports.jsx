 import { useState, useEffect } from 'react';
import api from '../../api/client';
import { FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import { useToast } from '../../contexts/ToastContext';
import AdminPageHeader from '../../components/Admin/AdminPageHeader';
import AdminDataTable from '../../components/Admin/AdminDataTable';

export default function EmployeeReports() {
  const { showToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/employee/reports')
      .then(res => {
        setData(res.data);
      })
      .catch(() => {
        showToast('Lỗi tải báo cáo', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [showToast]);

  const { revenueByMonth = [] } = data || {};

  const columns = [
    { header: 'Tháng', render: (item) => <span className="font-bold text-slate-900">{item.thang}</span> },
    { header: 'Số đơn hàng', render: (item) => <span className="text-slate-600">{item.sodon} đơn</span> },
    { 
      header: 'Doanh thu', 
      cellClassName: 'text-right',
      render: (item) => <span className="font-bold text-primary">{parseFloat(item.doanhthu).toLocaleString('vi-VN')}₫</span> 
    },
    { 
      header: 'Trung bình đơn', 
      cellClassName: 'text-right',
      render: (item) => <span className="text-slate-400 font-medium">{Math.round(parseFloat(item.doanhthu) / item.sodon).toLocaleString('vi-VN')}₫</span> 
    },
  ];

  return (
    <div className="space-y-6 bg-slate-50 p-4 md:p-8 min-h-full">
      <AdminPageHeader 
        title="Báo cáo doanh thu" 
        description="Thống kê hoạt động kinh doanh và hiệu suất bán hàng của nhà sách."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-sm">
              <FiDollarSign className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng doanh thu</div>
              <div className="text-xl font-black text-slate-900">
                {(revenueByMonth.reduce((acc, curr) => acc + parseFloat(curr.doanhthu), 0)).toLocaleString('vi-VN')}₫
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-sm">
              <FiShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tổng đơn hàng</div>
              <div className="text-xl font-black text-slate-900">
                {revenueByMonth.reduce((acc, curr) => acc + curr.sodon, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Chi tiết doanh thu theo tháng</h3>
        </div>
        <AdminDataTable 
          columns={columns}
          data={revenueByMonth}
          loading={loading}
          idField="thang"
          emptyMessage="Chưa có dữ liệu thống kê"
        />
      </div>
    </div>
  );
}



