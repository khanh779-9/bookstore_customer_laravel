import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { productService } from '../services/productService';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/Product/ProductCard';
import toast from 'react-hot-toast';
import api from '../api/client';
import { 
  FiShoppingCart, FiHeart, FiStar, FiMinus, FiPlus, 
  FiChevronRight, FiGift, FiShield, FiTruck, 
  FiRefreshCw, FiArrowRight, FiCheckCircle 
} from 'react-icons/fi';
import { cn } from '../utils/cn';

export default function ProductDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, noi_dung: '' });
  const [activeTab, setActiveTab] = useState('description');

  const { data: response, isLoading: loading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-slate-400 font-medium animate-pulse">Đang tải tri thức...</p>
    </div>
  );
  
  if (error || !response) return (
    <div className="text-center py-32 bg-white rounded-[3rem] my-12 shadow-sm border border-slate-100 mx-4">
      <div className="text-6xl mb-6">📚</div>
      <h2 className="text-3xl font-black text-secondary mb-4 serif">Không tìm thấy sản phẩm</h2>
      <p className="text-slate-500 mb-8">Cuốn sách bạn tìm kiếm có thể đã tạm hết hàng hoặc không tồn tại.</p>
      <Link to="/products" className="btn-primary">Quay lại cửa hàng</Link>
    </div>
  );

  // Extract from standardized API Resource response
  const product = response.data;
  const meta = response.meta || {};
  const reviews = meta.reviews || [];
  const avgRating = meta.avg_rating || 0;
  const totalReviews = meta.total_reviews || 0;
  
  const name = product.display_name || product.name || '';
  const price = product.price || 0;
  const promoPrice = product.promo_price || price;
  const hasDiscount = promoPrice < price;
  const discountPercent = hasDiscount ? Math.round(((price - promoPrice) / price) * 100) : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${id}/reviews`, reviewForm);
      toast.success('Cảm ơn bạn đã đánh giá!');
      queryClient.invalidateQueries(['product', id]);
      setReviewForm({ rating: 5, noi_dung: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi gửi đánh giá');
    }
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      <div className="container mx-auto px-4 pt-8 max-w-7xl">
        {/* Breadcrumb - Minimal & Clean */}
        <nav className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-12 uppercase tracking-widest overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <FiChevronRight className="shrink-0" />
          <Link to="/products" className="hover:text-primary transition-colors">Sản phẩm</Link>
          <FiChevronRight className="shrink-0" />
          <span className="text-secondary truncate max-w-[200px]">{name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Left Side: Media */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-premium flex items-center justify-center aspect-square relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 to-transparent opacity-50"></div>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src={product.image?.startsWith('http') ? product.image : `/assets/images/products/${product.image}`} 
                alt={name} 
                className="max-w-full max-h-full object-contain relative z-10"
                onError={(e) => { e.target.src = '/assets/images/products/defaultProduct.png'; }} 
              />
              {hasDiscount && (
                <div className="absolute top-8 right-8 bg-red-500 text-white font-black px-5 py-2 rounded-2xl shadow-xl shadow-red-500/20 rotate-12">
                  -{discountPercent}%
                </div>
              )}
            </motion.div>
            
            {/* Trust Badges - More Premium */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-100 flex flex-col gap-3">
                <FiShield className="text-emerald-500 text-2xl" />
                <span className="text-sm font-bold text-emerald-900">100% Chính hãng</span>
              </div>
              <div className="p-5 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col gap-3">
                <FiTruck className="text-blue-500 text-2xl" />
                <span className="text-sm font-bold text-blue-900">Giao hàng nhanh</span>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                    {product.category_name}
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                    <FiStar className="fill-current" />
                    <span>{avgRating.toFixed(1)} / 5</span>
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-black text-secondary leading-tight serif">{name}</h1>
                
                <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Tình trạng</span>
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className={cn(product.stock_quantity > 0 ? "text-emerald-500" : "text-red-400")} />
                      <span className={cn("text-sm font-bold", product.stock_quantity > 0 ? "text-emerald-600" : "text-red-500")}>
                        {product.stock_quantity > 0 ? `Còn hàng (${product.stock_quantity})` : 'Hết hàng'}
                      </span>
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-slate-100"></div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Đã bán</span>
                    <span className="text-sm font-bold text-secondary">{product.sold_quantity || 0} bản</span>
                  </div>
                </div>
              </div>

              {/* Pricing Section - Clean & Bold */}
              <div className="bg-slate-50 rounded-[2rem] p-8 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Giá hiện tại</span>
                  <div className="flex items-baseline gap-4">
                    <span className={cn("text-4xl font-black", hasDiscount ? "text-red-500" : "text-secondary")}>
                      {promoPrice.toLocaleString('vi-VN')}₫
                    </span>
                    {hasDiscount && (
                      <span className="text-lg text-slate-400 line-through decoration-slate-300 font-medium">
                        {price.toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>
                </div>
                {hasDiscount && (
                  <div className="bg-red-100 text-red-600 font-black px-4 py-2 rounded-2xl text-sm">
                    Tiết kiệm {(price - promoPrice).toLocaleString('vi-VN')}₫
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 shadow-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                    className="w-14 text-center font-black text-xl focus:outline-none bg-transparent"
                  />
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock_quantity || 99, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-slate-50 text-slate-500 transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
                
                <button 
                  className="flex-grow btn-primary py-5 text-base shadow-xl shadow-primary/20"
                  onClick={handleAddToCart} 
                  disabled={product.stock_quantity <= 0}
                >
                  <FiShoppingCart className="text-xl" />
                  THÊM VÀO GIỎ HÀNG
                </button>

                <button className="w-16 h-16 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all group">
                  <FiHeart className="w-6 h-6 group-hover:fill-current" />
                </button>
              </div>

              {/* Information Tabs */}
              <div className="pt-10">
                <div className="flex gap-8 border-b border-slate-100 mb-8 overflow-x-auto scrollbar-hide">
                  {[
                    { id: 'description', label: 'Mô tả' },
                    { id: 'details', label: 'Thông tin chi tiết' },
                    { id: 'reviews', label: `Đánh giá (${totalReviews})` }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "pb-4 text-sm font-black uppercase tracking-widest relative transition-colors",
                        activeTab === tab.id ? "text-secondary" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div layoutId="tab-active" className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="min-h-[200px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'description' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="text-slate-500 leading-relaxed whitespace-pre-line"
                      >
                        {product.description || 'Đang cập nhật thông tin mô tả...'}
                      </motion.div>
                    )}
                    {activeTab === 'details' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        <DetailRow label="Mã sản phẩm" value={`#${product.id}`} />
                        <DetailRow label="Nhà cung cấp" value={product.provider} />
                        <DetailRow label="Đơn vị tính" value={product.unit} />
                        {product.book_details && (
                          <>
                            <DetailRow label="Tác giả" value={product.book_details.author_name} />
                            <DetailRow label="Nhà xuất bản" value={product.book_details.publisher_name} />
                            <DetailRow label="Năm xuất bản" value={product.book_details.publish_year} />
                          </>
                        )}
                      </motion.div>
                    )}
                    {activeTab === 'reviews' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="space-y-10"
                      >
                        {/* Review Summary */}
                        <div className="flex flex-col md:flex-row items-center gap-10 p-10 bg-slate-50 rounded-[2.5rem]">
                          <div className="text-center md:border-r border-slate-200 pr-10">
                            <div className="text-6xl font-black text-secondary mb-2 serif">{avgRating.toFixed(1)}</div>
                            <div className="flex justify-center text-amber-500 gap-1 mb-2">
                              {[1,2,3,4,5].map(s => <FiStar key={s} className={cn("w-5 h-5", s <= Math.round(avgRating) && "fill-current")} />)}
                            </div>
                            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{totalReviews} đánh giá</span>
                          </div>
                          <div className="flex-grow space-y-4">
                            <h4 className="font-bold text-secondary">Cảm nhận từ độc giả</h4>
                            <p className="text-sm text-slate-500 italic">"Hầu hết độc giả đánh giá cao chất lượng nội dung và hình thức của cuốn sách này."</p>
                            {isAuthenticated && (
                              <button onClick={() => setActiveTab('write-review')} className="text-primary font-bold text-sm flex items-center gap-2 group">
                                Viết đánh giá của bạn <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Review List */}
                        <div className="space-y-8">
                          {reviews.length > 0 ? reviews.map(r => (
                            <div key={r.id} className="group p-6 hover:bg-white hover:shadow-premium rounded-3xl transition-all border border-transparent hover:border-slate-50">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-400">
                                    {r.customer_name?.charAt(0) || 'K'}
                                  </div>
                                  <div>
                                    <div className="text-sm font-black text-secondary">{r.customer_name || 'Khách hàng'}</div>
                                    <div className="flex text-amber-500 text-[10px]">
                                      {[1,2,3,4,5].map(s => <FiStar key={s} className={cn(s <= r.rating && "fill-current")} />)}
                                    </div>
                                  </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{r.date}</span>
                              </div>
                              <p className="text-slate-600 text-sm leading-relaxed">{r.content || 'Sản phẩm tuyệt vời!'}</p>
                            </div>
                          )) : (
                            <div className="text-center py-10 opacity-30 flex flex-col items-center">
                              <FiStar className="text-4xl mb-2" />
                              <p className="text-sm font-bold uppercase">Chưa có đánh giá nào</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    {activeTab === 'write-review' && (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <form onSubmit={handleReview} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-premium space-y-8">
                          <div className="flex flex-col items-center gap-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mức độ hài lòng của bạn?</span>
                            <div className="flex gap-3">
                              {[1,2,3,4,5].map(s => (
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
                          <textarea 
                            className="input-premium resize-none min-h-[150px]"
                            placeholder="Chia sẻ cảm nhận chi tiết của bạn về cuốn sách này..."
                            value={reviewForm.noi_dung}
                            onChange={e => setReviewForm(prev => ({ ...prev, noi_dung: e.target.value }))}
                          />
                          <button type="submit" className="w-full btn-dark py-5">Gửi đánh giá</button>
                          <button type="button" onClick={() => setActiveTab('reviews')} className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">Hủy bỏ</button>
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
    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-50 shadow-sm">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-bold text-secondary text-right">{value || '---'}</span>
    </div>
  );
}
