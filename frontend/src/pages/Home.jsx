import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { categoryService } from "../services/categoryService";
import ProductCard from "../components/Product/ProductCard";
import {
  FiArrowRight,
  FiZap,
  FiStar,
  FiPackage,
  FiTrendingUp,
  FiShoppingBag,
  FiBookOpen,
  FiGift,
} from "react-icons/fi";

const BANNERS = [
  {
    image: "/assets/banners/1600w-iUbywlem9dU.jpg",
    title: "Khuyến mãi sách học tập",
    desc: "Giảm đến 50% cho học sinh - sinh viên. Bắt đầu năm học mới với đầy đủ hành trang.",
    link: "/products?danhmucSP_id=1",
    color: "from-blue-600/80 to-blue-900/90",
  },
  {
    image: "/assets/banners/VPBANK-T10-Web1920x450.webp",
    title: "Văn phòng phẩm tiết kiệm",
    desc: "Mua càng nhiều - Giá càng rẻ! Trang bị góc làm việc với những món đồ xinh xắn.",
    link: "/products?danhmucSP_id=2",
    color: "from-emerald-600/80 to-emerald-900/90",
  },
  {
    image: "/assets/banners/ROHTO_Main-Banner-Web.webp",
    title: "Flash Sale cuối tuần",
    desc: "Giảm sốc toàn bộ sách nổi bật. Đừng bỏ lỡ cơ hội sở hữu những tựa sách hay.",
    link: "/products",
    color: "from-purple-600/80 to-purple-900/90",
  },
  {
    image:
      "/assets/banners/banner-fb-post-1800_1200-px_b670871b6d974df8bca2fbfa4dc558f6_1024x1024.png",
    title: "Đại tiệc sách Kim Đồng",
    desc: "Ưu đãi lớn giảm từ 15% đến 70% các dòng truyện tranh, thiếu nhi.",
    link: "/products?publisher_id=1",
    color: "from-red-600/80 to-red-900/90",
  },
];

export default function Home() {
  const [activeBanner, setActiveBanner] = useState(0);

  // Queries
  const { data: promotedProducts = [], isLoading: loadingPromoted } = useQuery({
    queryKey: ["products", "promoted"],
    queryFn: () => productService.getPromotedProducts(8),
  });

  const { data: bestSellers = [], isLoading: loadingBestSellers } = useQuery({
    queryKey: ["products", "bestSellers"],
    queryFn: () => productService.getBestSellers(8),
  });

  const { data: featuredProducts = [], isLoading: loadingFeatured } = useQuery({
    queryKey: ["products", "featured"],
    queryFn: () => productService.getNewArrivals(8),
  });

  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAllCategories(),
  });

  const loading =
    loadingPromoted ||
    loadingBestSellers ||
    loadingFeatured ||
    loadingCategories;

  // Banner timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
          <FiBookOpen className="absolute inset-0 m-auto text-primary text-2xl animate-pulse" />
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50/30 pb-24">
      {/* Hero Banner Section */}
      <section className="relative px-4 pt-6 pb-12 overflow-hidden">
        <div className="container mx-auto">
          <div className="relative h-[380px] md:h-[520px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.18)] group bg-slate-100">
            {BANNERS.map((banner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === activeBanner
                    ? "opacity-100 scale-100 z-10"
                    : "opacity-0 scale-105 z-0"
                }`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Overlay mềm hơn */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center px-6 sm:px-10 md:px-16">
                  <div className="max-w-xl">
                    <div
                      className={`transition-all duration-700 transform ${
                        index === activeBanner
                          ? "translate-y-0 opacity-100 delay-200"
                          : "translate-y-8 opacity-0"
                      }`}
                    >
                      <div className="inline-flex items-center gap-2 mb-4 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        <span className="text-white text-sm font-semibold tracking-wide">
                          Nổi bật hôm nay
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 drop-shadow">
                        {banner.title}
                      </h2>

                      <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-lg mb-7">
                        {banner.desc}
                      </p>

                      <Link
                        to={banner.link}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-slate-900 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl group/btn"
                      >
                        Khám phá ngay
                        <FiArrowRight className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Navigation */}
            <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 rounded-full border border-white/15 bg-black/20 px-3 py-2 backdrop-blur-md">
              {BANNERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBanner(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeBanner
                      ? "w-10 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                      : "w-2.5 bg-white/45 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats/Features */}
      <section className="container mx-auto px-4 -mt-16 relative z-30 mb-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-primary/5 border border-gray-100 p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-gray-100">
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center text-xl mb-3">
              <FiBookOpen />
            </div>
            <h3 className="font-bold text-gray-900">10,000+ Tựa sách</h3>
            <p className="text-xs text-gray-500 mt-1">Đa dạng mọi thể loại</p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-xl mb-3">
              <FiTrendingUp />
            </div>
            <h3 className="font-bold text-gray-900">100% Chính hãng</h3>
            <p className="text-xs text-gray-500 mt-1">Cam kết chất lượng</p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center text-xl mb-3">
              <FiGift />
            </div>
            <h3 className="font-bold text-gray-900">Ưu đãi mỗi ngày</h3>
            <p className="text-xs text-gray-500 mt-1">
              Nhiều mã giảm giá hấp dẫn
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-xl mb-3">
              <FiPackage />
            </div>
            <h3 className="font-bold text-gray-900">Giao hàng toàn quốc</h3>
            <p className="text-xs text-gray-500 mt-1">Nhanh chóng & an toàn</p>
          </div>
        </div>
      </section>

      {/* Promoted Products Section */}
      {promotedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-red-100 text-red-500 flex items-center justify-center shadow-inner">
                  <FiZap className="text-xl" />
                </span>
                Đang Khuyến Mãi
              </h2>
              <p className="text-gray-500 font-medium ml-14">
                Cơ hội vàng săn sách hay giá siêu hời
              </p>
            </div>
            <Link
              to="/products?promoted_only=1"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-50 text-red-600 font-bold hover:bg-red-500 hover:text-white transition-all group"
            >
              Xem tất cả{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {promotedProducts.map((product) => (
              <ProductCard key={product.sanpham_id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className="container mx-auto px-4 py-8 mt-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center shadow-inner">
                  <FiStar className="text-xl" />
                </span>
                Bán Chạy Nhất
              </h2>
              <p className="text-gray-500 font-medium ml-14">
                Những tựa sách được độc giả săn đón nhiều nhất
              </p>
            </div>
            <Link
              to="/products?sort_by=best_selling"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-50 text-yellow-600 font-bold hover:bg-yellow-500 hover:text-white transition-all group"
            >
              Xem tất cả{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.sanpham_id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Explore Categories */}
      <section className="py-16 mt-8 relative overflow-hidden bg-white border-y border-gray-100 shadow-[0_0_40px_rgba(0,0,0,0.02)]">
        {/* Background decors */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">
              Khám Phá Danh Mục
            </h2>
            <p className="text-gray-500 text-lg">
              Tìm kiếm những cuốn sách yêu thích của bạn theo chủ đề, thể loại
              đa dạng và phong phú.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, i) => {
              const icons = ["📚", "✏️", "🎨", "💼", "🎁", "🎓", "📖", "🧩"];
              const colors = [
                "bg-blue-50 text-blue-600 border-blue-100 group-hover:bg-blue-500",
                "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:bg-emerald-500",
                "bg-purple-50 text-purple-600 border-purple-100 group-hover:bg-purple-500",
                "bg-orange-50 text-orange-600 border-orange-100 group-hover:bg-orange-500",
                "bg-pink-50 text-pink-600 border-pink-100 group-hover:bg-pink-500",
                "bg-cyan-50 text-cyan-600 border-cyan-100 group-hover:bg-cyan-500",
              ];
              const colorClass = colors[i % colors.length];
              const icon = icons[i % icons.length];

              return (
                <Link
                  key={cat.danhmucSP_id}
                  to={`/products?danhmucSP_id=${cat.danhmucSP_id}`}
                  className="bg-white p-6 rounded-3xl border border-gray-100 text-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-transparent hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center text-4xl shadow-sm border transition-colors duration-300 ${colorClass}`}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300 group-hover:text-white">
                      {icon}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {cat.tenDanhMuc}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products (New Arrivals) */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-8 mt-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-2 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                  <FiShoppingBag className="text-xl" />
                </span>
                Sản Phẩm Mới
              </h2>
              <p className="text-gray-500 font-medium ml-14">
                Cập nhật ngay những tựa sách mới nhất trên kệ
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/5 text-primary font-bold hover:bg-primary hover:text-white transition-all group"
            >
              Xem tất cả{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.sanpham_id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Call to action */}
      <section className="container mx-auto px-4 mt-16">
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20 relative overflow-hidden">
          {/* Decors */}
          <div className="absolute top-0 right-0 w-full h-full bg-[url('/assets/images/pattern.svg')] opacity-10 pointer-events-none"></div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Đăng ký nhận tin tức mới nhất
            </h2>
            <p className="text-white/80 text-lg mb-0">
              Nhận ngay thông tin về các chương trình khuyến mãi, sự kiện ra mắt
              sách và ưu đãi đặc biệt dành riêng cho bạn.
            </p>
          </div>
          <div className="w-full md:w-auto relative z-10 flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="px-6 py-4 rounded-full min-w-[280px] focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-900 font-medium"
              />
              <button className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors shadow-lg hover:-translate-y-1">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
