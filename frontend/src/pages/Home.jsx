import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { productService } from "../services/productService";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight, FiShield, FiStar, FiTruck, FiZap } from "react-icons/fi";
import { Loading, Input } from "@/shared/ui";
import ProductSection from "../components/Product/ProductSection";

const BANNERS = [
  { id: 1, title: "TRI THỨC LÀ SỨC MẠNH", desc: "Giảm đến 50% cho toàn bộ sách giáo khoa và tham khảo.", image: "/assets/banners/1600w-iUbywlem9dU.jpg" },
  { id: 2, title: "FLASH SALE CUỐI TUẦN", desc: "Sách mới đồng giá từ 49k. Chỉ diễn ra trong 48 giờ!", image: "/assets/banners/ROHTO_Main-Banner-Web.webp" },
  { id: 3, title: "THẾ GIỚI TRUYỆN TRANH", desc: "Cập nhật những tập mới nhất từ các nhà xuất bản hàng đầu.", image: "/assets/banners/banner-fb-post-1800_1200-px_b670871b6d974df8bca2fbfa4dc558f6_1024x1024.png" },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [currentBanner, setCurrentBanner] = useState(0);

  // Data Fetching
  const { data: discounted = [], isLoading: loadingDiscounted } = useQuery({
    queryKey: ["discounted-products", isAuthenticated],
    queryFn: async () => (await productService.getProducts({ promoted_only: true, limit: 8 })).data
  });

  const { data: bestSellers = [], isLoading: loadingBestSellers } = useQuery({
    queryKey: ["best-sellers", isAuthenticated],
    queryFn: async () => (await productService.getProducts({ sort_by: "best_selling", limit: 8 })).data
  });

  const { data: newest = [], isLoading: loadingNewest } = useQuery({
    queryKey: ["newest-products", isAuthenticated],
    queryFn: async () => (await productService.getProducts({ sort_by: "newest", limit: 8 })).data
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentBanner(p => (p + 1) % BANNERS.length), 8000);
    return () => clearInterval(timer);
  }, []);

  const moveBanner = useCallback((dir) => {
    setCurrentBanner(p => (p + dir + BANNERS.length) % BANNERS.length);
  }, []);

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Banner Section */}
      <section className="relative h-[400px] md:h-[600px] overflow-hidden bg-slate-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img src={BANNERS[currentBanner].image} className="w-full h-full object-cover opacity-60" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center container mx-auto px-6">
              <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block">Độc quyền tại BookZone</span>
                <h2 className="text-4xl md:text-7xl font-black text-white leading-none mb-6 max-w-4xl uppercase tracking-tighter italic">
                  {BANNERS[currentBanner].title}
                </h2>
                <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-10 font-medium leading-relaxed">
                  {BANNERS[currentBanner].desc}
                </p>
                <Link to="/products" className="inline-flex items-center gap-4 bg-white text-slate-900 px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl">
                  Khám phá bộ sưu tập <FiArrowRight size={20} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Banner Controls */}
        <div className="absolute bottom-10 right-10 flex gap-4 z-20">
          <button onClick={() => moveBanner(-1)} className="w-14 h-14 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"><FiChevronLeft size={24} /></button>
          <button onClick={() => moveBanner(1)} className="w-14 h-14 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all"><FiChevronRight size={24} /></button>
        </div>
      </section>

      {/* Feature Icons */}
      <section className="py-12 border-b border-slate-50">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <Feature icon={FiTruck} title="GIAO HÀNG HỎA TỐC" desc="Nhận sách ngay trong ngày" />
          <Feature icon={FiShield} title="THANH TOÁN AN TOÀN" desc="Bảo mật thông tin 100%" />
          <Feature icon={FiStar} title="SÁCH CHÍNH HÃNG" desc="Tuyển chọn từ NXB uy tín" />
          <Feature icon={FiZap} title="ƯU ĐÃI KHỦNG" desc="Giảm giá lên đến 70%" />
        </div>
      </section>

      {/* Product Sections */}
      <ProductSection 
        title="Sách đang giảm giá" 
        subtitle="Ưu đãi cực lớn dành riêng cho bạn"
        items={discounted} 
        loading={loadingDiscounted} 
        viewAllLink="/products?promoted_only=1"
        color="red"
      />

      <section className="py-20 bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 -skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <span className="text-primary font-black uppercase tracking-widest text-[10px] mb-4 block">Newsletter</span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">Đăng ký nhận <br/> Ưu đãi 20%</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-lg">Đừng bỏ lỡ những đầu sách hay nhất và các chương trình khuyến mãi độc quyền hàng tuần.</p>
              <form className="flex max-w-md bg-white/5 p-1 border border-white/10" onSubmit={e => e.preventDefault()}>
                <input type="email" placeholder="Địa chỉ email của bạn..." className="flex-1 bg-transparent px-6 py-4 text-white outline-none font-bold" />
                <button className="bg-primary text-white px-8 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all">Gửi ngay</button>
              </form>
            </div>
            <div className="hidden lg:block w-96 h-96 border-[40px] border-primary/20 rounded-full flex items-center justify-center">
              <span className="text-9xl font-black text-white/5 select-none tracking-tighter">BOK</span>
            </div>
          </div>
        </div>
      </section>

      <ProductSection 
        title="Sách bán chạy" 
        subtitle="Những tựa sách được yêu thích nhất"
        items={bestSellers} 
        loading={loadingBestSellers} 
        viewAllLink="/products?sort_by=best_selling"
        color="amber"
      />

      <ProductSection 
        title="Sách mới cập bến" 
        subtitle="Vừa lên kệ tại nhà sách"
        items={newest} 
        loading={loadingNewest} 
        viewAllLink="/products?sort_by=newest"
        color="primary"
      />
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-16 h-16 bg-slate-50 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-primary group-hover:text-white transition-all rounded-sm">
        <Icon size={24} />
      </div>
      <h3 className="text-xs font-black text-secondary tracking-widest mb-1">{title}</h3>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{desc}</p>
    </div>
  );
}
