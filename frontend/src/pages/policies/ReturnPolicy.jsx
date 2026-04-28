import { FiRefreshCw, FiCheckCircle, FiClock, FiTruck, FiAlertTriangle, FiHeadphones, FiCamera, FiBox, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function ReturnPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-[3rem] p-8 md:p-16 mb-12 border border-indigo-100 shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">BookZone Care</span>
              <span className="text-gray-400 text-xs font-bold italic">Đổi trả nhanh - xử lý minh bạch</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight italic">Chính sách đổi trả</h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl italic">
              Tự tin mua sắm với quy trình đổi trả rõ ràng, linh hoạt và ưu tiên quyền lợi khách hàng.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 group hover:border-primary transition-all">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all"><FiClock /></div>
                <div>
                  <div className="font-black text-gray-900 text-sm">30 ngày</div>
                  <div className="text-xs text-gray-400 font-bold italic">Cửa sổ đổi trả</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 group hover:border-primary transition-all">
                <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all"><FiTruck /></div>
                <div>
                  <div className="font-black text-gray-900 text-sm">Miễn phí</div>
                  <div className="text-xs text-gray-400 font-bold italic">Phí hàng lỗi</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-green-100"><FiCheckCircle /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">An tâm 1 đổi 1</div>
                <div className="text-xs text-gray-400 font-bold italic">Lỗi do nhà sản xuất</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-blue-100"><FiHeadphones /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Hỗ trợ đa kênh</div>
                <div className="text-xs text-gray-400 font-bold italic">Hotline, email, chat 24/7</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 italic flex items-center gap-3">
                <FiRefreshCw className="text-primary" /> Điều kiện đổi trả
              </h2>
              <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black text-primary tracking-widest uppercase">30 NGÀY</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <FiClock />, title: 'Thời gian', desc: 'Đổi trả trong vòng 30 ngày kể từ ngày nhận hàng.' },
                { icon: <FiBox />, title: 'Tình trạng', desc: 'Sản phẩm còn nguyên vẹn, chưa sử dụng hoặc lỗi do nhà sản xuất.' },
                { icon: <FiCheckCircle />, title: 'Hóa đơn', desc: 'Kèm hóa đơn gốc, tem mác và phụ kiện (nếu có).' },
                { icon: <FiTruck />, title: 'Vận chuyển', desc: 'Miễn phí với sản phẩm lỗi kỹ thuật, hỗ trợ tối đa.' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-indigo-50/30 transition-all flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white text-indigo-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 font-bold italic">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-12">
            <h2 className="text-2xl font-black text-gray-900 italic flex items-center gap-3">
              <FiCheckCircle className="text-green-500" /> Quy trình đổi trả
            </h2>
            <div className="relative space-y-12 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-1 before:bg-gray-50">
              {[
                { step: 1, title: 'Báo yêu cầu', desc: 'Liên hệ hotline 0239 482 958 hoặc trang Liên hệ, cung cấp mã đơn và lý do.', badge: 'Phản hồi 24h' },
                { step: 2, title: 'Chuẩn bị sản phẩm', desc: 'Giữ nguyên tem mác. Đóng gói cùng hóa đơn/phiếu mua hàng.', badge: 'Hỗ trợ lấy hàng' },
                { step: 3, title: 'Gửi về BookZone', desc: 'Gửi đến trung tâm đổi trả hoặc điểm gửi theo hướng dẫn.', badge: 'Miễn phí hàng lỗi' },
                { step: 4, title: 'Nhận kết quả', desc: 'Xử lý trong 5-7 ngày làm việc: hoàn tiền hoặc đổi mới.', badge: 'Cập nhật email' }
              ].map((item, i) => (
                <div key={i} className="relative flex gap-10 items-start">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-black text-lg z-10 border-4 border-white shadow-lg shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-gray-500 text-sm italic">{item.desc}</p>
                    <span className="inline-block px-2 py-1 bg-gray-50 border border-gray-100 rounded text-[10px] font-black text-primary uppercase">{item.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h2 className="text-2xl font-black text-gray-900 italic flex items-center gap-3">
              <FiAlertTriangle className="text-red-500" /> Không áp dụng đổi trả
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Sản phẩm đã qua sử dụng, hư hỏng do tác động vật lý.',
                'Sản phẩm quá 30 ngày hoặc thiếu hóa đơn/bao bì gốc.',
                'Hàng đặt riêng theo yêu cầu hoặc thuộc danh mục hạn chế.',
                'Sản phẩm bị can thiệp bởi bên thứ ba không được ủy quyền.'
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-red-50/30 rounded-2xl border border-transparent hover:border-red-100 transition-all">
                  <FiAlertTriangle className="text-red-500 shrink-0 mt-1" />
                  <p className="text-sm text-gray-600 font-bold italic">{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-primary text-white p-10 rounded-[2.5rem] shadow-xl shadow-green-100 space-y-6">
            <h3 className="font-black text-xl italic flex items-center gap-2">
              <FiHeadphones /> Cần hỗ trợ?
            </h3>
            <p className="text-sm text-white/80 font-medium italic">
              Đội ngũ CSKH sẵn sàng hỗ trợ bạn trong giờ hành chính. Phản hồi nhanh nhất trong 24h.
            </p>
            <div className="space-y-3">
              <Link to="/contact" className="block w-full py-4 bg-white text-primary text-center font-black rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
                GỬI YÊU CẦU
              </Link>
              <a href="tel:0239482958" className="block w-full py-4 border-2 border-white/20 text-white text-center font-black rounded-2xl hover:bg-white/10 transition-all">
                HOTLINE 0239 482 958
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-black text-gray-900 italic flex items-center gap-2">
              <FiCheckCircle className="text-green-500" /> Mẹo xử lý nhanh
            </h3>
            <ul className="space-y-6">
              {[
                { icon: <FiCamera />, text: 'Chụp rõ lỗi sản phẩm đính kèm yêu cầu.' },
                { icon: <FiBox />, text: 'Giữ đầy đủ phụ kiện, tem mác bao bì.' },
                { icon: <FiMail />, text: 'Kiểm tra email thường xuyên để cập nhật.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center text-lg group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    {item.icon}
                  </div>
                  <p className="text-xs text-gray-500 font-bold italic leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
