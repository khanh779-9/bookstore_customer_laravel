
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import toast from 'react-hot-toast';
import api from '../../api/client';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  // Nếu product có isWishlisted thì dùng, nếu không thì mặc định false
  const [isWishlisted, setIsWishlisted] = useState(!!product.isWishlisted);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  const name = product?.sach?.tenSach || product?.van_phong_pham?.tenVPP || product?.ten_hien_thi || `SP #${product.sanpham_id}`;
  const price = parseFloat(product.gia) || 0;
  const image = product.hinhanh || 'placeholder.jpg';
  const stock = product.soluongton || 0;

  // Calculate discount
  const activePromotion = product.promotions && product.promotions[0];
  const discountPercent = activePromotion ? parseFloat(activePromotion.pivot.tilegiamgia) : 0;
  const discountedPrice = discountPercent > 0 ? price * (1 - discountPercent / 100) : price;


  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.sanpham_id, 1);
    toast.success('Đã thêm vào giỏ hàng');
  };

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    if (loadingWishlist) return;
    setLoadingWishlist(true);
    try {
      const res = await api.post('/wishlist/toggle', { sanpham_id: product.sanpham_id });
      setIsWishlisted(!!res.data.added);
      toast.success(res.data.message || (res.data.added ? 'Đã thêm vào yêu thích' : 'Đã bỏ khỏi yêu thích'));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Lỗi thao tác yêu thích');
    } finally {
      setLoadingWishlist(false);
    }
  };

  return (
    <div className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col relative">
      {/* Wishlist Heart Icon */}
      <button
        className={`absolute top-2 left-2 z-20 p-2 rounded-full border-2 ${isWishlisted ? 'bg-red-100 border-red-200 text-red-500' : 'bg-white border-gray-200 text-gray-400'} hover:bg-red-50 hover:text-red-500 transition-all`}
        style={{ outline: 'none' }}
        onClick={handleToggleWishlist}
        disabled={loadingWishlist}
        title={isWishlisted ? 'Bỏ khỏi yêu thích' : 'Thêm vào yêu thích'}
      >
        <FiHeart className="w-5 h-5" />
      </button>
      <Link to={`/products/${product.sanpham_id}`} className="relative block h-48 sm:h-56 overflow-hidden bg-gray-50">
        <img 
          src={`/assets/images/${image}`} 
          alt={name} 
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = '/assets/images/products/defaultProduct.png'; }} 
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10">
            -{discountPercent}%
          </span>
        )}

        {stock <= 5 && stock > 0 && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10">
            Chỉ còn {stock}
          </span>
        )}

        {stock <= 0 && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <span className="bg-white/90 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">Hết hàng</span>
          </div>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-grow space-y-2">
        <Link 
          to={`/products/${product.sanpham_id}`} 
          className="text-sm font-bold text-gray-800 hover:text-primary line-clamp-2 min-h-[40px] transition-colors"
        >
          {name}
        </Link>
        
        <div className="space-y-1">
          {discountPercent > 0 ? (
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 line-through">
                {price.toLocaleString('vi-VN')}₫
              </span>
              <span className="text-red-500 font-black text-lg">
                {discountedPrice.toLocaleString('vi-VN')}₫
              </span>
            </div>
          ) : (
            <span className="text-primary font-black text-lg">
              {price.toLocaleString('vi-VN')}₫
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="text-[10px] text-gray-400">Đã bán: <span className="text-gray-600 font-bold">{product.soluongban || 0}</span></div>
          <button 
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={`p-2 rounded-lg transition-all ${stock > 0 ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            title="Thêm vào giỏ hàng"
          >
            <FiShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
