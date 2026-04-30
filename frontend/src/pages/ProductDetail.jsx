import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { productService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import api from "../api/client";
import {
  FiShoppingCart,
  FiHeart,
  FiStar,
  FiMinus,
  FiPlus,
  FiChevronRight,
  FiShield,
  FiTruck,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import Loading from "../components/Common/Loading";
import Input from "../components/Common/Input";
import TextArea from "../components/Common/TextArea";
import { cn } from "../utils/cn";

export default function ProductDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, noi_dung: "" });
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const {
    data: response,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["product", id, isAuthenticated],
    queryFn: () => productService.getProductById(id),
  });

  useEffect(() => {
    if (response?.data) {
      setIsWishlisted(response.data.is_wishlisted || false);
    }
  }, [response]);

  if (loading) return <Loading message="Đang mở sách..." />;

  if (error || !response) {
    return (
      <div className="text-center py-24 bg-white rounded-none my-12 shadow-none border border-slate-100 mx-4">
        <div className="text-6xl mb-6">📚</div>
        <h2 className="text-3xl font-bold text-secondary mb-4">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-slate-500 mb-8">
          Cuốn sách bạn tìm kiếm có thể đã tạm hết hàng hoặc không tồn tại.
        </p>
        <Link to="/products" className="btn-primary">
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  const product = response.data;
  const meta = response.meta || {};
  const reviews = meta.reviews || [];
  const avgRating = meta.avg_rating || 0;
  const totalReviews = meta.total_reviews || 0;

  const name = product.display_name || product.name || "";
  const price = product.price || 0;
  const promoPrice = product.promo_price || price;
  const hasDiscount = promoPrice < price;
  const discountPercent = hasDiscount
    ? Math.round(((price - promoPrice) / price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success("Đã thêm vào giỏ hàng");
  };

  const toggleWishlist = async () => {
    try {
      const res = await api.post("/wishlist/toggle", {
        sanpham_id: product.id,
      });
      setIsWishlisted(res.data.added);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Vui lòng đăng nhập");
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${id}/reviews`, reviewForm);
      toast.success("Cảm ơn bạn đã đánh giá!");
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      setReviewForm({ rating: 5, noi_dung: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi gửi đánh giá");
    }
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="container mx-auto px-2 sm:px-4 pt-6 max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-8 uppercase tracking-widest overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <FiChevronRight className="shrink-0" />
          <Link to="/products" className="hover:text-primary transition-colors">
            Sản phẩm
          </Link>
          <FiChevronRight className="shrink-0" />
          <span className="text-secondary truncate max-w-[220px]">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-5 md:p-8 border border-slate-100 shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-transparent opacity-70 rounded-xl" />
              <div className="relative aspect-square flex items-center justify-center">
                <motion.img
                  transition={{ duration: 0.4 }}
                  src={
                    product.image?.startsWith("http")
                      ? product.image
                      : `/assets/images/products/${product.image || "defaultProduct.png"}`
                  }
                  alt={name}
                  className="max-w-full max-h-full object-contain relative z-10 rounded-lg shadow-md"
                  onError={(e) => {
                    e.target.src = "/assets/images/products/defaultProduct.png";
                  }}
                />
                {hasDiscount && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white font-black px-4 py-2 rounded-lg shadow-md shadow-red-500/20 rotate-6 z-20 text-sm">
                    -{discountPercent}%
                  </div>
                )}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-3 shadow-sm">
                <FiShield className="text-emerald-500 text-2xl shrink-0" />
                <span className="text-sm font-bold text-emerald-900">
                  100% Chính hãng
                </span>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex items-center gap-3 shadow-sm">
                <FiTruck className="text-blue-500 text-2xl shrink-0" />
                <span className="text-sm font-bold text-blue-900">
                  Giao hàng nhanh
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="space-y-5">
      
                <h1 className="text-3xl md:text-5xl font-black text-secondary leading-tight">
                  {name}
                </h1>

                <div className="flex flex-wrap items-center gap-8 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                      Tình trạng
                    </span>
                    <div className="flex items-center gap-2">
                      <FiCheckCircle
                        className={cn(
                          product.stock_quantity > 0
                            ? "text-emerald-500"
                            : "text-red-400",
                        )}
                      />
                      <span
                        className={cn(
                          "font-bold",
                          product.stock_quantity > 0
                            ? "text-emerald-600"
                            : "text-red-500",
                        )}
                      >
                        {product.stock_quantity > 0
                          ? `Còn hàng (${product.stock_quantity})`
                          : "Hết hàng"}
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:block w-px h-10 bg-slate-100" />

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">
                      Đã bán
                    </span>
                    <span className="font-bold text-secondary">
                      {product.sold_quantity || 0} bản
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-slate-50 rounded-xl p-5 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    Giá hiện tại
                  </span>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span
                      className={cn(
                        "text-3xl md:text-4xl font-bold",
                        hasDiscount ? "text-red-500" : "text-secondary",
                      )}
                    >
                      {promoPrice.toLocaleString("vi-VN")}₫
                    </span>
                    {hasDiscount && (
                      <span className="text-lg text-slate-400 line-through decoration-slate-300">
                        {price.toLocaleString("vi-VN")}₫
                      </span>
                    )}
                  </div>
                </div>

                {hasDiscount && (
                  <div className="bg-red-100 text-red-600 font-black px-4 py-2 rounded-lg text-sm w-fit">
                    Tiết kiệm {(price - promoPrice).toLocaleString("vi-VN")}₫
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1.5 shadow-sm w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors focus:ring-2 focus:ring-primary"
                  >
                    <FiMinus />
                  </button>

                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-14 text-center font-bold text-lg focus:outline-none bg-transparent border-none focus:ring-0 px-0"
                    containerClassName="w-auto"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(product.stock_quantity || 99, q + 1),
                      )
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors focus:ring-2 focus:ring-primary"
                  >
                    <FiPlus />
                  </button>
                </div>

                <button
                  className="flex-1 btn-primary py-5 text-base rounded-lg shadow-md shadow-primary/10 hover:scale-[1.03] transition-transform"
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity <= 0}
                >
                  <FiShoppingCart className="text-xl" />
                  Thêm vào giỏ hàng
                </button>

                <button
                  type="button"
                  onClick={toggleWishlist}
                  className={cn(
                    "w-14 h-14 border transition-all flex items-center justify-center shrink-0 focus:ring-2 focus:ring-red-300",
                    isWishlisted
                      ? "bg-red-500 border-red-500 text-white shadow-md shadow-red-500/20 scale-105"
                      : "border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50",
                  )}
                  aria-label={isWishlisted ? "Bỏ khỏi yêu thích" : "Thêm vào yêu thích"}
                >
                  <FiHeart
                    className={cn("w-7 h-7", isWishlisted && "fill-current")}
                  />
                </button>
              </div>

              {/* Tabs */}
              <div className="pt-8">
                <div className="flex gap-8 border-b border-slate-100 mb-6 overflow-x-auto whitespace-nowrap">
                  {[
                    { id: "description", label: "Mô tả" },
                    { id: "details", label: "Thông tin chi tiết" },
                    { id: "reviews", label: `Đánh giá (${totalReviews})` },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "pb-4 text-sm font-bold uppercase tracking-widest relative transition-colors",
                        activeTab === tab.id
                          ? "text-secondary"
                          : "text-slate-400 hover:text-slate-600",
                      )}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="tab-active"
                          className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-none"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[260px]">
                  <AnimatePresence mode="wait">
                    {activeTab === "description" && (
                      <motion.div
                        key="description"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white border border-slate-100 rounded-xl p-5 md:p-6 shadow-sm"
                      >
                        <h3 className="font-bold text-secondary mb-4">
                          Mô tả sản phẩm
                        </h3>

                        <div
                          className="max-h-[320px] overflow-y-auto pr-3 text-slate-600 leading-7 whitespace-pre-line"
                          style={{ scrollbarGutter: "stable" }}
                        >
                          {product.description ||
                            "Đang cập nhật thông tin mô tả..."}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "details" && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <DetailRow
                          label="Mã sản phẩm"
                          value={`#${product.id}`}
                        />
                        <DetailRow
                          label="Nhà cung cấp"
                          value={product.provider}
                        />
                        <DetailRow label="Đơn vị tính" value={product.unit} />
                        {product.book_details && (
                          <>
                            <DetailRow
                              label="Tác giả"
                              value={product.book_details.author_name}
                            />
                            <DetailRow
                              label="Nhà xuất bản"
                              value={product.book_details.publisher_name}
                            />
                            <DetailRow
                              label="Năm xuất bản"
                              value={product.book_details.publish_year}
                            />
                          </>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "reviews" && (
                      <motion.div
                        key="reviews"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="flex flex-col md:flex-row items-stretch gap-6 p-6 md:p-8 bg-slate-50 rounded-xl shadow-sm">
                          <div className="text-center md:w-52 md:border-r border-slate-200 md:pr-6">
                            <div className="text-5xl md:text-6xl font-bold text-secondary mb-2">
                              {avgRating.toFixed(1)}
                            </div>
                            <div className="flex justify-center text-amber-500 gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <FiStar
                                  key={s}
                                  className={cn(
                                    "w-5 h-5",
                                    s <= Math.round(avgRating) &&
                                      "fill-current",
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                              {totalReviews} đánh giá
                            </span>
                          </div>

                          <div className="flex-1 space-y-3">
                            <h4 className="font-bold text-secondary">
                              Cảm nhận từ độc giả
                            </h4>
                            <p className="text-sm text-slate-500 leading-relaxed">
                              Hầu hết độc giả đánh giá cao chất lượng nội dung
                              và hình thức của cuốn sách này.
                            </p>

                            {isAuthenticated && (
                              <button
                                type="button"
                                onClick={() => setActiveTab("write-review")}
                                className="text-primary font-bold text-sm flex items-center gap-2 group"
                              >
                                Viết đánh giá của bạn
                                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div
                          className="max-h-[360px] overflow-y-auto pr-2 space-y-4"
                          style={{ scrollbarGutter: "stable" }}
                        >
                          {reviews.length > 0 ? (
                            reviews.map((r) => (
                              <div
                                key={r.id}
                                className="group p-5 rounded-none border border-slate-100 hover:shadow-none transition-all bg-white"
                              >
                                <div className="flex items-center justify-between mb-4 gap-4">
                                  <div className="flex items-center gap-4 min-w-0">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 shrink-0 shadow-sm">
                                      {r.customer_name?.charAt(0) || "K"}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-sm font-bold text-secondary truncate">
                                        {r.customer_name || "Khách hàng"}
                                      </div>
                                      <div className="flex text-amber-500 text-[10px]">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                          <FiStar
                                            key={s}
                                            className={cn(
                                              s <= r.rating && "fill-current",
                                            )}
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
                                    {r.date}
                                  </span>
                                </div>

                                <p className="text-slate-600 text-sm leading-relaxed">
                                  {r.content || "Sản phẩm tuyệt vời!"}
                                </p>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-12 opacity-40 flex flex-col items-center">
                              <FiStar className="text-4xl mb-2" />
                              <p className="text-sm font-bold uppercase">
                                Chưa có đánh giá nào
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {activeTab === "write-review" && (
                      <motion.div
                        key="write-review"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                      >
                        <form
                          onSubmit={handleReview}
                          className="p-5 md:p-8 bg-white border border-slate-100 rounded-xl shadow-md space-y-6"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                              Mức độ hài lòng của bạn?
                            </span>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  className={cn(
                                    "text-4xl transition-all",
                                    s <= reviewForm.rating
                                      ? "text-amber-500 scale-110"
                                      : "text-slate-100 hover:text-slate-200",
                                  )}
                                  onClick={() =>
                                    setReviewForm((prev) => ({
                                      ...prev,
                                      rating: s,
                                    }))
                                  }
                                >
                                  <FiStar
                                    className={
                                      s <= reviewForm.rating
                                        ? "fill-current"
                                        : ""
                                    }
                                  />
                                </button>
                              ))}
                            </div>
                          </div>

                          <TextArea
                            placeholder="Chia sẻ cảm nhận chi tiết của bạn về cuốn sách này..."
                            value={reviewForm.noi_dung}
                            onChange={(e) =>
                              setReviewForm((prev) => ({
                                ...prev,
                                noi_dung: e.target.value,
                              }))
                            }
                          />

                          <button
                            type="submit"
                            className="w-full btn-dark py-5"
                          >
                            Gửi đánh giá
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveTab("reviews")}
                            className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            Hủy bỏ
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest shrink-0">
        {label}
      </span>
      <span className="text-sm font-bold text-secondary text-right break-words">
        {value || "---"}
      </span>
    </div>
  );
}



