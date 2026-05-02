import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle, FiArrowRight } from "react-icons/fi";
import { useToast } from "../contexts/ToastContext";
import { Input, TextArea, Checkbox } from "@/shared/ui";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", subject: "", message: "", consent: false });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast("Tin nhắn của bạn đã được gửi tới BookZone!", "success");
    setSubmitted(true);
    setForm({ fullName: "", email: "", phone: "", subject: "", message: "", consent: false });
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <span className="text-primary font-black uppercase tracking-[0.4em] text-xs mb-4 block">Kết nối với chúng tôi</span>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none italic mb-8">
              Liên hệ <br/> <span className="text-primary">BookZone</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe mọi ý kiến đóng góp hoặc giải đáp thắc mắc của bạn về sản phẩm và dịch vụ.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Info Side */}
          <div className="lg:col-span-4 space-y-4">
            <ContactInfoCard icon={<FiMapPin />} title="ĐỊA CHỈ TRỤ SỞ" content="180 Cao Lỗ, Phường 4, Quận 8, TP. Hồ Chí Minh" />
            <ContactInfoCard icon={<FiPhone />} title="ĐƯỜNG DÂY NÓNG" content="(+84) 0239 482 958" />
            <ContactInfoCard icon={<FiMail />} title="EMAIL HỖ TRỢ" content="contact@bookzone.vn" />
            <ContactInfoCard icon={<FiClock />} title="GIỜ PHỤC VỤ" content="Thứ 2 - Chủ Nhật: 08:00 - 22:00" />
            
            <div className="bg-white border border-slate-100 p-2 rounded-sm shadow-2xl shadow-slate-200/50 mt-8 aspect-square overflow-hidden group">
               <iframe
                  src="https://www.google.com/maps?q=Trường+Đại+Học+Công+Nghệ+Sài+Gòn&output=embed"
                  className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                ></iframe>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-200 p-8 md:p-16 rounded-sm shadow-2xl shadow-slate-200/50 h-full">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 space-y-8">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-5xl mx-auto border-4 border-emerald-100">
                      <FiCheckCircle />
                    </div>
                    <h3 className="text-3xl font-black text-secondary uppercase tracking-tight">Gửi thành công!</h3>
                    <p className="text-slate-400 font-medium">Cảm ơn bạn đã liên hệ. Đội ngũ của chúng tôi sẽ phản hồi trong vòng 24h làm việc.</p>
                    <button onClick={() => setSubmitted(false)} className="btn-dark px-10 py-4 flex items-center gap-3 mx-auto">
                      Gửi tin nhắn khác <FiArrowRight />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h2 className="text-3xl font-black text-secondary uppercase tracking-tight mb-10 border-b border-slate-50 pb-6">Gửi tin nhắn cho chúng tôi</h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <Input label="HỌ VÀ TÊN" value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder="Nguyễn Văn A" className="bg-slate-50 border-none font-bold" required />
                        <Input label="ĐỊA CHỈ EMAIL" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="example@email.com" className="bg-slate-50 border-none font-bold" required />
                      </div>
                      <div className="grid md:grid-cols-2 gap-8">
                        <Input label="SỐ ĐIỆN THOẠI" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="0123 456 789" className="bg-slate-50 border-none font-bold" />
                        <Input label="TIÊU ĐỀ" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} placeholder="Hỗ trợ đơn hàng..." className="bg-slate-50 border-none font-bold" required />
                      </div>
                      <TextArea label="NỘI DUNG LIÊN HỆ" value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Nhập nội dung bạn muốn nhắn nhủ..." rows={6} className="bg-slate-50 border-none font-bold" required />
                      <Checkbox label="Tôi đồng ý để BookZone lưu trữ thông tin này để liên hệ lại." checked={form.consent} onChange={e => setForm({...form, consent: e.target.checked})} required />
                      <button type="submit" className="w-full bg-slate-900 text-white py-6 font-black uppercase text-xs tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-primary transition-all shadow-xl shadow-slate-200">
                        <FiSend size={20} /> GỬI TIN NHẮN NGAY
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactInfoCard({ icon: Icon, title, content }) {
  return (
    <div className="bg-white border border-slate-100 p-8 rounded-sm shadow-xl shadow-slate-200/50 flex items-start gap-6 group hover:border-primary transition-all">
      <div className="w-14 h-14 bg-slate-50 text-slate-300 flex items-center justify-center text-2xl rounded-sm group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
        <Icon />
      </div>
      <div>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-sm font-black text-secondary leading-relaxed uppercase tracking-tight">{content}</p>
      </div>
    </div>
  );
}
