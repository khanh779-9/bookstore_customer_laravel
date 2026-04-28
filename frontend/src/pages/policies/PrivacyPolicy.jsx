import { FiShield, FiLock, FiEye, FiUserCheck, FiCreditCard, FiShoppingBag, FiInfo, FiSettings, FiCheckCircle, FiMail } from 'react-icons/fi';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-[3rem] p-8 md:p-16 mb-12 border border-blue-100 shadow-sm">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase">GDPR Compliant</span>
              <span className="text-gray-400 text-xs font-bold italic">Bảo vệ dữ liệu quốc tế</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight italic">Chính sách bảo mật</h1>
            <p className="text-lg text-gray-500 leading-relaxed max-w-xl italic">
              Bảo vệ thông tin cá nhân của bạn là ưu tiên hàng đầu. Chúng tôi cam kết minh bạch, an toàn và tuân thủ pháp luật.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 group hover:border-primary transition-all">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all"><FiLock /></div>
                <div>
                  <div className="font-black text-gray-900 text-sm">SSL 256-bit</div>
                  <div className="text-xs text-gray-400 font-bold">Mã hóa toàn bộ</div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3 group hover:border-primary transition-all">
                <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all"><FiShield /></div>
                <div>
                  <div className="font-black text-gray-900 text-sm">An toàn 100%</div>
                  <div className="text-xs text-gray-400 font-bold">Không bán dữ liệu</div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-green-100"><FiLock /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Bảo mật từng lớp</div>
                <div className="text-xs text-gray-400 font-bold italic">Tường lửa & kiểm tra định kỳ</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-blue-100"><FiUserCheck /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Quyền của bạn</div>
                <div className="text-xs text-gray-400 font-bold italic">Xem, sửa, xóa dữ liệu</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl shadow-lg shadow-green-100"><FiCheckCircle /></div>
              <div>
                <div className="font-black text-gray-900 text-sm">Minh bạch hoàn toàn</div>
                <div className="text-xs text-gray-400 font-bold italic">Chính sách rõ ràng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900 italic flex items-center gap-3">
                <FiShield className="text-primary" /> Cam kết bảo mật
              </h2>
              <span className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-black text-primary tracking-widest uppercase">GDPR</span>
            </div>
            <p className="text-gray-500 leading-relaxed italic">
              BookZone cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, chia sẻ và bảo vệ thông tin cá nhân của bạn.
            </p>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h2 className="text-2xl font-black text-gray-900 italic flex items-center gap-3">
              <FiInfo className="text-blue-500" /> Thông tin chúng tôi thu thập
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <FiUserCheck />, title: 'Thông tin cá nhân', desc: 'Họ tên, email, số điện thoại, địa chỉ' },
                { icon: <FiCreditCard />, title: 'Thông tin thanh toán', desc: 'Thẻ/tài khoản (được mã hóa)' },
                { icon: <FiShoppingBag />, title: 'Lịch sử đơn hàng', desc: 'Sản phẩm mua, giá cả, ngày mua' },
                { icon: <FiEye />, title: 'Dữ liệu sử dụng', desc: 'IP, trình duyệt, trang ghé thăm' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-blue-50/30 transition-all flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white text-blue-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
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

          <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-8">
            <h2 className="text-2xl font-black text-gray-900 italic flex items-center gap-3">
              <FiSettings className="text-yellow-500" /> Cách sử dụng thông tin
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: <FiShoppingBag />, title: 'Xử lý đơn hàng', desc: 'Giao hàng, thanh toán, xử lý khiếu nại' },
                { icon: <FiMail />, title: 'Liên lạc', desc: 'Thông báo đơn hàng, khuyến mãi' },
                { icon: <FiSettings />, title: 'Cải thiện dịch vụ', desc: 'Phân tích hành vi người dùng' },
                { icon: <FiShield />, title: 'Bảo mật', desc: 'Phát hiện gian lận, tấn công' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-yellow-100 hover:bg-yellow-50/30 transition-all flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-white text-yellow-500 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
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
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-black text-gray-900 flex items-center gap-2 italic">
              <FiCheckCircle className="text-green-500" /> Tóm tắt bảo mật
            </h3>
            <ul className="space-y-4">
              {[
                'Mã hóa SSL 256-bit',
                'Không bán dữ liệu',
                'Sao lưu hàng ngày',
                'GDPR compliant',
                'Kiểm tra định kỳ'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-500 font-bold italic">
                  <FiCheckCircle className="text-green-500 shrink-0" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary text-white p-8 rounded-[2rem] shadow-xl shadow-green-100 space-y-4">
            <h3 className="font-black text-lg italic flex items-center gap-2">
              <FiShield /> Bảo vệ dữ liệu
            </h3>
            <p className="text-sm font-medium text-white/80 italic leading-relaxed">
              Chúng tôi tuân thủ các quy định bảo vệ dữ liệu quốc tế bao gồm GDPR và luật bảo vệ dữ liệu Việt Nam.
            </p>
            <button className="w-full py-3 bg-white text-primary font-black rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-tight">
              Hỏi về bảo mật
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
