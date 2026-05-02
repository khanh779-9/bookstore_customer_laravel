import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { productService } from "../services/productService";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import api from "../api/client";
import { 
  FiShoppingCart, FiHeart, FiStar, FiMinus, FiPlus, 
  FiChevronRight, FiShield, FiTruck, FiCheckCircle 
} from "react-icons/fi";
import { Loading, Input } from "@/shared/ui";
import { cn } from "../utils/cn";
import ReviewSection from "../components/Product/ReviewSection";
import ProductSpecs from "../components/Product/ProductSpecs";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { data: response, isLoading: loading, error } = useQuery({
    queryKey: ["product", id, isAuthenticated],
    queryFn: () => productService.getProductById(id),
  });

  useEffect(() => {
    if (response?.data) setIsWishlisted(response.data.is_wishlisted || false);
  }, [response]);

  const toggleWishlist = useCallback(async () => {
    if (!isAuthenticated) return showToast("Vui lòng đăng nhập", "error");
    try {
      const res = await api.post("/wishlist/toggle", { sanpham_id: id });
      setIsWishlisted(res.data.added);
      showToast(res.data.message, "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Lỗi xử lý", "error");
    }
  }, [id, isAuthenticated, showToast]);

  if (loading) return <Loading message="Đang mở sách..." />;
  if (error || !response) return <NotFoundView />;

  const product = response.data;
  const meta = response.meta || {};
  const { price = 0, promo_price: promoPrice = price } = product;
  const hasDiscount = promoPrice < price;

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="container mx-auto px-4 pt-6 max-w-7xl">
        <Breadcrumb name={product.display_name || product.name} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left: Images & Info Badges */}
          <div className="lg:col-span-5 space-y-6">
            <ProductImagePanel product={product} hasDiscount={hasDiscount} />
            <TrustBadges />
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-black text-secondary leading-tight uppercase tracking-tight">
                {product.display_name || product.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 border-b border-slate-100 pb-6">
                <StockIndicator stock={product.stock_quantity} />
                <div className="w-px h-8 bg-slate-100 hidden sm:block" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Đã bán</span>
                  <span className="font-bold text-secondary">{product.sold_quantity || 0} bản</span>
                </div>
              </div>
            </div>

            <PricePanel price={price} promoPrice={promoPrice} hasDiscount={hasDiscount} />

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <QuantityPicker 
                value={quantity} 
                onChange={setQuantity} 
                max={product.stock_quantity} 
              />
              <button
                className="flex-1 btn-primary py-5 text-base rounded-sm shadow-xl shadow-primary/10 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale"
                onClick={() => { addToCart(product, quantity); showToast("Đã thêm vào giỏ hàng", "success"); }}
                disabled={product.stock_quantity <= 0}
              >
                <FiShoppingCart className="text-xl" /> Thêm vào giỏ hàng
              </button>
              <button
                onClick={toggleWishlist}
                className={cn(
                  "w-14 h-14 border transition-all flex items-center justify-center shrink-0 rounded-sm",
                  isWishlisted ? "bg-rose-500 border-rose-500 text-white" : "border-slate-200 text-slate-300 hover:text-rose-500 hover:border-rose-200"
                )}
              >
                <FiHeart className={cn("w-7 h-7", isWishlisted && "fill-current")} />
              </button>
            </div>

            {/* Tabs Section */}
            <div className="pt-8">
              <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} totalReviews={meta.total_reviews || 0} />
              <div className="mt-8 min-h-[300px]">
                <AnimatePresence mode="wait">
                  {activeTab === "description" && (
                    <motion.div key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 border border-slate-100 rounded-sm prose max-w-none">
                      <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                        {product.description || "Đang cập nhật nội dung..."}
                      </p>
                    </motion.div>
                  )}
                  {activeTab === "details" && <ProductSpecs key="specs" product={product} />}
                  {activeTab === "reviews" && (
                    <ReviewSection 
                      key="reviews" 
                      productId={id} 
                      reviews={meta.reviews || []} 
                      avgRating={meta.avg_rating || 0} 
                      totalReviews={meta.total_reviews || 0}
                      isAuthenticated={isAuthenticated}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Internal UI Helpers */
const Breadcrumb = ({ name }) => (
  <nav className="flex items-center gap-3 text-xs font-black text-slate-400 mb-8 uppercase tracking-widest overflow-x-auto whitespace-nowrap">
    <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
    <FiChevronRight className="shrink-0" />
    <Link to="/products" className="hover:text-primary transition-colors">Sản phẩm</Link>
    <FiChevronRight className="shrink-0" />
    <span className="text-secondary truncate max-w-[200px]">{name}</span>
  </nav>
);

const ProductImagePanel = ({ product, hasDiscount }) => {
  const discountPercent = hasDiscount ? Math.round(((product.price - product.promo_price) / product.price) * 100) : 0;
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-sm p-8 border border-slate-100 shadow-xl relative aspect-square flex items-center justify-center overflow-hidden">
      <img
        src={product.image?.startsWith("http") ? product.image : `/assets/images/products/${product.image || "defaultProduct.png"}`}
        alt={product.name}
        className="max-w-full max-h-full object-contain relative z-10"
        onError={(e) => { e.target.src = "/assets/images/products/defaultProduct.png"; }}
      />
      {hasDiscount && (
        <div className="absolute top-4 right-4 bg-rose-500 text-white font-black px-4 py-2 rounded-sm shadow-lg rotate-3 z-20 text-xs">
          -{discountPercent}%
        </div>
      )}
    </motion.div>
  );
};

const TrustBadges = () => (
  <div className="grid grid-cols-2 gap-4">
    <div className="p-4 rounded-sm bg-emerald-50/50 border border-emerald-100 flex items-center gap-3">
      <FiShield className="text-emerald-500 text-xl" />
      <span className="text-xs font-black text-emerald-900 uppercase">100% Chính hãng</span>
    </div>
    <div className="p-4 rounded-sm bg-blue-50/50 border border-blue-100 flex items-center gap-3">
      <FiTruck className="text-blue-500 text-xl" />
      <span className="text-xs font-black text-blue-900 uppercase">Giao hàng nhanh</span>
    </div>
  </div>
);

const StockIndicator = ({ stock }) => (
  <div className="flex flex-col">
    <span className="text-xs text-slate-400 font-black uppercase tracking-widest mb-1">Tình trạng</span>
    <div className="flex items-center gap-2">
      <FiCheckCircle className={stock > 0 ? "text-emerald-500" : "text-rose-400"} />
      <span className={cn("font-bold text-sm", stock > 0 ? "text-emerald-600" : "text-rose-500")}>
        {stock > 0 ? `Còn hàng (${stock})` : "Hết hàng"}
      </span>
    </div>
  </div>
);

const PricePanel = ({ price, promoPrice, hasDiscount }) => (
  <div className="bg-slate-900 text-white rounded-sm p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-2xl">
    <div>
      <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-2">Giá niêm yết</span>
      <div className="flex items-baseline gap-4">
        <span className={cn("text-4xl font-black", hasDiscount ? "text-primary" : "text-white")}>
          {promoPrice.toLocaleString("vi-VN")}₫
        </span>
        {hasDiscount && (
          <span className="text-lg text-slate-500 line-through decoration-slate-600 font-bold">
            {price.toLocaleString("vi-VN")}₫
          </span>
        )}
      </div>
    </div>
    {hasDiscount && (
      <div className="bg-primary/20 text-primary border border-primary/30 font-black px-4 py-2 rounded-sm text-[10px] uppercase tracking-widest">
        Tiết kiệm {(price - promoPrice).toLocaleString("vi-VN")}₫
      </div>
    )}
  </div>
);

const QuantityPicker = ({ value, onChange, max }) => (
  <div className="flex items-center bg-white border border-slate-200 rounded-sm p-1 shadow-sm">
    <button onClick={() => onChange(Math.max(1, value - 1))} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"><FiMinus /></button>
    <Input 
      type="number" value={value} 
      onChange={(e) => onChange(Math.max(1, Math.min(max || 99, parseInt(e.target.value) || 1)))} 
      className="w-14 text-center font-black text-lg bg-transparent border-none focus:ring-0 px-0" 
      containerClassName="w-auto"
    />
    <button onClick={() => onChange(Math.min(max || 99, value + 1))} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"><FiPlus /></button>
  </div>
);

const TabsNavigation = ({ activeTab, onTabChange, totalReviews }) => (
  <div className="flex gap-8 border-b border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
    {[
      { id: "description", label: "Mô tả" },
      { id: "details", label: "Thông số" },
      { id: "reviews", label: `Đánh giá (${totalReviews})` },
    ].map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={cn(
          "pb-4 text-xs font-black uppercase tracking-widest relative transition-all cursor-pointer",
          activeTab === tab.id ? "text-primary" : "text-slate-400 hover:text-slate-600"
        )}
      >
        {tab.label}
        {activeTab === tab.id && <motion.div layoutId="tab" className="absolute bottom-0 left-0 w-full h-1 bg-primary" />}
      </button>
    ))}
  </div>
);

const NotFoundView = () => (
  <div className="text-center py-32 max-w-lg mx-auto">
    <div className="text-8xl mb-8 opacity-20">📚</div>
    <h2 className="text-3xl font-black text-secondary mb-4 uppercase tracking-tight">Sản phẩm không tồn tại</h2>
    <p className="text-slate-400 mb-10 font-medium">Cuốn sách bạn tìm kiếm đã bị gỡ bỏ hoặc thông tin không chính xác.</p>
    <Link to="/products" className="btn-dark px-10 py-4 inline-flex">Quay lại cửa hàng</Link>
  </div>
);
