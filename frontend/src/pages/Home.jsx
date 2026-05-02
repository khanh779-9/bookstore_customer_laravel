import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { productService } from "../services/productService";
import ProductCard from "../components/Product/ProductCard";
import { useAuth } from "../contexts/AuthContext";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiChevronLeft,
  FiChevronRight,
  FiShield,
  FiStar,
  FiTruck,
  FiZap,
} from "react-icons/fi";
import { Loading } from "@/shared/ui";
import { Input } from "@/shared/ui";

const BANNERS = [
  {
    id: 1,
    title: "Tri Thức Cho Mọi Nhà",
    desc: "Giảm đến 50% cho học sinh - sinh viên toàn quốc.",
    image: "/assets/banners/1600w-iUbywlem9dU.jpg",
    alt: "Banner khuyến mãi tri thức cho mọi nhà",
  },
  {
    id: 2,
    title: "Flash Sale Cuối Tuần",
    desc: "Sách mới đồng giá chỉ từ 49k. Số lượng có hạn!",
    image: "/assets/banners/ROHTO_Main-Banner-Web.webp",
    alt: "Banner flash sale cuối tuần",
  },
  {
    id: 3,
    title: "Sách Kim Đồng",
    desc: "Khám phá những cuốn sách Kim Đồng đã cập bến cửa hàng.",
    image:
      "/assets/banners/banner-fb-post-1800_1200-px_b670871b6d974df8bca2fbfa4dc558f6_1024x1024.png",
    alt: "Banner sách Kim Đồng",
  },
  {
    id: 4,
    title: "Ưu đãi VP Bank",
    desc: "Khám phá những cuốn sách Kim Đồng đã cập bến cửa hàng.",
    image: "/assets/banners/VPBANK-T10-Web1920x450.webp",
    alt: "Banner ưu đãi VP Bank",
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [currentBanner, setCurrentBanner] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const {
    data: discountedProducts = [],
    isLoading: loadingDiscounted,
    isError: discountedError,
  } = useQuery({
    queryKey: ["discounted-products", isAuthenticated],
    queryFn: async () => {
      const res = await productService.getProducts({
        promoted_only: true,
        limit: 8,
      });
      return res.data;
    },
  });

  const {
    data: bestSellers = [],
    isLoading: loadingBestSellers,
    isError: bestSellersError,
  } = useQuery({
    queryKey: ["best-sellers", isAuthenticated],
    queryFn: async () => {
      const res = await productService.getProducts({
        sort_by: "best_selling",
        limit: 8,
      });
      return res.data;
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goPrev = () => {
    setCurrentBanner((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  };

  const goNext = () => {
    setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
  };

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "user" : "never"}>
      <div className="bg-background min-h-screen">
        <main className="container">
          <section className="py-6">
            <div className="mx-auto px-4">
              <h1 className="sr-only">Trang chủ cửa hàng sách</h1>

              <div className="relative aspect-[21/9] md:aspect-[3/1] rounded-[24px] overflow-hidden group shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBanner}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    {/* IMAGE */}
                    <img
                      src={BANNERS[currentBanner].image}
                      alt={BANNERS[currentBanner].alt}
                      className="w-full h-full object-fill"
                      loading="eager"
                    />

                    {/* GRADIENT OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10 md:px-20 text-white">
                      <motion.h2
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-extrabold mb-4 max-w-xl text-white leading-tight"
                      >
                        {BANNERS[currentBanner].title}
                      </motion.h2>

                      <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-sm md:text-lg text-white/85 mb-8 max-w-lg"
                      >
                        {BANNERS[currentBanner].desc}
                      </motion.p>

                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <Link
                          to="/products"
                          className="inline-flex items-center gap-2 px-8 py-3 text-sm uppercase tracking-widest bg-white text-black font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
                        >
                          Khám phá ngay <FiArrowRight />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* LEFT ARROW */}
                <button
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>

                {/* RIGHT ARROW */}
                <button
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:scale-110 hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>

                {/* INDICATOR */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                  {BANNERS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentBanner(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentBanner
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
                <li>
                  <FeatureItem
                    icon={FiTruck}
                    title="Giao hàng nhanh"
                    desc="Toàn quốc 2-3 ngày"
                  />
                </li>
                <li>
                  <FeatureItem
                    icon={FiShield}
                    title="Bảo mật tuyệt đối"
                    desc="Thanh toán an toàn"
                  />
                </li>
                <li>
                  <FeatureItem
                    icon={FiStar}
                    title="Sách chất lượng"
                    desc="Tuyển chọn kỹ lưỡng"
                  />
                </li>
                <li>
                  <FeatureItem
                    icon={FiZap}
                    title="Hỗ trợ 24/7"
                    desc="Giải đáp mọi thắc mắc"
                  />
                </li>
              </ul>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4 max-w-[1600px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-red-500 rounded-none" />
                  <h2 className="text-2xl font-bold text-secondary">
                    Đang khuyến mãi
                  </h2>
                </div>

                <Link
                  to="/products?promoted_only=1"
                  className="text-sm font-bold text-red-500 hover:underline flex items-center gap-1"
                >
                  Xem tất cả <FiArrowRight />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {loadingDiscounted ? (
                  <div className="col-span-full">
                    <Loading message="Đang săn tìm ưu đãi..." />
                  </div>
                ) : discountedError ? (
                  <div className="col-span-full py-10 text-center text-slate-400 font-medium">
                    Không tải được sản phẩm khuyến mãi.
                  </div>
                ) : discountedProducts.length === 0 ? (
                  <div className="col-span-full py-10 text-center text-slate-400 font-medium">
                    Hiện chưa có sản phẩm khuyến mãi mới.
                  </div>
                ) : (
                  discountedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))
                )}
              </div>
            </div>
          </section>

          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="bg-secondary rounded-md overflow-hidden shadow-lg flex flex-col md:flex-row items-center">
                <div className="p-4 md:p-12 flex-1 text-white">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2 block">
                    Flash Sale
                  </span>

                  <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white leading-tight">
                    Đăng ký thành viên - Nhận ngay ưu đãi 20%
                  </h2>

                  <p className="text-slate-300 mb-4 max-w-md">
                    Nhận thông báo về những đầu sách mới nhất và các chương
                    trình khuyến mãi độc quyền chỉ dành cho thành viên.
                  </p>

                  <form
                    className="flex flex-col sm:flex-row items-stretch gap-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <label htmlFor="email" className="sr-only">
                      Email của bạn
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email của bạn..."
                      className="bg-white/10 border border-white/20 rounded-none py-3 px-6 text-sm flex-1 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-white placeholder:text-slate-400"
                      containerClassName="flex-1"
                    />
                    <button
                      type="submit"
                      className="btn-primary whitespace-nowrap"
                    >
                      Đăng ký
                    </button>
                  </form>
                </div>

                <div className="hidden md:block w-1/5 p-6">
                  <div className="aspect-square border-[1.5rem] border-primary/20 flex items-center justify-center p-4 rounded-full">
                    <div className="w-full h-full bg-primary flex items-center justify-center text-white text-4xl font-bold  rounded-full">
                      20%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-12 pb-24">
            <div className="container mx-auto px-4 max-w-[1600px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-amber-500 rounded-none" />
                  <h2 className="text-2xl font-bold text-secondary">
                    Bán chạy nhất
                  </h2>
                </div>

                <Link
                  to="/products?sort_by=best_selling"
                  className="text-sm font-bold text-amber-600 hover:underline flex items-center gap-1"
                >
                  Khám phá tất cả <FiArrowRight />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {loadingBestSellers ? (
                  <div className="col-span-full">
                    <Loading message="Đang liệt kê sách bán chạy..." />
                  </div>
                ) : bestSellersError ? (
                  <div className="col-span-full py-10 text-center text-slate-400 font-medium">
                    Không tải được sản phẩm bán chạy.
                  </div>
                ) : (
                  bestSellers.map((p) => <ProductCard key={p.id} product={p} />)
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}

function FeatureItem({ icon: Icon, title, desc }) {
  return (
    <div
      className="group flex items-center gap-4 p-5 rounded-[16px]
      border border-slate-200/70 bg-white
      shadow-sm hover:shadow-lg hover:-translate-y-1
      transition-all duration-300"
    >
      {/* ICON */}
      <div
        className="w-11 h-11 rounded-[14px]
        bg-gradient-to-br from-slate-50 to-slate-100
        flex items-center justify-center
        text-primary shrink-0
        group-hover:scale-110 transition-transform duration-300"
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>

      {/* TEXT */}
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>

        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
