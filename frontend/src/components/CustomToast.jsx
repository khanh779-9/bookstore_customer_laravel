import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";
import { cn } from "../utils/cn";

export default function CustomToast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}) {
  useEffect(() => {
    if (!duration) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <FiCheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <FiAlertCircle className="w-5 h-5 text-red-500" />,
    info: <FiInfo className="w-5 h-5 text-blue-500" />,
  };

  const colors = {
    success: "border-emerald-100 bg-emerald-50/80 text-emerald-900",
    error: "border-red-100 bg-red-50/80 text-red-900",
    info: "border-blue-100 bg-blue-50/80 text-blue-900",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={cn(
        "fixed top-20 right-6 overflow-hidden z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[320px] max-w-md",
        colors[type],
      )}
      role="alert"
    >
      <div className="shrink-0">{icons[type]}</div>

      <div className="flex-1">
        <p className="text-sm font-bold leading-tight">{message}</p>
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-black/5 transition-colors text-slate-400 hover:text-slate-600 ml-5"
      >
        <FiX className="w-4 h-4" />
      </button>

      {/* Progress Bar */}
      <motion.div
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
        className={cn(
          "absolute bottom-0 left-0 h-1 rounded-full opacity-40",
          type === "success"
            ? "bg-emerald-500"
            : type === "error"
              ? "bg-red-500"
              : "bg-blue-500",
        )}
      />
    </motion.div>
  );
}
