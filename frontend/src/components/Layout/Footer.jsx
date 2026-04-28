import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src="/assets/images/bookstoreLogo.png" alt="Logo" className="h-10 w-auto" />
            <span className="text-xl font-bold">BookZone</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Nhà sách trực tuyến uy tín hàng đầu Việt Nam. Cung cấp sách, văn phòng phẩm và phụ kiện học tập chất lượng cao.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Danh mục</h4>
          <ul className="space-y-2">
            <li><Link to="/products?danhmucSP_id=1" className="text-sm text-gray-500 hover:text-primary transition-colors">Sách</Link></li>
            <li><Link to="/products?danhmucSP_id=2" className="text-sm text-gray-500 hover:text-primary transition-colors">Văn phòng phẩm</Link></li>
            <li><Link to="/products?danhmucSP_id=3" className="text-sm text-gray-500 hover:text-primary transition-colors">Quà & phụ kiện</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Chính sách</h4>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy" className="text-sm text-gray-500 hover:text-primary transition-colors">Chính sách bảo mật</Link></li>
            <li><Link to="/return-policy" className="text-sm text-gray-500 hover:text-primary transition-colors">Chính sách đổi trả</Link></li>
            <li><Link to="/warranty-policy" className="text-sm text-gray-500 hover:text-primary transition-colors">Chính sách bảo hành</Link></li>
            <li><Link to="/shipping-delivery" className="text-sm text-gray-500 hover:text-primary transition-colors">Vận chuyển & giao hàng</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">Liên hệ</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-lg">📍</span>
              <span className="text-sm text-gray-500">180 Cao Lỗ, Phường 4, Quận 8, TP.HCM</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-lg">📞</span>
              <span className="text-sm text-gray-500">0329 675 483</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-lg">✉️</span>
              <span className="text-sm text-gray-500">support@bookzone.vn</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-gray-50">
        <p className="text-center text-sm text-gray-400">
          © 2026 BookZone. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
