import { FiShield, FiCheckCircle, FiClock, FiTool, FiHeadphones, FiCamera, FiFileText, FiBox, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function WarrantyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 via-white to-red-50 rounded-none p-8 md:p-16 mb-12 border border-yellow-100 shadow-none">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-yellow-500 text-white text-[10px] font-black px-3 py-1 rounded-none tracking-widest uppercase">BookZone Guarantee</span>
              <span className="text-gray-400 text-xs font-bold italic">Sửa chữa hoặc thay thế miễn phí</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight italic">Chính sách bảo hành</h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl italic">
              Tất cả sản phẩm BookZone đều được bảo hành chuyên nghiệp với thời gian phù hợp loại sản phẩm.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white p-4 rounded-none shadow-none border border-gray-100 flex items-center gap-3 group hover:border-yellow-500 transition-all">
                <div className="w-10 h-10 bg-yellow-50 text-yellow-500 rounded-none flex items-center justify-center text-xl group-hover:bg-yellow-500 group-hover:text-white transition-all"><FiClock /></div>
                <div>
                  <div className="font-black text-gray-900 text-sm">Đa dạng</div>
                  <div className="text-xs text-gray-400 font-bold italic">7-12 tháng</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-none shadow-none border border-gray-100 flex items-center gap-3 group hover:border-yellow-500 transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-none flex items-center justify-center text-xl group-hover:bg-blue-500 group-hover:text-white transition-all"><FiTool /></div>
                <div>
                  <div className="font-black text-gray-900 text-sm">Chuyên nghiệp</div>
                  <div className="text-xs text-gray-400 font-bold italic">Xử lý 5-7 ngày</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 bg-white/60 backdrop-blur-md p-8 rounded-none border border-white shadow-none space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500 text-white rounded-none flex items-center justify-center text-xl shadow-none shadow-yellow-100"><FiShield /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Miễn phí sửa chữa</div>
                <div className="text-xs text-gray-400 font-bold italic">Lỗi do nhà sản xuất</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-none flex items-center justify-center text-xl shadow-none shadow-blue-100"><FiHeadphones /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Hỗ trợ đầy đủ</div>
                <div className="text-xs text-gray-400 font-bold italic">Hotline & email hỗ trợ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white p-10 rounded-none border border-gray-100 shadow-none space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 italic flex items-center gap-3">
                <FiShield className="text-yellow-500" /> Thời hạn bảo hành
              </h2>
              <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-none text-[10px] font-black text-yellow-500 tracking-widest uppercase">Miễn phí 100%</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <FiBox />, title: 'Sách & Văn phòng', desc: '7 ngày từ ngày nhận hàng' },
                { icon: <FiZap />, title: 'Sản phẩm điện tử', desc: '12 tháng từ ngày mua' },
                { icon: <FiCheckCircle />, title: 'Bộ quà tặng', desc: '14 ngày từ ngày nhận' },
                { icon: <FiTool />, title: 'Sản phẩm khác', desc: 'Theo quy định của NSX' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-none border border-transparent hover:border-yellow-100 hover:bg-yellow-50/30 transition-all flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white text-yellow-500 rounded-none flex items-center justify-center shadow-none group-hover:scale-110 transition-transform">
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

          <section className="bg-white p-10 rounded-none border border-gray-100 shadow-none space-y-12">
            <h2 className="text-2xl font-black text-gray-900 italic flex items-center gap-3">
              <FiCheckCircle className="text-green-500" /> Quy trình bảo hành
            </h2>
            <div className="relative space-y-12 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-1 before:bg-gray-50">
              {[
                { step: 1, title: 'Báo lỗi', desc: 'Liên hệ hotline hoặc trang Liên hệ, cung cấp ảnh chứng minh lỗi.', badge: 'Phản hồi 24h' },
                { step: 2, title: 'Kiểm tra', desc: 'Chúng tôi kiểm tra sản phẩm để xác nhận lỗi kỹ thuật.', badge: 'Xử lý nhanh' },
                { step: 3, title: 'Sửa chữa/Thay thế', desc: 'Sửa chữa hoặc thay thế sản phẩm miễn phí.', badge: '5-7 ngày làm việc' },
                { step: 4, title: 'Giao hàng', desc: 'Gửi sản phẩm về cho bạn miễn phí vận chuyển.', badge: 'Cập nhật liên tục' }
              ].map((item, i) => (
                <div key={i} className="relative flex gap-10 items-start">
                  <div className="w-12 h-12 bg-yellow-500 text-white rounded-none flex items-center justify-center font-black text-lg z-10 border-4 border-white shadow-none shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-gray-500 text-sm italic">{item.desc}</p>
                    <span className="inline-block px-2 py-1 bg-gray-50 border border-gray-100 rounded-none text-[10px] font-black text-yellow-500 uppercase">{item.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-yellow-500 text-white p-10 rounded-none shadow-none shadow-yellow-100 space-y-6">
            <h3 className="font-black text-xl italic flex items-center gap-2">
              <FiHeadphones /> Cần hỗ trợ ngay?
            </h3>
            <p className="text-sm text-white/90 font-medium italic">
              Đội ngũ CSKH sẵn sàng hỗ trợ bạn. Chúng tôi sẽ phản hồi trong 24 giờ.
            </p>
            <div className="space-y-3">
              <Link to="/contact" className="block w-full py-4 bg-white text-yellow-500 text-center font-black rounded-none shadow-none hover:scale-[1.02] transition-all">
                GỬI YÊU CẦU
              </Link>
              <a href="tel:0239482958" className="block w-full py-4 border-2 border-white/20 text-white text-center font-black rounded-none hover:bg-white/10 transition-all">
                HOTLINE 0239 482 958
              </a>
            </div>
          </div>

          <div className="bg-white p-8 rounded-none border border-gray-100 shadow-none space-y-6">
            <h3 className="font-black text-gray-900 italic flex items-center gap-2">
              <FiCheckCircle className="text-green-500" /> Mẹo xử lý nhanh
            </h3>
            <ul className="space-y-6">
              {[
                { icon: <FiCamera />, text: 'Chụp rõ lỗi sản phẩm từ nhiều góc độ.' },
                { icon: <FiFileText />, text: 'Chuẩn bị hóa đơn hoặc giấy tờ mua hàng.' },
                { icon: <FiBox />, text: 'Giữ nguyên bao bì và phụ kiện ban đầu.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-none flex items-center justify-center text-lg group-hover:bg-yellow-50 group-hover:text-yellow-500 transition-all">
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



