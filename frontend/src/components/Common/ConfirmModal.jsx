import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';
import { cn } from '../../utils/cn';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Xác nhận hành động", 
  message = "Bạn có chắc chắn muốn thực hiện hành động này không?", 
  confirmText = "Xác nhận", 
  cancelText = "Hủy bỏ",
  type = "danger", // danger, warning, info
  isLoading = false
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: "bg-red-50 text-red-500",
      button: "bg-red-500 hover:bg-red-600 shadow-red-500/20",
    },
    warning: {
      icon: "bg-amber-50 text-amber-500",
      button: "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20",
    },
    info: {
      icon: "bg-blue-50 text-blue-500",
      button: "bg-primary hover:bg-primary/90 shadow-primary/20",
    }
  };

  const currentStyle = typeStyles[type] || typeStyles.danger;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-[10px] shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-secondary hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="p-8 pt-10">
            {/* Icon Header */}
            <div className={cn(
              "w-16 h-16 rounded-3xl flex items-center justify-center text-2xl mb-6 mx-auto",
              currentStyle.icon
            )}>
              <FiAlertTriangle />
            </div>

            {/* Text */}
            <div className="text-center space-y-2 mb-10">
              <h3 className="text-xl font-black text-secondary">
                {title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {message}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className={cn(
                  "flex-1 px-6 py-4 rounded-2xl text-white font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50",
                  currentStyle.button
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
