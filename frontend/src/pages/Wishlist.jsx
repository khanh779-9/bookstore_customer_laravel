import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/Product/ProductCard';
import { Loading } from "@/shared/ui";
import { FiHeart, FiArrowRight, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/wishlist').then(res => {
      // Map sanpham_id to id for ProductCard consistency if needed
      const mappedProducts = (res.data.data || []).map(p => ({
        ...p,
        id: p.id || p.sanpham_id
      }));
      setProducts(mappedProducts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Đang tìm các món đồ bạn yêu thích..." />;

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-none bg-red-50 text-red-500 flex items-center justify-center text-xl shadow-sm">
            <FiHeart />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-secondary serif">Danh sách yêu thích</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              {products.length} sản phẩm đã lưu
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-20"
          >
            <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-none flex items-center justify-center text-4xl mx-auto mb-6">
              <FiShoppingBag />
            </div>
            <h2 className="text-xl font-black text-secondary mb-3">Chưa có sản phẩm yêu thích</h2>
            <p className="text-slate-500 mb-8 text-sm">Bạn chưa lưu sản phẩm nào vào danh sách yêu thích. Hãy khám phá và tìm cho mình những cuốn sách ưng ý nhất.</p>
            <Link to="/products" className="btn-primary px-8 py-3 inline-flex items-center gap-2">
              Khám phá sản phẩm <FiArrowRight />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence>
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}



