import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/Product/ProductCard';
import Loading from '../components/Common/Loading';
import { FiHeart } from 'react-icons/fi';

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/wishlist').then(res => {
      setProducts(res.data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Đang tìm các món đồ bạn yêu thích..." />;

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <h1><FiHeart className="text-danger" /> Danh sách yêu thích</h1>
      </div>

      {products.length === 0 ? (
        <div className="empty-state">
          <FiHeart className="empty-icon" />
          <p>Bạn chưa lưu sản phẩm nào vào danh sách yêu thích.</p>
          <Link to="/products" className="btn-primary">Khám phá sản phẩm</Link>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(p => <ProductCard key={p.sanpham_id} product={p} />)}
        </div>
      )}
    </div>
  );
}



