import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiHeart, FiUser, FiBell, FiSearch, FiMenu, FiX, FiList, FiChevronDown, FiLogOut } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../../services/categoryService';
import { notificationService } from '../../services/notificationService';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [showCatMenu, setShowCatMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const catRef = useRef(null);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Queries
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryService.getAllCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getNotifications(),
    enabled: isAuthenticated,
    refetchInterval: 30000, // Refetch every 30s
  });

  const unreadCount = notifications.filter(n => n.trang_thai === 'chua_doc').length;

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catRef.current && !catRef.current.contains(event.target)) setShowCatMenu(false);
      if (notifRef.current && !notifRef.current.contains(event.target)) setShowNotifMenu(false);
      if (userRef.current && !userRef.current.contains(event.target)) setShowUserMenu(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-6">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <img src="/assets/images/bookstoreLogo.png" alt="BookStore Logo" className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
          <span className="hidden sm:block text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 tracking-tight">
            BookZone
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Categories Dropdown */}
          <div className="relative" ref={catRef}>
            <button 
              onClick={() => setShowCatMenu(!showCatMenu)}
              className="flex items-center gap-2 font-semibold text-gray-700 hover:text-primary transition-colors py-2"
            >
              <FiList className="text-lg" />
              <span>Danh mục</span>
              <FiChevronDown className={`transition-transform duration-300 ${showCatMenu ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Mega Menu style for Categories */}
            <div className={`absolute top-full left-0 mt-4 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top-left ${showCatMenu ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              <div className="py-2 max-h-96 overflow-y-auto custom-scrollbar">
                {Array.isArray(categories) && categories.length > 0 ? categories.map(cat => (
                  <Link 
                    key={cat.danhmucSP_id || Math.random()} 
                    to={`/products?danhmucSP_id=${cat.danhmucSP_id}`}
                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary font-medium transition-colors border-b border-gray-50 last:border-0"
                    onClick={() => setShowCatMenu(false)}
                  >
                    {cat.tenDanhMuc}
                  </Link>
                )) : (
                  <div className="px-5 py-3 text-sm text-gray-500">Đang tải...</div>
                )}
              </div>
            </div>
          </div>

          <Link to="/products" className="font-semibold text-gray-700 hover:text-primary transition-colors">Tất cả sản phẩm</Link>
          <Link to="/about" className="font-semibold text-gray-700 hover:text-primary transition-colors">Giới thiệu</Link>
          <Link to="/contact" className="font-semibold text-gray-700 hover:text-primary transition-colors">Liên hệ</Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative group">
          <input
            type="text"
            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-full py-2.5 px-6 pl-12 focus:outline-none focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
            placeholder="Tìm kiếm sách, văn phòng phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary text-lg transition-colors" />
          <button type="submit" className="hidden">Tìm</button>
        </form>

        {/* Actions Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Notifications */}
          {isAuthenticated && (
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setShowNotifMenu(!showNotifMenu)}
                className="p-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-full transition-all relative"
              >
                <FiBell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <div className={`absolute top-full right-0 mt-4 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right ${showNotifMenu ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <span className="font-bold text-gray-800">Thông báo mới</span>
                  {unreadCount > 0 && <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">{unreadCount} mới</span>}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.slice(0, 5).map(n => (
                      <Link 
                        key={n.id} 
                        to="/notifications" 
                        className={`block p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${n.trang_thai === 'chua_doc' ? 'bg-primary/5' : ''}`}
                        onClick={() => setShowNotifMenu(false)}
                      >
                        <div className="flex gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.trang_thai === 'chua_doc' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <FiBell />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">{n.tieu_de || 'Thông báo'}</h4>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{n.noi_dung}</p>
                            <span className="text-[10px] text-gray-400 mt-2 block">{n.ngay_tao ? new Date(n.ngay_tao).toLocaleDateString('vi-VN') : ''}</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <FiBell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">Không có thông báo nào</p>
                    </div>
                  )}
                </div>
                <Link to="/notifications" onClick={() => setShowNotifMenu(false)} className="block p-3 text-center text-sm font-semibold text-primary bg-gray-50 hover:bg-gray-100 transition-colors">
                  Xem tất cả
                </Link>
              </div>
            </div>
          )}

          {/* Wishlist */}
          <Link to="/wishlist" className="p-2.5 hidden sm:block text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all relative">
            <FiHeart className="w-5 h-5" />
          </Link>

          {/* Cart */}
          <Link to="/cart" className="p-2.5 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-full transition-all relative">
            <FiShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </Link>

          {/* User Account */}
          {isAuthenticated ? (
            <div className="relative ml-2" ref={userRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 pr-4 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-500 flex items-center justify-center text-white font-bold shadow-inner">
                  {user?.ho_ten ? user.ho_ten.charAt(0).toUpperCase() : <FiUser />}
                </div>
                <span className="hidden md:block text-sm font-bold text-gray-700 max-w-[100px] truncate">{user?.ho_ten || 'Tài khoản'}</span>
                <FiChevronDown className="hidden md:block text-gray-500 text-sm" />
              </button>
              
              <div className={`absolute right-0 top-full mt-4 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 origin-top-right ${showUserMenu ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="p-4 bg-gray-50/50 border-b border-gray-100">
                  <p className="text-sm font-bold text-gray-800 truncate">{user?.ho_ten}</p>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{user?.email}</p>
                </div>
                <div className="py-2">
                  <Link to="/account" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                    <FiUser className="text-lg" /> Hồ sơ cá nhân
                  </Link>
                  <Link to="/orders" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors">
                    <FiShoppingCart className="text-lg" /> Đơn hàng của tôi
                  </Link>
                </div>
                <div className="p-2 border-t border-gray-100">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors">
                    <FiLogOut className="text-lg" /> Đăng xuất
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3 ml-2">
              <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-primary transition-colors px-2">
                Đăng nhập
              </Link>
              <Link to="/register" className="bg-primary hover:bg-primary/90 text-white text-sm font-bold py-2.5 px-6 rounded-full shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5">
                Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-gray-600 hover:text-primary transition-colors ml-1" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setMenuOpen(false)}>
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
          
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">Menu</span>
            <button onClick={() => setMenuOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-8 relative">
              <input
                type="text"
                className="w-full bg-gray-50 border-2 border-gray-100 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-primary/50 focus:bg-white transition-colors"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            </form>

            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-lg font-bold text-gray-800 p-3 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>Trang chủ</Link>
              <Link to="/products" className="text-lg font-bold text-gray-800 p-3 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>Sản phẩm</Link>
              
              {/* Mobile Categories */}
              <div className="pl-3 py-2">
                <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2">Danh mục</div>
                <div className="flex flex-col gap-1 border-l-2 border-gray-100 ml-2 pl-4">
                  {Array.isArray(categories) && categories.map(cat => (
                    <Link key={cat.danhmucSP_id || Math.random()} to={`/products?danhmucSP_id=${cat.danhmucSP_id}`} className="py-2 text-gray-600 font-medium" onClick={() => setMenuOpen(false)}>
                      {cat.tenDanhMuc}
                    </Link>
                  ))}
                </div>
              </div>

              <Link to="/about" className="text-lg font-bold text-gray-800 p-3 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>Giới thiệu</Link>
              <Link to="/contact" className="text-lg font-bold text-gray-800 p-3 rounded-xl hover:bg-gray-50 transition-colors" onClick={() => setMenuOpen(false)}>Liên hệ</Link>
            </nav>
          </div>

          {!isAuthenticated && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block w-full py-3 text-center text-primary font-bold bg-primary/10 rounded-xl mb-3">Đăng nhập</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="block w-full py-3 text-center text-white font-bold bg-primary rounded-xl shadow-lg shadow-primary/30">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
