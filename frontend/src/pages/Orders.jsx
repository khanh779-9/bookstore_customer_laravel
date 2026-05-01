import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/client";
import {
  FiPackage,
  FiCalendar,
  FiCreditCard,
  FiChevronRight,
  FiBox,
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";
import { useToast } from "../contexts/ToastContext";
import Loading from "../components/Common/Loading";

const statusConfig = {
  cho_xac_nhan: {
    label: "Chờ xác nhận",
    color: "bg-yellow-50 text-yellow-600",
    icon: <FiClock />,
  },
  da_xac_nhan: {
    label: "Đã xác nhận",
    color: "bg-blue-50 text-blue-600",
    icon: <FiCheckCircle />,
  },
  dang_giao_hang: {
    label: "Đang giao",
    color: "bg-indigo-50 text-indigo-600",
    icon: <FiTruck />,
  },
  da_giao_hang: {
    label: "Đã giao",
    color: "bg-green-50 text-green-600",
    icon: <FiCheckCircle />,
  },
  da_huy: {
    label: "Đã hủy",
    color: "bg-red-50 text-red-600",
    icon: <FiXCircle />,
  },
  cho_thanh_toan: {
    label: "Chờ thanh toán",
    color: "bg-orange-50 text-orange-600",
    icon: <FiCreditCard />,
  },
};

export default function Orders() {
  const { showToast } = useToast();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (orderId) {
          const res = await api.get(`/orders/${orderId}`);
          // JSON Resource returns data in 'data' wrapper
          setOrderDetails(res.data.data);
        } else {
          const res = await api.get("/orders");
          // Paginated Resource returns data in 'data' wrapper
          setOrders(res.data.data || []);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        showToast("Lỗi tải dữ liệu", "error");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [orderId]);

  if (loading) {
    return <Loading message="Đang liệt kê các chuyến hàng của bạn..." />;
  }

  // ================= DETAIL =================
  if (orderId && orderDetails) {
    const order = orderDetails; // Already unwrapped data
    const status = statusConfig[order.status] || {};

    return (
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <Link
            to="/orders"
            className="text-sm text-gray-400 hover:text-primary flex items-center gap-2"
          >
            ← Quay lại
          </Link>

          <div
            className={`px-4 py-1 rounded-none text-xs font-bold flex items-center gap-2 ${status.color}`}
          >
            {status.icon} {status.label}
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white rounded-none shadow-none border p-8 space-y-8">
          {/* TOP */}
          <div className="flex justify-between flex-wrap gap-6">
            <div>
              <h1 className="text-2xl font-black">Đơn #{order.id}</h1>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(order.created_at).toLocaleString("vi-VN")}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-400">Tổng tiền</p>
              <div className="text-2xl font-black text-primary">
                {parseFloat(order.total_amount).toLocaleString("vi-VN")}₫
              </div>
            </div>
          </div>

          {/* INFO */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-500 uppercase">
                Giao hàng
              </h3>
              <p className="font-semibold">{order.address}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-500 uppercase">
                Thanh toán
              </h3>
              <p>
                {order.payment_method === "cod"
                  ? "Thanh toán khi nhận hàng"
                  : "Chuyển khoản"}
              </p>
            </div>
          </div>

          {/* ITEMS */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-gray-500 uppercase">
              Sản phẩm
            </h3>

            {order.items?.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-none hover:bg-gray-50 transition"
              >
                <img
                  src={`/assets/images/${item.image || "products/defaultProduct.png"}`}
                  className="w-16 h-20 object-contain bg-gray-50 rounded-none"
                />

                <div className="flex-1">
                  <p className="font-semibold">{item.product_name}</p>
                  <p className="text-sm text-gray-400">x{item.quantity}</p>
                </div>

                <div className="font-bold text-primary">
                  {(item.unit_price * item.quantity).toLocaleString("vi-VN")}₫
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ================= LIST =================
  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black">Đơn hàng của tôi</h1>
        <p className="text-gray-400 text-sm mt-1">Theo dõi đơn hàng của bạn</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 border border-gray-200 rounded-none">
          <FiBox className="text-5xl text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400">Chưa có đơn hàng</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || {};

            return (
              <Link
                key={order.id}
                to={`/orders?id=${order.id}`}
                className="block p-6 rounded-none border hover:shadow-none transition group"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-none flex items-center justify-center ${status.color}`}
                    >
                      {status.icon}
                    </div>

                    <div>
                      <p className="font-bold">#{order.id}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(order.created_at).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Tổng tiền</p>
                      <p className="font-bold text-primary">
                        {parseFloat(order.total_amount).toLocaleString("vi-VN")}
                        ₫
                      </p>
                    </div>

                    <FiChevronRight className="text-gray-400 group-hover:text-primary" />
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



