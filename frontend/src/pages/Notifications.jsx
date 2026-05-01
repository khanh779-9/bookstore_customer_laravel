import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/client";
import {
  FiBell,
  FiCheck,
  FiArchive,
  FiShoppingBag,
  FiTag,
  FiInfo,
  FiTrash2,
  FiInbox,
} from "react-icons/fi";
import { useToast } from "../contexts/ToastContext";
import { Loading } from "@/shared/ui";
import { ConfirmModal } from "@/shared/ui";
import { cn } from "../utils/cn";

const TABS = [
  { id: "all", label: "Tất cả", icon: FiBell },
  { id: "don_hang", label: "Đơn hàng", icon: FiShoppingBag },
  { id: "khuyen_mai", label: "Khuyến mãi", icon: FiTag },
  { id: "he_thong", label: "Hệ thống", icon: FiInfo },
];

 export default function Notifications() {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [confirmArchive, setConfirmArchive] = useState({
    isOpen: false,
    id: null,
  });

  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const params = activeTab !== "all" ? { loai: activeTab } : {};
      const res = await api.get("/notifications", { params });
      setNotifications(res.data.data || []);
    } catch (e) {
      showToast("Không thể tải thông báo", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAll = async () => {
    try {
      await api.post("/notifications/mark-all");
      fetchNotifications();
      showToast("Đã đánh dấu tất cả là đã đọc", "success");
    } catch (e) {
      showToast("Có lỗi xảy ra", "error");
    }
  };

  const toggleRead = async (id) => {
    try {
      await api.post(`/notifications/${id}/toggle`);
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id
            ? { ...n, status: n.status === "chua_doc" ? "da_doc" : "chua_doc" }
            : n,
        ),
      );
    } catch (e) {}
  };

  const handleArchiveClick = (id) => {
    setConfirmArchive({ isOpen: true, id });
  };

  const onConfirmArchive = async () => {
    const id = confirmArchive.id;
    try {
      await api.post(`/notifications/${id}/archive`);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      showToast("Đã lưu trữ thông báo", "success");
    } catch (e) {
      showToast("Lỗi khi lưu trữ", "error");
    } finally {
      setConfirmArchive({ isOpen: false, id: null });
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "don_hang":
        return <FiShoppingBag className="text-blue-500" />;
      case "khuyen_mai":
        return <FiTag className="text-amber-500" />;
      default:
        return <FiInfo className="text-slate-400" />;
    }
  };

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="container mx-auto px-4 pt-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
              Thông báo
            </h1>
            <p className="text-slate-500 font-medium">
              Cập nhật những tin tức mới nhất từ BookZone
            </p>
          </div>

          {notifications.some((n) => n.status === "chua_doc") && (
            <button
              onClick={handleMarkAll}
              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors bg-primary/5 px-4 py-2 rounded-none"
            >
              <FiCheck /> Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-none shadow-none border border-slate-100 mb-8 overflow-x-auto scrollbar-hide">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-none text-sm font-bold transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-primary text-white shadow-none shadow-primary/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-secondary",
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {loading ? (
            <Loading message="Đang tìm các thông báo mới nhất..." />
          ) : (
            <AnimatePresence mode="popLayout">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={cn(
                      "group bg-white rounded-none p-6 border transition-all flex items-start gap-6",
                      notif.status === "chua_doc"
                        ? "border-primary/20 shadow-none shadow-primary/5 bg-gradient-to-r from-primary/[0.02] to-transparent"
                        : "border-slate-100 hover:border-slate-200",
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-none flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110",
                        notif.status === "chua_doc"
                          ? "bg-primary/10"
                          : "bg-slate-50",
                      )}
                    >
                      {getTypeIcon(notif.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3
                          className={cn(
                            "font-bold text-base truncate",
                            notif.status === "chua_doc"
                              ? "text-secondary"
                              : "text-slate-600",
                          )}
                        >
                          {notif.title}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                          {new Date(notif.created_at).toLocaleDateString(
                            "vi-VN",
                          )}
                        </span>
                      </div>
                      <p
                        className={cn(
                          "text-sm leading-relaxed mb-4",
                          notif.status === "chua_doc"
                            ? "text-slate-600 font-medium"
                            : "text-slate-400",
                        )}
                      >
                        {notif.content}
                      </p>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleRead(notif.id)}
                          className={cn(
                            "flex items-center gap-1.5 text-xs font-bold transition-all",
                            notif.status === "chua_doc"
                              ? "text-primary hover:text-primary/80"
                              : "text-slate-400 hover:text-secondary",
                          )}
                        >
                          <FiCheck className="w-4 h-4" />
                          {notif.status === "chua_doc"
                            ? "Đánh dấu đã đọc"
                            : "Đánh dấu chưa đọc"}
                        </button>
                        <button
                          onClick={() => handleArchiveClick(notif.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-red-500 transition-all"
                        >
                          <FiArchive className="w-4 h-4" /> Lưu trữ
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-none py-20 px-10 text-center border border-slate-100"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-none flex items-center justify-center mx-auto mb-6">
                    <FiInbox className="text-4xl text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary mb-2">
                    Hộp thư trống
                  </h3>
                  <p className="text-slate-400 font-medium max-w-xs mx-auto">
                    Hiện tại bạn không có thông báo nào trong mục này.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmArchive.isOpen}
        onClose={() => setConfirmArchive({ isOpen: false, id: null })}
        onConfirm={onConfirmArchive}
        title="Lưu trữ thông báo"
        message="Thông báo này sẽ không còn hiển thị trong danh sách. Bạn có chắc chắn?"
        confirmText="Lưu trữ"
        type="warning"
      />
    </div>
  );
}



