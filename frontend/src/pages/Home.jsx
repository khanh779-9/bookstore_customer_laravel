import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import ProductCard from '../components/Product/ProductCard';
import { FiArrowRight, FiZap, FiStar, FiPackage, FiTrendingUp } from 'react-icons/fi';

const BANNERS = [
  {
    image: '/assets/banners/1600w-iUbywlem9dU.jpg',
    title: 'Khuyến mãi sách học tập',
    desc: 'Giảm đến 50% cho học sinh - sinh viên',
    link: '/products?danhmucSP_id=1'
  },
  {
    image: '/assets/banners/VPBANK-T10-Web1920x450.webp',
    title: 'Văn phòng phẩm siêu tiết kiệm',
    desc: 'Mua càng nhiều - Giá càng rẻ!',
    link: '/products?danhmucSP_id=2'
  },
  {
    image: '/assets/banners/ROHTO_Main-Banner-Web.webp',
    title: 'Flash Sale cuối tuần',
    desc: 'Giảm sốc toàn bộ sách nổi bật',
    link: '/products'
  },
  {
    image: '/assets/banners/banner-fb-post-1800_1200-px_b670871b6d974df8bca2fbfa4dc558f6_1024x1024.png',
    title: 'Sách Kim Đồng',
    desc: 'Ưu đãi lớn giảm 15% đến 70%',
    link: '/products?publisher_id=1'
  }
];

export default function Home() {
  const [data, setData] = useState({
    featuredProducts: [],
    bestSellers: [],
    promotedProducts: [],
    categories: []
  });
  const [loading, setLoading] = useState(true);
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [promotedRes, bestSellersRes, newArrivalsRes, categoriesRes] = await Promise.all([
          api.get('/products?promoted_only=1&limit=8'),
          api.get('/products?sort_by=best_selling&limit=8'),
          api.get('/products?limit=8'),
          api.get('/categories')
        ]);

        setData({
          promotedProducts: promotedRes.data.products || [],
          bestSellers: bestSellersRes.data.products || [],
          featuredProducts: newArrivalsRes.data.products || [],
          categories: categoriesRes.data || []
        });
      } catch (err) {
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const timer = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    </div>
  );

  return (
    <div className="space-y-16 pb-20">
      {/* Banner Carousel */}
      <section className="relative h-[300px] md:h-[450px] overflow-hidden rounded-[2rem] mx-4 mt-4 shadow-2xl group">
        {BANNERS.map((banner, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === activeBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}
          >
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-8 md:px-20">
              <div className={`transition-all duration-700 delay-300 ${index === activeBanner ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 max-w-xl leading-tight">
                  {banner.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-md italic">
                  {banner.desc}
                </p>
                <Link 
                  to={banner.link}
                  className="inline-block bg-primary hover:bg-green-500 text-white font-bold py-3 px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20"
                >
                  Mua sắm ngay
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {BANNERS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveBanner(i)}
              className={`h-2 transition-all rounded-full ${i === activeBanner ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'}`}
            />
          ))}
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/products?danhmucSP_id=1" className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary transition-all group">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <FiPackage />
            </div>
            <span className="font-bold text-gray-700">Sách</span>
          </Link>
          <a href="#promotions" className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary transition-all group">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <FiZap />
            </div>
            <span className="font-bold text-gray-700">Khuyến mãi</span>
          </a>
          <Link to="/products?danhmucSP_id=2" className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <FiTrendingUp />
            </div>
            <span className="font-bold text-gray-700">Văn phòng phẩm</span>
          </Link>
          <a href="#best-sellers" className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary transition-all group">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-500 flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <FiStar />
            </div>
            <span className="font-bold text-gray-700">Bán chạy</span>
          </a>
        </div>
      </section>

      {/* Promoted Products */}
      {data.promotedProducts.length > 0 && (
        <section className="container mx-auto px-4 scroll-mt-24" id="promotions">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <span className="text-red-500"><FiZap /></span>
                Sản phẩm đang khuyến mãi
              </h2>
              <p className="text-gray-500 text-sm italic">Cơ hội vàng để sở hữu những tựa sách hay với giá cực hời</p>
            </div>
            <Link to="/products?promoted_only=1" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Xem tất cả <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {data.promotedProducts.map(product => (
              <ProductCard key={product.sanpham_id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {data.bestSellers.length > 0 && (
        <section className="container mx-auto px-4 scroll-mt-24" id="best-sellers">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <span className="text-yellow-500"><FiStar /></span>
                Bán chạy nhất
              </h2>
              <p className="text-gray-500 text-sm italic">Những sản phẩm được yêu thích nhất trong tuần qua</p>
            </div>
            <Link to="/products?sort_by=best_selling" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Xem tất cả <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {data.bestSellers.map(product => (
              <ProductCard key={product.sanpham_id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products (New Arrivals) */}
      {data.featuredProducts.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <span className="text-primary"><FiPackage /></span>
                Sản phẩm mới
              </h2>
              <p className="text-gray-500 text-sm italic">Cập nhật những tựa sách và văn phòng phẩm mới nhất</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Xem tất cả <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {data.featuredProducts.map(product => (
              <ProductCard key={product.sanpham_id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Grid */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Khám phá theo danh mục</h2>
            <p className="text-gray-500 max-w-xl mx-auto italic">Dễ dàng tìm thấy sản phẩm phù hợp với nhu cầu của bạn</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.categories.map((cat, i) => (
              <Link 
                key={cat.danhmucSP_id} 
                to={`/products?danhmucSP_id=${cat.danhmucSP_id}`}
                className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-xl hover:border-primary hover:-translate-y-1 transition-all group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center text-2xl group-hover:bg-primary group-hover:text-white transition-colors">
                  {i % 2 === 0 ? '📚' : '✏️'}
                </div>
                <h3 className="font-bold text-gray-800 text-sm truncate">{cat.tenDanhMuc}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
