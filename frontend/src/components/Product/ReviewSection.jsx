import { useState } from "react";
import { FiStar, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import { TextArea } from "@/shared/ui";
import api from "../../api/client";
import { useToast } from "../../contexts/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

export default function ReviewSection({ productId, reviews, avgRating, totalReviews, isAuthenticated }) {
  const [activeTab, setActiveTab] = useState("list");
  const [reviewForm, setReviewForm] = useState({ rating: 5, noi_dung: "" });
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${productId}/reviews`, reviewForm);
      showToast("Cảm ơn bạn đã đánh giá!", "success");
      queryClient.invalidateQueries({ queryKey: ["product", String(productId)] });
      setReviewForm({ rating: 5, noi_dung: "" });
      setActiveTab("list");
    } catch (err) {
      showToast(err.response?.data?.message || "Lỗi gửi đánh giá", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-stretch gap-6 p-6 md:p-8 bg-slate-50 rounded-xl shadow-sm">
        <div className="text-center md:w-52 md:border-r border-slate-200 md:pr-6">
          <div className="text-5xl md:text-6xl font-bold text-secondary mb-2">{avgRating.toFixed(1)}</div>
          <div className="flex justify-center text-amber-500 gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar key={s} className={cn("w-5 h-5", s <= Math.round(avgRating) && "fill-current")} />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{totalReviews} đánh giá</span>
        </div>

        <div className="flex-1 space-y-3">
          <h4 className="font-bold text-secondary text-lg">Cảm nhận từ độc giả</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Hầu hết độc giả đánh giá cao chất lượng nội dung và hình thức của cuốn sách này. Hãy chia sẻ trải nghiệm của bạn nhé!
          </p>
          {isAuthenticated && activeTab === "list" && (
            <button
              onClick={() => setActiveTab("write")}
              className="text-primary font-bold text-sm flex items-center gap-2 group cursor-pointer"
            >
              Viết đánh giá của bạn <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "write" ? (
          <motion.form
            key="write"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleReview}
            className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-6"
          >
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mức độ hài lòng?</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s} type="button"
                    className={cn("text-4xl transition-all", s <= reviewForm.rating ? "text-amber-500 scale-110" : "text-slate-100 hover:text-slate-200")}
                    onClick={() => setReviewForm(prev => ({ ...prev, rating: s }))}
                  >
                    <FiStar className={s <= reviewForm.rating ? "fill-current" : ""} />
                  </button>
                ))}
              </div>
            </div>
            <TextArea
              placeholder="Chia sẻ cảm nhận chi tiết của bạn..."
              value={reviewForm.noi_dung}
              onChange={(e) => setReviewForm(prev => ({ ...prev, noi_dung: e.target.value }))}
              required
            />
            <div className="flex gap-3">
              <button type="button" onClick={() => setActiveTab("list")} className="flex-1 py-4 font-bold text-slate-400">Hủy</button>
              <button type="submit" className="flex-[2] btn-dark py-4">Gửi đánh giá</button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="max-h-[500px] overflow-y-auto pr-2 space-y-4"
          >
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <div key={r.id} className="p-5 bg-white border border-slate-100 rounded-xl hover:border-primary/20 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs uppercase">
                        {r.customer_name?.charAt(0) || "K"}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-secondary">{r.customer_name || "Khách hàng"}</div>
                        <div className="flex text-amber-500 text-[10px]">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <FiStar key={s} className={cn(s <= r.rating && "fill-current")} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.date}</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{r.content || "Sản phẩm tuyệt vời!"}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 opacity-30">Chưa có đánh giá nào cho sản phẩm này.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
