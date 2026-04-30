import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { 
  FiShoppingCart, FiHeart, FiUser, FiBell, FiSearch, 
  FiMenu, FiX, FiList, FiChevronDown, FiLogOut, FiShoppingBag, FiChevronRight 
} from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryService } from '../../services/categoryService';
import { notificationService } from '../../services/notificationService';
import { cn } from '../../utils/cn';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [activeDropdown, setActiveDropdown] = useState(null); 
  const dropdownRef = useRef(null);

  // Queries
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
    enabled: isAuthenticated,
    refetchInterval: 60000,
  });

  const unreadCount = notifications.filter(n => n.trang_thai === 'chua_doc').length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 z-[100] transition-all duration-300 p-3",
          isScrolled ? "bg-white shadow-md py-2" : "bg-white border-b border-slate-100 py-3"
        )}
      >
        <div className="container mx-auto px-4 max-w-[1600px] flex items-center justify-between gap-4 md:gap-8">
          
          {/* Left: Logo & Category Dropdown */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/assets/images/bookstoreLogo.png" alt="Logo" className="h-9 w-auto object-contain" />
              <span className="hidden sm:block text-xl font-bold text-secondary tracking-tight">BookZone</span>
            </Link>

            <div className="hidden lg:block relative" ref={activeDropdown === 'categories' ? dropdownRef : null}>
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'categories' ? null : 'categories')}
                className="flex items-center gap-2 font-bold text-slate-600 hover:text-primary transition-colors text-sm"
              >
                <FiList className="text-lg" />
                <span>Danh mục</span>
                <FiChevronDown className={cn("transition-transform duration-200", activeDropdown === 'categories' && "rotate-180")} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'categories' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 mt-4 w-60 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50"
                  >
                    {categories.map(cat => (
                      <Link 
                        key={cat.id} to={`/products?danhmucSP_id=${cat.id}`}
                        className="px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all flex items-center justify-between"
                      >
                        {cat.name}
                        <FiChevronRight className="text-slate-300 w-3 h-3" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Middle: Integrated Search & Main Nav */}
          <div className="flex-1 max-w-2xl flex items-center gap-6">
            <form onSubmit={handleSearch} className="flex-1 relative group">
              <input
                type="text"
                className="w-full bg-slate-100 border-none rounded-xl py-2 px-10 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium placeholder:text-slate-400"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            </form>

            <nav className="hidden xl:flex items-center gap-6">
              <NavLink to="/products">Tất cả sản phẩm</NavLink>
              <NavLink to="/contact">Liên hệ</NavLink>
              <NavLink to="/about">Về BookZone</NavLink>
            </nav>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative" ref={activeDropdown === 'notifications' ? dropdownRef : null}>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'notifications' ? null : 'notifications')}
                  className="p-2.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-all relative"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 w-2 h-2 rounded-full border-2 border-white"></span>
                  )}
                </button>
                <AnimatePresence>
                  {activeDropdown === 'notifications' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-4 w-80 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50"
                    >
                      <div className="p-3 border-b border-slate-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Thông báo</span>
                        {unreadCount > 0 && <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount} mới</span>}
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.slice(0, 5).map(n => (
                            <div key={n.id} className="p-3 hover:bg-slate-50 rounded-lg transition-colors border-b border-slate-50 last:border-none">
                              <p className={cn("text-sm font-bold", n.trang_thai === 'chua_doc' ? "text-secondary" : "text-slate-500")}>{n.tieu_de}</p>
                              <p className="text-xs text-slate-400 mt-1 line-clamp-2 font-medium">{n.noi_dung}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-slate-400 text-xs font-medium">Không có thông báo nào</div>
                        )}
                      </div>
                      <Link to="/notifications" className="block text-center p-3 text-xs font-bold text-primary hover:underline border-t border-slate-50">Xem tất cả</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Cart */}
            <Link to="/cart" className="p-2.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-xl transition-all relative">
              <FiShoppingCart className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {/* User */}
            {isAuthenticated ? (
              <div className="relative" ref={activeDropdown === 'user' ? dropdownRef : null}>
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs shadow-md shadow-primary/20">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <FiChevronDown className={cn("text-slate-300 transition-transform", activeDropdown === 'user' && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 top-full mt-4 w-56 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50"
                    >
                      <div className="p-3 border-b border-slate-50 mb-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Chào bạn,</p>
                        <p className="text-sm font-bold text-secondary truncate mt-1">{user?.name}</p>
                      </div>
                      <UserMenuItem to="/account" icon={FiUser}>Hồ sơ</UserMenuItem>
                      <UserMenuItem to="/orders" icon={FiShoppingBag}>Đơn hàng</UserMenuItem>
                      <div className="h-[1px] bg-slate-50 my-1"></div>
                      <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <FiLogOut /> Đăng xuất
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 p-2.5 text-slate-600 hover:text-primary transition-all font-bold text-sm">
                <FiUser className="w-5 h-5" />
                <span className="hidden sm:block">Đăng nhập</span>
              </Link>
            )}

            {/* Mobile Toggle */}
            <button className="lg:hidden p-2 text-slate-500" onClick={() => setMobileMenuOpen(true)}>
              <FiMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-900/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              className="h-full w-[80%] max-w-xs bg-white p-6 shadow-2xl flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-secondary">BookZone</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-50 rounded-lg">
                  <FiX className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                <Link to="/" className="p-3 text-lg font-bold text-secondary hover:text-primary">Trang chủ</Link>
                <Link to="/products" className="p-3 text-lg font-bold text-secondary hover:text-primary">Sản phẩm</Link>
                <Link to="/contact" className="p-3 text-lg font-bold text-secondary hover:text-primary">Liên hệ</Link>
                <Link to="/about" className="p-3 text-lg font-bold text-secondary hover:text-primary">Giới thiệu</Link>
                <div className="h-[1px] bg-slate-50 my-2"></div>
                <p className="px-3 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Danh mục</p>
                {categories.map(cat => (
                  <Link key={cat.id} to={`/products?danhmucSP_id=${cat.id}`} className="px-3 py-2 text-slate-600 font-bold text-sm" onClick={() => setMobileMenuOpen(false)}>
                    {cat.name}
                  </Link>
                ))}
              </div>
              {!isAuthenticated && (
                <div className="pt-6 border-t border-slate-50 flex flex-col gap-3">
                  <Link to="/login" className="w-full btn-secondary py-3">Đăng nhập</Link>
                  <Link to="/register" className="w-full btn-primary py-3">Tham gia ngay</Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="text-sm font-bold text-slate-500 hover:text-primary transition-colors whitespace-nowrap">
      {children}
    </Link>
  );
}

function UserMenuItem({ to, icon: Icon, children }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary rounded-lg transition-all">
      <Icon className="w-4 h-4" /> {children}
    </Link>
  );
}
