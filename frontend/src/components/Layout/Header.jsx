import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiHeart, FiUser, FiBell, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/assets/images/bookstoreLogo.png" alt="BookStore Logo" className="h-12 w-auto object-contain" />
          <span className="hidden sm:block text-xl font-bold text-gray-800 tracking-tight">BookZone</span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg relative group">
          <input
            type="text"
            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Tìm kiếm sách, văn phòng phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
          <button type="submit" className="hidden">Tìm</button>
        </form>

        {/* Desktop Nav Actions */}
        <div className="flex items-center gap-1 sm:gap-4 shrink-0">
          <nav className="hidden lg:flex items-center gap-6 mr-4 text-sm font-medium text-gray-600">
            <Link to="/products" className="hover:text-primary transition-colors">Sản phẩm</Link>
            <Link to="/about" className="hover:text-primary transition-colors">Giới thiệu</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Liên hệ</Link>
          </nav>

          <Link to="/wishlist" className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all relative">
            <FiHeart className="w-5 h-5" />
          </Link>

          <Link to="/cart" className="p-2 text-gray-600 hover:text-primary hover:bg-green-50 rounded-full transition-all relative">
            <FiShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                {count}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 pl-2 pr-4 bg-gray-50 hover:bg-gray-100 rounded-full border border-gray-100 transition-all">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <FiUser />
                </div>
                <span className="hidden sm:block text-sm font-semibold text-gray-700">{user?.ten || 'Tài khoản'}</span>
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="w-48 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden py-2">
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Tài khoản</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Đơn hàng</Link>
                  <Link to="/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Thông báo</Link>
                  <hr className="my-2 border-gray-100" />
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Đăng xuất</button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login" className="bg-primary hover:bg-green-500 text-white text-sm font-bold py-2 px-6 rounded-full shadow-md transition-all">
              Đăng nhập
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white p-6 shadow-2xl animate-slide-left" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold">Menu</span>
              <button onClick={() => setMenuOpen(false)}><FiX className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSearch} className="mb-6 relative">
              <input
                type="text"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none"
                placeholder="Tìm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </form>

            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-lg font-medium border-b border-gray-50 pb-2" onClick={() => setMenuOpen(false)}>Trang chủ</Link>
              <Link to="/products" className="text-lg font-medium border-b border-gray-50 pb-2" onClick={() => setMenuOpen(false)}>Sản phẩm</Link>
              <Link to="/about" className="text-lg font-medium border-b border-gray-50 pb-2" onClick={() => setMenuOpen(false)}>Giới thiệu</Link>
              <Link to="/contact" className="text-lg font-medium border-b border-gray-50 pb-2" onClick={() => setMenuOpen(false)}>Liên hệ</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
