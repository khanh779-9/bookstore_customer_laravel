import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import {
  FiShoppingCart, FiHeart, FiUser, FiBell, FiSearch, 
  FiMenu, FiList, FiChevronDown, FiLogOut, FiShoppingBag, FiChevronRight,
} from "react-icons/fi";
import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { categoryService } from "../../services/categoryService";
import { notificationService } from "../../services/notificationService";
import { lookupService } from "../../services/lookupService";
import { cn } from "../../utils/cn";
import ConfirmModal from "../Common/ConfirmModal";
import Input from "../Common/Input";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef(null);

  // Queries
  const { data: categories = [] } = useQuery({ queryKey: ["categories"], queryFn: categoryService.getAllCategories });
  const { data: bookTypes = [] } = useQuery({ queryKey: ["bookTypes"], queryFn: lookupService.getBookTypes });
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationService.getNotifications,
    enabled: isAuthenticated,
    refetchInterval: 60000,
  });

  const unreadCount = notifications.filter(n => n.status === "chua_doc").length;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setActiveDropdown(null);
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => { setActiveDropdown(null); setMobileMenuOpen(false); }, [location.pathname]);

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  }, [searchQuery, navigate]);

  return (
    <>
      <header className={cn(
        "sticky top-0 z-[100] transition-all duration-300 shadow-sm border-b",
        isScrolled ? "bg-white/95 backdrop-blur-md py-2 border-slate-200" : "bg-white py-4 border-slate-100"
      )}>
        <div className="container mx-auto px-4 max-w-[1600px] flex items-center justify-between gap-6">
          {/* Logo & Category */}
          <div className="flex items-center gap-8 shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/assets/images/bookstoreLogo.png" alt="Logo" className="h-10 w-auto" />
              <span className="hidden sm:block text-2xl font-black text-secondary tracking-tighter uppercase">BookZone</span>
            </Link>

            <CategoryDropdown 
              categories={categories} 
              bookTypes={bookTypes} 
              active={activeDropdown === "categories"}
              onToggle={() => setActiveDropdown(activeDropdown === "categories" ? null : "categories")}
              dropdownRef={dropdownRef}
            />
          </div>

          {/* Search & Navigation */}
          <div className="flex-1 max-w-2xl flex items-center gap-8">
            <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
              <Input icon={FiSearch} placeholder="Tìm tựa sách, tác giả..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} className="bg-slate-100 border-none py-2.5" />
            </form>
            <nav className="hidden xl:flex items-center gap-8">
              <NavLink to="/products">Sách mới</NavLink>
              <NavLink to="/about">Giới thiệu</NavLink>
              <NavLink to="/contact">Liên hệ</NavLink>
            </nav>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {isAuthenticated && (
              <NotificationMenu 
                notifications={notifications} 
                unreadCount={unreadCount}
                active={activeDropdown === "notifications"}
                onToggle={() => setActiveDropdown(activeDropdown === "notifications" ? null : "notifications")}
                dropdownRef={dropdownRef}
              />
            )}

            <CartButton count={count} />

            {isAuthenticated ? (
              <UserMenu 
                user={user} 
                active={activeDropdown === "user"}
                onToggle={() => setActiveDropdown(activeDropdown === "user" ? null : "user")}
                onLogout={() => { setActiveDropdown(null); setShowLogoutConfirm(true); }}
                dropdownRef={dropdownRef}
              />
            ) : (
              <Link to="/login" className="flex items-center gap-2 p-2.5 text-slate-600 hover:text-primary transition-all font-black text-xs uppercase tracking-widest">
                <FiUser className="w-5 h-5" />
                <span className="hidden sm:block">Đăng nhập</span>
              </Link>
            )}

            <button className="lg:hidden p-2 text-slate-500" onClick={() => setMobileMenuOpen(true)}><FiMenu size={24} /></button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} categories={categories} isAuthenticated={isAuthenticated} />
      
      <ConfirmModal 
        isOpen={showLogoutConfirm} 
        onClose={() => setShowLogoutConfirm(false)} 
        onConfirm={() => { logout(); setShowLogoutConfirm(false); navigate("/"); }} 
        title="Đăng xuất" message="Bạn có chắc muốn đăng xuất khỏi hệ thống?" confirmText="Đăng xuất ngay" type="warning"
      />
    </>
  );
}

/* --- Sub-Components --- */

function CategoryDropdown({ categories, bookTypes, active, onToggle, dropdownRef }) {
  return (
    <div className="hidden lg:block relative" ref={active ? dropdownRef : null}>
      <button onClick={onToggle} className="flex items-center gap-2 font-black text-slate-600 hover:text-primary transition-colors text-[10px] uppercase tracking-widest cursor-pointer">
        <FiList size={18} /> <span>Danh mục</span>
        <FiChevronDown className={cn("transition-transform", active && "rotate-180")} />
      </button>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-6 w-64 bg-white border border-slate-200 p-3 z-50 shadow-2xl rounded-sm">
            {categories.map((cat) => (
              <div key={cat.id} className="relative group/sub">
                <Link to={`/products?danhmucSP_id=${cat.id}`} className="px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all flex items-center justify-between">
                  {cat.name} <FiChevronRight className="text-slate-300" />
                </Link>
                {cat.id === 1 && (
                  <div className="absolute left-full top-0 ml-1 w-64 bg-white border border-slate-200 p-3 shadow-2xl hidden group-hover/sub:block rounded-sm">
                    {bookTypes.map(type => (
                      <Link key={type.code} to={`/products?danhmucSP_id=1&loaisach_code=${type.code}`}
                        className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-primary hover:bg-slate-50 flex items-center justify-between">
                        {type.name} <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100">XEM</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationMenu({ notifications, unreadCount, active, onToggle, dropdownRef }) {
  return (
    <div className="relative" ref={active ? dropdownRef : null}>
      <button onClick={onToggle} className="p-2.5 text-slate-500 hover:text-primary hover:bg-slate-50 transition-all relative rounded-sm cursor-pointer">
        <FiBell size={20} />
        {unreadCount > 0 && <span className="absolute top-2 right-2 bg-rose-500 w-2.5 h-2.5 border-2 border-white rounded-full" />}
      </button>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-6 w-80 bg-white border border-slate-200 p-2 z-50 shadow-2xl rounded-sm">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thông báo</span>
              {unreadCount > 0 && <span className="bg-rose-50 text-rose-500 text-[10px] font-black px-2 py-0.5">{unreadCount} MỚI</span>}
            </div>
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? notifications.slice(0, 5).map(n => (
                <div key={n.id} className="p-4 hover:bg-slate-50 border-b border-slate-50 last:border-none group">
                  <p className={cn("text-sm font-bold transition-colors", n.status === "chua_doc" ? "text-secondary group-hover:text-primary" : "text-slate-400")}>{n.title}</p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">{n.content}</p>
                </div>
              )) : <div className="p-10 text-center text-slate-300 text-xs font-bold uppercase tracking-widest">Trống</div>}
            </div>
            <Link to="/notifications" className="block text-center p-4 text-[10px] font-black text-primary hover:bg-slate-50 border-t border-slate-50 uppercase tracking-widest">Xem tất cả</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CartButton({ count }) {
  return (
    <Link to="/cart" className="p-2.5 text-slate-500 hover:text-primary hover:bg-slate-50 transition-all relative rounded-sm group">
      <FiShoppingCart size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center border-2 border-white rounded-full group-hover:bg-primary transition-colors">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

function UserMenu({ user, active, onToggle, onLogout, dropdownRef }) {
  return (
    <div className="relative" ref={active ? dropdownRef : null}>
      <button onClick={onToggle} className="flex items-center gap-3 p-1 hover:bg-slate-50 transition-all border border-transparent rounded-sm cursor-pointer">
        <div className="w-9 h-9 bg-slate-900 text-white flex items-center justify-center font-black text-sm rounded-sm shadow-lg shadow-slate-200">
          {user?.ten?.charAt(0).toUpperCase()}
        </div>
        <FiChevronDown className={cn("text-slate-300 transition-transform", active && "rotate-180")} />
      </button>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-6 w-60 bg-white border border-slate-200 p-2 z-50 shadow-2xl rounded-sm">
            <div className="p-4 border-b border-slate-50 mb-2">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Tài khoản</p>
              <p className="text-sm font-black text-secondary truncate">{user?.ho} {user?.ten}</p>
            </div>
            <UserMenuItem to="/account" icon={FiUser}>Hồ sơ cá nhân</UserMenuItem>
            <UserMenuItem to="/orders" icon={FiShoppingBag}>Lịch sử mua hàng</UserMenuItem>
            <UserMenuItem to="/wishlist" icon={FiHeart}>Sản phẩm yêu thích</UserMenuItem>
            <div className="h-px bg-slate-50 my-2" />
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-rose-500 hover:bg-rose-50 transition-all rounded-sm cursor-pointer">
              <FiLogOut /> Đăng xuất
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ to, children }) {
  return (
    <Link to={to} className="text-[11px] font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest">
      {children}
    </Link>
  );
}

function UserMenuItem({ to, icon: Icon, children }) {
  return (
    <Link to={to} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all rounded-sm">
      <Icon size={16} /> {children}
    </Link>
  );
}
