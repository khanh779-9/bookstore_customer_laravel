import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ProductCard from '../components/Product/ProductCard';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiHeart, FiStar, FiMinus, FiPlus, FiChevronRight, FiGift, FiShield, FiTruck, FiRefreshCw, FiArrowRight } from 'react-icons/fi';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, binhluan: '' });

  useEffect(() => {
    setLoading(true);
    api.get(`/products/${id}`).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  );
  
  if (!data) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800">Không tìm thấy sản phẩm.</h2>
      <Link to="/products" className="text-primary hover:underline mt-4 inline-block">Quay lại cửa hàng</Link>
    </div>
  );

  const { product, reviews = [], avgRating = 0, totalReviews = 0, relatedProducts = [] } = data;
  const name = product?.sach?.tenSach || product?.van_phong_pham?.tenVPP || product?.ten_hien_thi || '';
  const price = parseFloat(product.gia) || 0;
  
  // Calculate discount
  const activePromotion = product.promotions && product.promotions[0];
  const discountPercent = activePromotion ? parseFloat(activePromotion.pivot.tilegiamgia) : 0;
  const discountedPrice = discountPercent > 0 ? price * (1 - discountPercent / 100) : price;

  const handleAddToCart = () => {
    addToCart(product.sanpham_id, quantity);
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/products/${id}/reviews`, reviewForm);
      toast.success('Đánh giá đã được ghi nhận!');
      const res = await api.get(`/products/${id}`);
      setData(res.data);
      setReviewForm({ rating: 5, binhluan: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi gửi đánh giá');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
        <FiChevronRight className="shrink-0 w-3 h-3" />
        <Link to="/products" className="hover:text-primary transition-colors">Sản phẩm</Link>
        <FiChevronRight className="shrink-0 w-3 h-3" />
        <span className="text-gray-900 font-bold truncate max-w-[200px]">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Image Section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-center justify-center min-h-[400px] relative overflow-hidden group">
            <img 
              src={`/assets/images/${product.hinhanh}`} 
              alt={name} 
              className="max-w-full max-h-[500px] object-contain transition-transform duration-700 group-hover:scale-110"
              onError={(e) => { e.target.src = '/assets/images/products/defaultProduct.png'; }} 
            />
            {discountPercent > 0 && (
              <span className="absolute top-6 right-6 bg-red-500 text-white font-black px-4 py-2 rounded-full shadow-xl">
                -{discountPercent}%
              </span>
            )}
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h6 className="font-black text-gray-900 flex items-center gap-2">
              <FiGift className="text-primary" /> Chính sách ưu đãi
            </h6>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <FiTruck className="text-green-500" /> Miễn phí giao hàng cho đơn từ 300k
              </li>
              <li className="flex items-center gap-3">
                <FiRefreshCw className="text-blue-500" /> Đổi trả trong vòng 7 ngày
              </li>
              <li className="flex items-center gap-3">
                <FiShield className="text-purple-500" /> Cam kết sản phẩm chính hãng 100%
              </li>
            </ul>
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">{name}</h1>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  {[1,2,3,4,5].map(s => (
                    <FiStar key={s} className={`w-5 h-5 ${s <= Math.round(avgRating) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-400">({totalReviews} nhận xét)</span>
              </div>
              <div className="h-4 w-[1px] bg-gray-200 hidden sm:block"></div>
              <div className="text-sm">
                <span className="text-gray-400">Đã bán: </span>
                <span className="font-bold text-gray-900">{product.soluongban || 0}</span>
              </div>
              <div className={`text-sm font-bold px-3 py-1 rounded-full ${product.soluongton > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                {product.soluongton > 0 ? `Sẵn hàng (${product.soluongton})` : 'Hết hàng'}
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            {discountPercent > 0 ? (
              <>
                <span className="text-4xl font-black text-red-500">{discountedPrice.toLocaleString('vi-VN')}₫</span>
                <span className="text-xl text-gray-400 line-through">{price.toLocaleString('vi-VN')}₫</span>
              </>
            ) : (
              <span className="text-4xl font-black text-primary">{price.toLocaleString('vi-VN')}₫</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 py-6 border-y border-gray-100">
            <div className="flex justify-between py-2 border-b border-gray-50 md:border-none">
              <span className="text-gray-400">Mã sản phẩm:</span>
              <span className="font-bold text-gray-800">{product.sanpham_id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-50 md:border-none">
              <span className="text-gray-400">Nhà cung cấp:</span>
              <span className="font-bold text-gray-800">{product.nhacungcap?.tenNhaCungCap || 'Đang cập nhật'}</span>
            </div>
            {product.sach && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-50 md:border-none">
                  <span className="text-gray-400">Tác giả:</span>
                  <span className="font-bold text-gray-800">{product.sach.tac_gia || 'Nhiều tác giả'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50 md:border-none">
                  <span className="text-gray-400">Nhà xuất bản:</span>
                  <span className="font-bold text-gray-800">{product.sach.nhaxuatban?.tenNhaXuatBan || 'Đang cập nhật'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-50 md:border-none">
                  <span className="text-gray-400">Năm xuất bản:</span>
                  <span className="font-bold text-gray-800">{product.sach.namXB || 'Đang cập nhật'}</span>
                </div>
              </>
            )}
            <div className="flex justify-between py-2 border-b border-gray-50 md:border-none">
              <span className="text-gray-400">Danh mục:</span>
              <span className="font-bold text-gray-800">{product.danh_muc_san_pham?.tenDanhMuc || 'Khác'}</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Mô tả sản phẩm</h3>
            <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">
              {product.mo_ta || 'Đang cập nhật thông tin mô tả cho sản phẩm này.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FiMinus />
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                className="w-12 text-center font-black text-lg focus:outline-none"
                min="1" 
              />
              <button 
                onClick={() => setQuantity(Math.min(product.soluongton || 99, quantity + 1))}
                className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
              >
                <FiPlus />
              </button>
            </div>
            
            <button 
              className="flex-1 bg-primary hover:bg-green-500 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:translate-y-0 disabled:bg-gray-200 disabled:shadow-none"
              onClick={handleAddToCart} 
              disabled={product.soluongton <= 0}
            >
              <FiShoppingCart className="text-xl" /> THÊM VÀO GIỎ HÀNG
            </button>

            <button className="w-14 h-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all">
              <FiHeart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews & Related */}
      <div className="space-y-20">
        {/* Tabs or Sections */}
        <section className="bg-white rounded-[2rem] p-8 md:p-12 border border-gray-100 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-8">
              <h2 className="text-2xl font-black text-gray-900">Đánh giá từ độc giả</h2>
              <div className="bg-gray-50 p-8 rounded-3xl text-center space-y-4">
                <div className="text-6xl font-black text-primary">{avgRating.toFixed(1)}</div>
                <div className="flex justify-center text-yellow-400 gap-1 text-xl">
                  {[1,2,3,4,5].map(s => <FiStar key={s} className={`w-6 h-6 ${s <= Math.round(avgRating) ? 'fill-current' : 'text-gray-200'}`} />)}
                </div>
                <div className="text-gray-500 font-bold">{totalReviews} nhận xét</div>
              </div>

              {isAuthenticated && (
                <div className="space-y-6">
                  <h3 className="font-bold text-gray-800">Chia sẻ trải nghiệm của bạn</h3>
                  <form onSubmit={handleReview} className="space-y-4">
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(s => (
                        <button 
                          key={s} 
                          type="button" 
                          className={`text-3xl transition-transform hover:scale-110 ${s <= reviewForm.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                          onClick={() => setReviewForm(prev => ({ ...prev, rating: s }))}
                        >
                          <FiStar className={s <= reviewForm.rating ? 'fill-current' : ''} />
                        </button>
                      ))}
                    </div>
                    <textarea 
                      className="w-full p-5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all resize-none text-sm"
                      placeholder="Nội dung đánh giá..."
                      rows="4"
                      value={reviewForm.binhluan}
                      onChange={e => setReviewForm(prev => ({ ...prev, binhluan: e.target.value }))}
                    />
                    <button type="submit" className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-colors">
                      Gửi đánh giá ngay
                    </button>
                  </form>
                </div>
              )}
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map(r => (
                    <div key={r.danhgia_id} className="p-8 bg-gray-50/50 rounded-3xl border border-gray-50 space-y-4 transition-all hover:bg-white hover:shadow-md hover:border-gray-100">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                            <img src="/assets/images/avatar-default.png" alt="Avatar" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">Khách hàng #{r.khachhang_id}</div>
                            <div className="flex text-yellow-400 text-xs">
                              {[1,2,3,4,5].map(s => <FiStar key={s} className={`w-3 h-3 ${s <= r.rating ? 'fill-current' : 'text-gray-200'}`} />)}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(r.ngaytao).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed italic">"{r.binhluan || 'Sản phẩm tuyệt vời, đóng gói cẩn thận, giao hàng nhanh.'}"</p>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-300">
                    <FiStar className="text-6xl mb-4" />
                    <p className="font-bold">Chưa có đánh giá nào</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900">Sản phẩm cùng danh mục</h2>
              <Link to={`/products?danhmucSP_id=${product.danhmucSP_id}`} className="text-primary font-bold hover:underline flex items-center gap-2">
                Xem thêm <FiArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {relatedProducts.map(p => <ProductCard key={p.sanpham_id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
