import { FiBookOpen, FiShield, FiHeart, FiMapPin, FiGlobe, FiStar, FiZap, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-slate-900">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.5 }}
          src="/assets/images/about_background.png"
          alt="About Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-6">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block">Về chúng tôi</span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none uppercase italic">
              Khai nguồn <br/> <span className="text-primary">Sáng tạo</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-medium mb-12">
              BookZone không chỉ là một nhà sách, chúng tôi là trạm dừng chân cho những tâm hồn yêu tri thức và sự sáng tạo.
            </p>
            <Link to="/products" className="inline-flex items-center gap-4 bg-white text-slate-900 px-10 py-5 font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-2xl">
              Khám Phá Sản Phẩm <FiArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="w-20 h-1.5 bg-primary"></div>
            <h2 className="text-4xl md:text-6xl font-black text-secondary uppercase tracking-tighter leading-none">Sứ mệnh mang <br/> Tri thức tới mọi nhà</h2>
            <p className="text-lg text-slate-500 leading-relaxed font-medium">
              Chào mừng đến với BookZone, nơi mỗi sản phẩm không chỉ là một công cụ mà còn là nguồn cảm hứng cho sự sáng tạo và học hỏi. Chúng tôi tin rằng những vật dụng nhỏ bé trên bàn làm việc có sức mạnh to lớn để biến ý tưởng thành hiện thực.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-10 space-y-4">
              <h3 className="text-4xl font-black text-slate-200">01.</h3>
              <p className="font-black text-secondary uppercase tracking-widest text-xs">Chất lượng tuyển chọn</p>
            </div>
            <div className="bg-slate-900 p-10 space-y-4 text-white">
              <h3 className="text-4xl font-black text-white/10">02.</h3>
              <p className="font-black text-primary uppercase tracking-widest text-xs">Giao hàng hỏa tốc</p>
            </div>
            <div className="bg-primary p-10 space-y-4 text-white">
              <h3 className="text-4xl font-black text-white/20">03.</h3>
              <p className="font-black text-white uppercase tracking-widest text-xs">Hỗ trợ tận tâm</p>
            </div>
            <div className="bg-slate-50 p-10 space-y-4">
              <h3 className="text-4xl font-black text-slate-200">04.</h3>
              <p className="font-black text-secondary uppercase tracking-widest text-xs">Giá trị bền vững</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black text-secondary uppercase tracking-tighter italic">Hành trình phát triển</h2>
            <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em] mt-4">Từ một cửa hàng nhỏ đến chuỗi cung ứng toàn quốc</p>
          </div>

          <div className="relative space-y-20 before:absolute before:left-1/2 before:top-0 before:bottom-0 before:w-px before:bg-slate-200 before:hidden md:before:block">
            {[
              { year: "2015", title: "Khởi đầu đam mê", desc: "Cửa hàng nhỏ đầu tiên ra đời từ niềm đam mê về giấy và bút, mang đến những sản phẩm chọn lọc.", icon: <FiBookOpen /> },
              { year: "2018", title: "Vươn mình mạnh mẽ", desc: "Mở rộng quy mô phục vụ nhiều khách hàng hơn, giới thiệu dòng sản phẩm độc quyền.", icon: <FiMapPin /> },
              { year: "2020", title: "Chuyển đổi số", desc: "Ra mắt hệ thống website BookZone, giúp mua sắm tiện lợi hơn bao giờ hết.", icon: <FiGlobe /> },
              { year: "2024", title: "Định vị dẫn đầu", desc: "Tổ chức các sự kiện workshop, tạo sân chơi gắn kết cộng đồng yêu sách.", icon: <FiStar /> },
            ].map((item, i) => (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                key={i} className={cn("flex flex-col md:flex-row items-center gap-10 md:gap-20", i % 2 !== 0 && "md:flex-row-reverse")}>
                <div className="flex-1 text-center md:text-right">
                  <div className={cn("inline-block px-6 py-2 bg-slate-900 text-white font-black text-2xl mb-4", i % 2 !== 0 && "md:text-left")}>{item.year}</div>
                  <h3 className="text-xl font-black text-secondary uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm ml-auto mr-auto md:mr-0">{item.desc}</p>
                </div>
                <div className="w-16 h-16 bg-primary text-white flex items-center justify-center text-2xl rounded-full shadow-2xl z-10 border-4 border-white shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <ValueCard icon={<FiShield />} title="Chất Lượng" desc="Tuyển chọn khắt khe từ những NXB uy tín nhất toàn cầu." />
          <ValueCard icon={<FiZap />} title="Sáng Tạo" desc="Luôn cập nhật những đầu sách và văn phòng phẩm độc đáo." />
          <ValueCard icon={<FiHeart />} title="Tận Tâm" desc="Hỗ trợ khách hàng 24/7 với tất cả lòng nhiệt thành." />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        <div className="relative z-10 space-y-10">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">Sẵn sàng để khai phá <br/> tri thức?</h2>
          <Link to="/products" className="btn-primary px-16 py-6 text-sm">BẮT ĐẦU NGAY BÂY GIỜ</Link>
        </div>
      </section>
    </div>
  );
}

function ValueCard({ icon, title, desc }) {
  return (
    <div className="p-12 border border-slate-100 text-center hover:border-primary transition-all group">
      <div className="w-20 h-20 mx-auto mb-10 bg-slate-50 text-slate-300 flex items-center justify-center text-4xl group-hover:bg-primary group-hover:text-white transition-all rounded-sm shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-black text-secondary uppercase tracking-widest mb-4">{title}</h3>
      <p className="text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}
