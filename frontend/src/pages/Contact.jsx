import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    toast.success('Tin nhắn đã được gửi thành công!');
    setSubmitted(true);
    setForm({ fullName: '', email: '', phone: '', subject: '', message: '', consent: false });
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 italic tracking-tight">Liên hệ với chúng tôi</h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto italic">
          Chúng tôi luôn sẵn lòng lắng nghe! Đừng ngần ngại liên hệ nếu bạn có bất kỳ câu hỏi hay góp ý nào.
        </p>
        <div className="w-24 h-2 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100 h-full">
            <h2 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-3">
              <span className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center"><FiMapPin /></span>
              Thông tin cửa hàng
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <FiMapPin />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-1">Địa chỉ</h3>
                  <p className="text-gray-500 italic">180 Cao Lỗ, Quận 8, TP.HCM</p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <FiPhone />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-1">Điện thoại</h3>
                  <a href="tel:0239482958" className="text-gray-500 hover:text-primary transition-colors italic font-bold">(+84) 0239 482 958</a>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <FiMail />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-1">Email</h3>
                  <a href="mailto:contact@bookzone.vn" className="text-gray-500 hover:text-primary transition-colors italic font-bold">contact@bookzone.vn</a>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <FiClock />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-sm uppercase tracking-widest mb-1">Giờ làm việc</h3>
                  <p className="text-gray-500 italic font-bold">Thứ Hai - Chủ Nhật: 8:00 - 22:00</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100">
              <h3 className="font-black text-gray-900 mb-6 italic">Tìm chúng tôi trên bản đồ</h3>
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-gray-200 aspect-video relative group">
                <iframe
                  src="https://www.google.com/maps?q=Trường+Đại+Học+Công+Nghệ+Sài+Gòn+180+Cao+Lỗ+Quận+8+TP.HCM&output=embed"
                  title="Bản đồ cửa hàng"
                  className="absolute inset-0 w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black text-gray-900 mb-10 flex items-center gap-3 italic">
              <FiSend className="text-primary" /> Gửi tin nhắn cho chúng tôi
            </h2>

            {submitted ? (
              <div className="py-20 text-center space-y-6">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto animate-bounce">
                  <FiCheckCircle />
                </div>
                <h3 className="text-2xl font-black text-gray-900 italic">Gửi tin nhắn thành công!</h3>
                <p className="text-gray-500 italic">Cảm ơn bạn đã quan tâm. Chúng tôi sẽ phản hồi trong vòng 24h làm việc.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-gray-900 text-white font-black py-4 px-10 rounded-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Gửi thêm tin nhắn khác
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Họ và tên</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold placeholder:font-medium"
                      placeholder="Nhập họ và tên của bạn"
                      value={form.fullName}
                      onChange={e => setForm({...form, fullName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Email</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold placeholder:font-medium"
                      placeholder="your.email@example.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Số điện thoại</label>
                    <input 
                      type="tel" 
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold placeholder:font-medium"
                      placeholder="0123 456 789"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 ml-1">Tiêu đề</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold placeholder:font-medium"
                      placeholder="Ví dụ: Hỏi về đơn hàng..."
                      value={form.subject}
                      onChange={e => setForm({...form, subject: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-700 ml-1">Nội dung tin nhắn</label>
                  <textarea 
                    required 
                    rows="5"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all font-bold placeholder:font-medium resize-none"
                    placeholder="Xin chào, tôi muốn hỏi..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border-2 border-transparent hover:border-gray-100 transition-all group">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    required 
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 text-primary focus:ring-primary"
                    checked={form.consent}
                    onChange={e => setForm({...form, consent: e.target.checked})}
                  />
                  <label htmlFor="consent" className="text-sm text-gray-500 font-bold cursor-pointer group-hover:text-gray-700">
                    Tôi đồng ý để nhà sách liên hệ lại về nội dung tôi đã gửi.
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-green-500 text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center gap-3 transition-all hover:-translate-y-1 active:translate-y-0"
                >
                  <FiSend className="text-xl" /> GỬI TIN NHẮN NGAY
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
