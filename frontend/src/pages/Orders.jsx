import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api/client';
import { FiPackage, FiCalendar, FiCreditCard, FiChevronRight, FiBox, FiClock, FiCheckCircle, FiTruck, FiXCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

const statusConfig = {
  'cho_xac_nhan': { label: 'Chờ xác nhận', color: 'bg-yellow-50 text-yellow-600 border-yellow-100', icon: <FiClock /> },
  'da_xac_nhan': { label: 'Đã xác nhận', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: <FiCheckCircle /> },
  'dang_giao': { label: 'Đang giao', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', icon: <FiTruck /> },
  'da_giao': { label: 'Đã giao', color: 'bg-green-50 text-green-600 border-green-100', icon: <FiCheckCircle /> },
  'da_huy': { label: 'Đã hủy', color: 'bg-red-50 text-red-600 border-red-100', icon: <FiXCircle /> },
  'cho_thanh_toan': { label: 'Chờ thanh toán', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: <FiCreditCard /> },
};

export default function Orders() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      api.get(`/orders/${orderId}`).then(res => {
        setOrderDetails(res.data);
        setLoading(false);
      }).catch(() => {
        toast.error('Không tìm thấy đơn hàng');
        setLoading(false);
      });
    } else {
      setLoading(true);
      api.get('/orders').then(res => {
        setOrders(res.data);
        setLoading(false);
      }).catch(() => setLoading(false));
    }
  }, [orderId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></div>
    </div>
  );

  if (orderId && orderDetails) {
    const { order } = orderDetails;
    const status = statusConfig[order.trangthai] || { label: order.trangthai, color: 'bg-gray-100' };

    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/orders" className="text-sm font-black text-gray-400 hover:text-primary transition-colors flex items-center gap-2">
            <FiPackage className="rotate-180" /> QUAY LẠI DANH SÁCH
          </Link>
          <div className={`px-4 py-1 rounded-full text-xs font-black border uppercase tracking-widest flex items-center gap-2 ${status.color}`}>
            {status.icon} {status.label}
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
          <div className="p-8 md:p-12 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gray-50/30">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 italic mb-2">Đơn hàng #{order.hoadon_id}</h1>
              <p className="text-sm text-gray-400 font-bold italic">Đặt ngày: {new Date(order.ngaytao).toLocaleString('vi-VN')}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-black uppercase tracking-widest mb-1">Tổng thanh toán</p>
              <div className="text-3xl font-black text-primary italic leading-none">{parseFloat(order.tongtien).toLocaleString('vi-VN')}₫</div>
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                <FiPackage className="text-primary" /> Thông tin giao hàng
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">Người nhận</span>
                  <span className="font-bold text-gray-800">Quốc Khánh (Khách hàng #{order.khachhang_id})</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider mb-1">Địa chỉ</span>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed italic">{order.diachi_giaohang || 'Đang cập nhật'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em] flex items-center gap-2">
                <FiCreditCard className="text-primary" /> Phương thức thanh toán
              </h3>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="font-bold text-gray-800 text-sm italic">{order.phuongthuc_thanhtoan === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</p>
                <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black border ${order.trangthai === 'cho_thanh_toan' ? 'bg-orange-50 text-orange-500 border-orange-100' : 'bg-green-50 text-green-500 border-green-100'}`}>
                  {order.trangthai === 'cho_thanh_toan' ? 'Chưa thanh toán' : 'Đã thanh toán'}
                </div>
              </div>
            </div>
          </div>

          <div className="px-8 md:px-12 pb-12">
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-[0.2em] mb-8 flex items-center gap-2">
              <FiBox className="text-primary" /> Sản phẩm đã đặt
            </h3>
            <div className="space-y-4">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-20 h-24 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center shrink-0 p-2">
                    <img 
                      src={`/assets/images/${item.hinhanh || 'products/defaultProduct.png'}`} 
                      alt={item.ten_sanpham} 
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = '/assets/images/products/defaultProduct.png'; }} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-gray-900 text-sm line-clamp-1">{item.ten_sanpham}</h4>
                    <p className="text-xs text-gray-400 font-bold italic mt-1">Số lượng: {item.soluong}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-primary italic">{parseFloat(item.thanhtien || (item.dongia * item.soluong)).toLocaleString('vi-VN')}₫</div>
                    <div className="text-[10px] text-gray-400 font-bold italic mt-1">Đơn giá: {parseFloat(item.dongia).toLocaleString('vi-VN')}₫</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 italic tracking-tight">Đơn hàng của tôi</h1>
          <p className="text-sm text-gray-400 font-bold italic mt-2">Quản lý và theo dõi lịch sử mua sắm của bạn</p>
        </div>
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-[1.5rem] flex items-center justify-center text-3xl shadow-lg shadow-green-100">
          <FiPackage />
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
          <FiBox className="text-6xl text-gray-200 mx-auto mb-6" />
          <h3 className="text-xl font-black text-gray-900 italic">Bạn chưa có đơn hàng nào</h3>
          <p className="text-gray-400 mt-2 font-bold italic">Hãy bắt đầu hành trình mua sắm cùng BookZone nhé!</p>
          <Link to="/products" className="mt-8 inline-block bg-primary text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-green-100 hover:scale-105 active:scale-95 transition-all">
            MUA SẮM NGAY
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.trangthai] || { label: order.trangthai, color: 'bg-gray-100' };
            return (
              <Link 
                key={order.hoadon_id} 
                to={`/orders?id=${order.hoadon_id}`}
                className="block bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${status.color}`}>
                      {status.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-black text-gray-900 text-lg">Đơn hàng #{order.hoadon_id}</h3>
                        <span className={`px-3 py-0.5 rounded-full text-[10px] font-black border uppercase tracking-wider ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400 font-bold italic mt-1">
                        <span className="flex items-center gap-1"><FiCalendar className="shrink-0" /> {new Date(order.ngaytao).toLocaleDateString('vi-VN')}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span className="flex items-center gap-1 uppercase"><FiCreditCard className="shrink-0" /> {order.phuongthuc_thanhtoan}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end md:gap-12 pl-20 md:pl-0">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Tổng tiền</p>
                      <div className="text-xl font-black text-primary italic leading-none">{parseFloat(order.tongtien).toLocaleString('vi-VN')}₫</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all">
                      <FiChevronRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
