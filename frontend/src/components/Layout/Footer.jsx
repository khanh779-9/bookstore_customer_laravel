import { Link } from 'react-router-dom';
import { 
  FiMail, FiPhone, FiMapPin, FiFacebook, 
  FiInstagram, FiTwitter, FiYoutube, FiArrowUp 
} from 'react-icons/fi';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          
          {/* Logo & Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/assets/images/bookstoreLogo.png" alt="BookZone Logo" className="h-10 w-auto object-contain" />
              <span className="text-2xl font-bold text-secondary tracking-tight">BookZone</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Nhà sách trực tuyến chuyên cung cấp các loại sách, văn phòng phẩm chính hãng và các phụ kiện học tập chất lượng cao.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink icon={FiFacebook} href="#" />
              <SocialLink icon={FiInstagram} href="#" />
              <SocialLink icon={FiTwitter} href="#" />
              <SocialLink icon={FiYoutube} href="#" />
            </div>
          </div>

          {/* Dịch vụ */}
          <div>
            <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">Dịch vụ</h4>
            <ul className="space-y-4">
              <FooterLink to="/return-policy">Chính sách đổi trả</FooterLink>
              <FooterLink to="/warranty-policy">Chính sách bảo hành</FooterLink>
              <FooterLink to="/shipping-policy">Chính sách vận chuyển</FooterLink>
              <FooterLink to="/privacy-policy">Chính sách bảo mật</FooterLink>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div>
            <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">Hỗ trợ</h4>
            <ul className="space-y-4">
              <FooterLink to="/contact">Liên hệ</FooterLink>
              <FooterLink to="/about">Về chúng tôi</FooterLink>
              <FooterLink to="/products">Tìm sản phẩm</FooterLink>
              <FooterLink to="/faq">Câu hỏi thường gặp</FooterLink>
            </ul>
          </div>

          {/* Liên hệ */}
          <div>
            <h4 className="text-sm font-bold text-secondary uppercase tracking-widest mb-6">Liên hệ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <FiPhone className="mt-1 text-primary shrink-0" />
                <a href="tel:0239482958" className="hover:text-primary transition-colors">0239 482 958</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <FiMail className="mt-1 text-primary shrink-0" />
                <a href="mailto:qkhanh12.duration060@passinbox.com" className="hover:text-primary transition-colors break-all">qkhanh12.duration060@passinbox.com</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-500">
                <FiMapPin className="mt-1 text-primary shrink-0" />
                <span>180 Cao Lỗ, Quận 8, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-medium text-slate-400">
            © 2025 BookZone. Tất cả quyền được bảo lưu.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-all uppercase tracking-widest cursor-pointer"
          >
            Lên đầu trang
            <div className="w-8 h-8 bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all rounded-lg">
              <FiArrowUp />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link 
        to={to} 
        className="text-sm text-slate-500 hover:text-primary transition-all flex items-center gap-2 group"
      >
        <span className="w-2 h-2 bg-slate-200 group-hover:bg-primary group-hover:scale-125 transition-all rounded-full"></span>
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ icon: Icon, href }) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 bg-slate-50 text-slate-400 flex items-center justify-center rounded-md hover:bg-primary hover:text-white transition-all"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}



