import { FiTruck, FiZap, FiGlobe, FiPackage, FiShield, FiCheckCircle, FiClock, FiSearch } from 'react-icons/fi';

export default function ShippingPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-none p-8 md:p-16 mb-12 border border-blue-100 shadow-none">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-none tracking-widest uppercase">BookZone Logistics</span>
              <span className="text-gray-400 text-xs font-bold italic">Giao nhanh, đảm bảo an toàn</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight italic">Vận chuyển & Giao hàng</h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl italic">
              Hợp tác với các đối tác vận chuyển uy tín, đảm bảo sản phẩm đến tay bạn nhanh chóng và an toàn.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white p-4 rounded-none shadow-none border border-gray-100 flex items-center gap-3 group hover:border-primary transition-all">
                <div className="w-10 h-10 bg-green-50 text-green-500 rounded-none flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all"><FiZap /></div>
                <div>
                  <div className="font-black text-gray-900 text-sm">1-2 ngày</div>
                  <div className="text-xs text-gray-400 font-bold italic">Giao nhanh</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-none shadow-none border border-gray-100 flex items-center gap-3 group hover:border-primary transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-none flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all"><FiGlobe /></div>
                <div>
                  <div className="font-black text-gray-900 text-sm">Toàn quốc</div>
                  <div className="text-xs text-gray-400 font-bold italic">63 tỉnh thành</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 bg-white/60 backdrop-blur-md p-8 rounded-none border border-white shadow-none space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-none flex items-center justify-center text-xl shadow-none shadow-green-100"><FiTruck /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Đa dạng lựa chọn</div>
                <div className="text-xs text-gray-400 font-bold italic">Tiêu chuẩn & Nhanh</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-none flex items-center justify-center text-xl shadow-none shadow-blue-100"><FiSearch /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Theo dõi Realtime</div>
                <div className="text-xs text-gray-400 font-bold italic">Mã vận đơn cập nhật</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-none flex items-center justify-center text-xl shadow-none shadow-purple-100"><FiShield /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Bảo hiểm hàng hóa</div>
                <div className="text-xs text-gray-400 font-bold italic">Bảo vệ tuyệt đối</div>
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
                <FiTruck className="text-primary" /> Dịch vụ vận chuyển
              </h2>
              <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-none text-[10px] font-black text-primary tracking-widest uppercase">4 LỰA CHỌN</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <FiZap />, title: 'Giao nhanh', desc: '1-2 ngày làm việc' },
                { icon: <FiClock />, title: 'Giao tiêu chuẩn', desc: '3-5 ngày làm việc' },
                { icon: <FiGlobe />, title: 'Toàn quốc', desc: 'Phủ sóng mọi tỉnh thành' },
                { icon: <FiPackage />, title: 'Lấy tại cửa hàng', desc: 'Miễn phí vận chuyển' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-none border border-transparent hover:border-green-100 hover:bg-green-50/30 transition-all flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white text-green-500 rounded-none flex items-center justify-center shadow-none group-hover:scale-110 transition-transform">
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
              <FiCheckCircle className="text-blue-500" /> Quy trình giao hàng
            </h2>
            <div className="relative space-y-12 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-1 before:bg-gray-50">
              {[
                { step: 1, title: 'Xác nhận đơn', desc: 'Chúng tôi kiểm tra và xác nhận đơn hàng của bạn.', badge: 'Trong giờ hành chính' },
                { step: 2, title: 'Chuẩn bị hàng', desc: 'Đóng gói sản phẩm cẩn thận, kiểm tra chất lượng.', badge: '1-2 ngày' },
                { step: 3, title: 'Bàn giao vận chuyển', desc: 'Gửi hàng tới đối tác vận chuyển, cấp mã vận đơn.', badge: 'Cập nhật ngay' },
                { step: 4, title: 'Giao tới bạn', desc: 'Nhận hàng tại địa chỉ của bạn theo thời gian chọn.', badge: '1-5 ngày' }
              ].map((item, i) => (
                <div key={i} className="relative flex gap-10 items-start">
                  <div className="w-12 h-12 bg-primary text-white rounded-none flex items-center justify-center font-black text-lg z-10 border-4 border-white shadow-none shrink-0">
                    {item.step}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-gray-500 text-sm italic">{item.desc}</p>
                    <span className="inline-block px-2 py-1 bg-gray-50 border border-gray-100 rounded-none text-[10px] font-black text-primary uppercase">{item.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-none border border-gray-100 shadow-none space-y-6">
            <h3 className="font-black text-gray-900 italic flex items-center gap-2">
              <FiTruck className="text-green-500" /> Đối tác tin cậy
            </h3>
            <ul className="space-y-4">
              {['Giao Hàng Nhanh (GHN)', 'Viettel Post', 'VNPost', 'DHL Express'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-500 font-bold italic">
                  <FiCheckCircle className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 text-white p-10 rounded-none shadow-none space-y-6">
            <h3 className="font-black text-xl italic flex items-center gap-2">
              <FiPackage /> Thông tin nhanh
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-none border border-white/10">
                <span className="text-sm text-gray-400 font-bold italic">Giao nhanh</span>
                <span className="font-black text-primary">1-2 ngày</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-none border border-white/10">
                <span className="text-sm text-gray-400 font-bold italic">Miễn phí</span>
                <span className="font-black text-primary">Đơn {'>'} 500k</span>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-white font-black rounded-none shadow-none hover:scale-105 active:scale-95 transition-all">
              LIÊN HỆ HỖ TRỢ
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}



