import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand & Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/assets/images/bookstoreLogo.png" alt="BookZone Logo" className="h-12 w-auto object-contain" />
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 tracking-tight">BookZone</span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-sm">
              Khám phá tri thức, khơi nguồn sáng tạo. BookZone tự hào là nhà sách trực tuyến cung cấp sách, văn phòng phẩm và phụ kiện học tập chất lượng cao hàng đầu Việt Nam.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:-translate-y-1 transition-all">
                <FiFacebook className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-pink-50 hover:text-pink-600 hover:-translate-y-1 transition-all">
                <FiInstagram className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-400 hover:-translate-y-1 transition-all">
                <FiTwitter className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 hover:-translate-y-1 transition-all">
                <FiYoutube className="text-lg" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 relative inline-block">
              Danh mục
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li><Link to="/products?danhmucSP_id=1" className="text-gray-500 hover:text-primary hover:translate-x-1 inline-block transition-all font-medium">Sách Quốc Tế</Link></li>
              <li><Link to="/products?danhmucSP_id=2" className="text-gray-500 hover:text-primary hover:translate-x-1 inline-block transition-all font-medium">Sách Tiếng Việt</Link></li>
              <li><Link to="/products?danhmucSP_id=3" className="text-gray-500 hover:text-primary hover:translate-x-1 inline-block transition-all font-medium">Văn phòng phẩm</Link></li>
              <li><Link to="/products?promoted_only=1" className="text-gray-500 hover:text-primary hover:translate-x-1 inline-block transition-all font-medium">Khuyến mãi</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 relative inline-block">
              Chính sách
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4">
              <li><Link to="/privacy-policy" className="text-gray-500 hover:text-primary hover:translate-x-1 inline-block transition-all font-medium">Chính sách bảo mật</Link></li>
              <li><Link to="/return-policy" className="text-gray-500 hover:text-primary hover:translate-x-1 inline-block transition-all font-medium">Chính sách đổi trả</Link></li>
              <li><Link to="/warranty-policy" className="text-gray-500 hover:text-primary hover:translate-x-1 inline-block transition-all font-medium">Chính sách bảo hành</Link></li>
              <li><Link to="/shipping-delivery" className="text-gray-500 hover:text-primary hover:translate-x-1 inline-block transition-all font-medium">Vận chuyển & Giao hàng</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 relative inline-block">
              Liên hệ
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiMapPin className="text-lg" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1">Địa chỉ</h5>
                  <p className="text-sm text-gray-500 leading-relaxed">180 Cao Lỗ, Phường 4, Quận 8, TP.HCM</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiPhone className="text-lg" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1">Điện thoại</h5>
                  <p className="text-sm text-gray-500 font-medium">0329 675 483</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FiMail className="text-lg" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm mb-1">Email hỗ trợ</h5>
                  <p className="text-sm text-gray-500 font-medium">support@bookzone.vn</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-400 font-medium text-center md:text-left">
            © {new Date().getFullYear()} BookZone. Bản quyền thuộc về đội ngũ phát triển.
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-medium hidden sm:block">Thanh toán an toàn qua:</span>
            <div className="flex items-center gap-2">
              <div className="w-12 h-8 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">VISA</div>
              <div className="w-12 h-8 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">MOMO</div>
              <div className="w-12 h-8 bg-gray-50 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-400">COD</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
