import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../../services/notificationService";
import { Loading } from "@/shared/ui";
import {
  FiBell,
  FiCheckCircle,
  FiClock,
  FiInfo,
  FiAlertCircle,
  FiShoppingBag,
  FiSettings,
  FiMoreVertical,
  FiCheck,
  FiTrash2,
  FiFilter,
} from "react-icons/fi";
import { cn } from "../../utils/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployeeNotifications() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all"); // all, unread

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["employee-notifications"],
    queryFn: () => notificationService.getNotifications(),
  });

  const markAllReadMutation = useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => queryClient.invalidateQueries(["employee-notifications"]),
  });

  const toggleReadMutation = useMutation({
    mutationFn: (id) => notificationService.toggleRead(id),
    onSuccess: () => queryClient.invalidateQueries(["employee-notifications"]),
  });

  const archiveMutation = useMutation({
    mutationFn: (id) => notificationService.archive(id),
    onSuccess: () => queryClient.invalidateQueries(["employee-notifications"]),
  });

  const getIcon = (type) => {
    switch (type) {
      case "don_hang":
        return (
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
            <FiShoppingBag size={20} />
          </div>
        );
      case "he_thong":
        return (
          <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
            <FiSettings size={20} />
          </div>
        );
      case "noi_bo":
        return (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <FiInfo size={20} />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
            <FiBell size={20} />
          </div>
        );
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return n.status === "chua_doc";
    return true;
  });

  const unreadCount = notifications.filter(
    (n) => n.status === "chua_doc",
  ).length;

  const convertType = (type) => {
    switch (type) {
      case "don_hang":
        return "Đơn hàng";
      case "he_thong":
        return "Hệ thống";
      case "noi_bo":
        return "Nội bộ";
      default:
        return "Khác";
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-8 mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-8 border-b border-slate-200">
        <div className="text-slate-500 font-medium ml-12">
          <p>
            Bạn có <span className="text-primary font-bold">{unreadCount}</span>{" "}
            thông báo chưa đọc.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={() => markAllReadMutation.mutate()}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer rounded-sm"
            >
              <FiCheckCircle /> Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex items-center justify-between mb-6 bg-white p-1 border border-slate-200 rounded-sm shadow-sm">
        <div className="flex gap-1">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "px-6 py-2 text-sm font-bold transition-all cursor-pointer rounded-sm",
              filter === "all"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50",
            )}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={cn(
              "px-6 py-2 text-sm font-bold transition-all cursor-pointer relative rounded-sm",
              filter === "unread"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50",
            )}
          >
            Chưa đọc
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
            )}
          </button>
        </div>

        <div className="px-4 text-slate-400">
          <FiFilter size={18} />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-dashed border-slate-200 p-16 text-center rounded-sm"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBell className="text-slate-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Hộp thư trống
              </h3>
              <p className="text-slate-500">
                Hiện tại bạn không có thông báo nào trong mục này.
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map((notif, index) => (
              <motion.div
                layout
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "group bg-white border p-6 transition-all flex gap-5 border-slate-200 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden rounded-sm",
                  notif.status === "chua_doc"
                    ? "border-l-4 border-l-primary shadow-sm"
                    : "border-slate-200 border-l-4 border-l-slate-300 opacity-80",
                )}
              >
                {/* Visual indicator for unread */}
                {notif.status === "chua_doc" && (
                  <div className="absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 bg-primary/5 rounded-full blur-2xl"></div>
                )}

                <div className="shrink-0 pt-1">{getIcon(notif.type)}</div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3
                        className={cn(
                          "text-lg leading-tight transition-colors group-hover:text-primary mb-2",
                          notif.status === "chua_doc"
                            ? "font-black text-slate-900"
                            : "font-bold text-slate-600",
                        )}
                      >
                        {notif.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <FiClock size={12} />
                          {new Date(notif.created_at).toLocaleString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </span>
                        <span className="text-[10px] font-black px-2 py-0.5 bg-slate-100 text-slate-500 uppercase tracking-wider rounded-full border border-slate-200">
                          {convertType(notif.type)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleReadMutation.mutate(notif.id)}
                        className={cn(
                          "p-2 rounded-sm transition-all cursor-pointer",
                          notif.status === "chua_doc"
                            ? "text-green-600 hover:bg-green-50"
                            : "text-slate-400 hover:bg-slate-100",
                        )}
                        title={
                          notif.status === "chua_doc"
                            ? "Đánh dấu đã đọc"
                            : "Đánh dấu chưa đọc"
                        }
                      >
                        <FiCheck size={18} />
                      </button>
                      <button
                        onClick={() => archiveMutation.mutate(notif.id)}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-sm transition-all cursor-pointer"
                        title="Xóa thông báo"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm leading-relaxed whitespace-pre-line text-slate-600 bg-slate-50/50 p-4 border border-slate-100/50 rounded-sm">
                    {notif.content}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
