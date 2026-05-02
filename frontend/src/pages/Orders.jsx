import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/client";
import {
  FiPackage, FiChevronRight, FiBox, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiArrowLeft, FiCreditCard, FiMapPin
} from "react-icons/fi";
import { useToast } from "../contexts/ToastContext";
import { Loading } from "@/shared/ui";
import { cn } from "../utils/cn";
import { formatCurrency, formatProductImage } from "../utils/format";
import { motion, AnimatePresence } from "framer-motion";

const statusMap = {
  cho_thanh_toan: { label: "Chờ thanh toán", color: "bg-amber-50 text-amber-600", icon: FiCreditCard },
  cho_xac_nhan: { label: "Chờ xác nhận", color: "bg-blue-50 text-blue-600", icon: FiClock },
  da_xac_nhan: { label: "Đã xác nhận", color: "bg-indigo-50 text-indigo-600", icon: FiCheckCircle },
  dang_giao_hang: { label: "Đang vận chuyển", color: "bg-cyan-50 text-cyan-600", icon: FiTruck },
  da_giao_hang: { label: "Giao thành công", color: "bg-emerald-50 text-emerald-600", icon: FiCheckCircle },
  da_huy: { label: "Đã hủy đơn", color: "bg-rose-50 text-rose-600", icon: FiXCircle },
};

export default function Orders() {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const [orders, setOrders] = useState([]);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (orderId) {
          const res = await api.get(`/orders/${orderId}`);
          setDetails(res.data.data);
        } else {
          const res = await api.get("/orders");
          setOrders(res.data.data || []);
        }
      } catch (err) {
        showToast("Lỗi tải dữ liệu đơn hàng", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [orderId, showToast]);

  if (loading) return <Loading message="Đang kiểm tra đơn hàng của bạn..." />;

  if (orderId && details) return <OrderDetailView order={details} />;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-secondary uppercase tracking-tight">Lịch sử đơn hàng</h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Theo dõi hành trình của những cuốn sách bạn đã chọn</p>
        </div>

        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* --- Internal Views --- */

function OrderCard({ order }) {
  const status = statusMap[order.status] || { label: order.status, color: "bg-slate-100 text-slate-500", icon: FiBox };
  const StatusIcon = status.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200 rounded-sm p-6 hover:shadow-xl transition-all group">
      <Link to={`/orders?id=${order.id}`} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className={cn("w-16 h-16 flex items-center justify-center rounded-sm text-2xl", status.color)}>
            <StatusIcon />
          </div>
          <div>
            <h3 className="text-lg font-black text-secondary tracking-tight">ĐƠN HÀNG #{order.id}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
              Ngày đặt: {new Date(order.created_at).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-10">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Tổng cộng</p>
            <p className="text-xl font-black text-primary">{formatCurrency(order.total_amount)}</p>
          </div>
          <div className={cn("px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-sm", status.color)}>
            {status.label}
          </div>
          <FiChevronRight className="text-slate-300 group-hover:text-primary transition-colors hidden md:block" size={24} />
        </div>
      </Link>
    </motion.div>
  );
}

function OrderDetailView({ order }) {
  const status = statusMap[order.status] || { label: order.status, color: "bg-slate-100 text-slate-500", icon: FiBox };
  const StatusIcon = status.icon;

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        <Link to="/orders" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest transition-colors">
          <FiArrowLeft /> Quay lại danh sách
        </Link>

        <div className="bg-white border border-slate-200 rounded-sm shadow-2xl shadow-slate-200 overflow-hidden">
          {/* Status Banner */}
          <div className={cn("p-8 flex items-center justify-between text-white", status.color.split(' ')[1].replace('text', 'bg'))}>
            <div className="flex items-center gap-6">
              <StatusIcon size={48} className="opacity-50" />
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">{status.label}</h2>
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Mã đơn: #{order.id}</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Thời gian đặt</p>
              <p className="text-lg font-black">{new Date(order.created_at).toLocaleString("vi-VN")}</p>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-12">
            {/* Shipping & Payment Info */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FiMapPin className="text-primary" /> Địa chỉ giao hàng
                </h4>
                <p className="text-sm font-bold text-secondary leading-relaxed">{order.address}</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <FiCreditCard className="text-primary" /> Hình thức thanh toán
                </h4>
                <p className="text-sm font-bold text-secondary uppercase tracking-tight">
                  {order.payment_method === "cod" ? "Tiền mặt khi nhận hàng (COD)" : "Chuyển khoản ngân hàng"}
                </p>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Danh sách sản phẩm ({order.items?.length})</h4>
              <div className="space-y-4">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-4 hover:bg-slate-50 transition-all rounded-sm border border-transparent hover:border-slate-100">
                    <img src={formatProductImage(item.image)} className="w-16 h-20 object-contain bg-white border border-slate-100 p-1 rounded-sm" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-secondary text-sm uppercase tracking-tight truncate">{item.product_name}</p>
                      <p className="text-xs text-slate-400 font-bold mt-1">SỐ LƯỢNG: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-primary">{formatCurrency(item.unit_price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="pt-10 border-t border-slate-100 flex flex-col items-end">
              <div className="w-full max-w-xs space-y-4">
                <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span>Tạm tính</span>
                  <span className="text-secondary">{formatCurrency(order.total_amount)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-emerald-500 uppercase tracking-widest">
                  <span>Phí vận chuyển</span>
                  <span>Miễn phí</span>
                </div>
                <div className="h-px bg-slate-100 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black text-secondary uppercase tracking-tight">Tổng thanh toán</span>
                  <span className="text-3xl font-black text-primary tracking-tighter">{formatCurrency(order.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div className="text-center py-32 bg-white border border-slate-100 rounded-sm">
      <FiBox className="text-6xl text-slate-100 mx-auto mb-6" />
      <h3 className="text-xl font-black text-secondary uppercase tracking-tight">Chưa có đơn hàng nào</h3>
      <p className="text-slate-400 text-sm font-medium mt-2 mb-10">Bạn chưa thực hiện giao dịch nào tại BookZone.</p>
      <Link to="/products" className="btn-dark px-10 py-4 uppercase text-xs tracking-widest">Bắt đầu mua sắm ngay</Link>
    </div>
  );
}
