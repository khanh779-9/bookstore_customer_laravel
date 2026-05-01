import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FiHome,
  FiShoppingBag,
  FiBox,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiGrid,
  FiTruck,
  FiBook,
  FiBarChart2,
  FiX,
} from "react-icons/fi";
import { useState, useEffect } from "react";

export default function EmployeeLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 1024;
      setIsMobile(mobile);
      if (!mobile && !sidebarOpen) {
        // Keep collapsed on desktop if it was collapsed,
        // but if we were mobile and moved to desktop, show it
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  // Close sidebar on navigation on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  const handleLogout = async () => {
    await logout();
    navigate("/internal/login");
  };

  const navItems = [
    { path: "/internal/dashboard", icon: <FiHome />, label: "Tổng quan" },
    { path: "/internal/orders", icon: <FiShoppingBag />, label: "Đơn hàng" },
    { path: "/internal/products", icon: <FiBox />, label: "Sản phẩm" },
    { path: "/internal/categories", icon: <FiGrid />, label: "Danh mục" },
    { path: "/internal/publishers", icon: <FiBook />, label: "Nhà xuất bản" },
    { path: "/internal/providers", icon: <FiTruck />, label: "Nhà cung cấp" },
    { path: "/internal/customers", icon: <FiUsers />, label: "Khách hàng" },
    { path: "/internal/reports", icon: <FiBarChart2 />, label: "Báo cáo" },
    { path: "/internal/settings", icon: <FiSettings />, label: "Cài đặt" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans overflow-x-hidden">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[40] transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col z-[50]
        fixed inset-y-0 left-0
        ${sidebarOpen ? "w-72 translate-x-0" : isMobile ? "w-72 -translate-x-full" : "w-20 translate-x-0"}
      `}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50 overflow-hidden whitespace-nowrap bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center text-white font-black text-xl">
              B
            </div>
            <span
              className={`text-lg font-black text-white tracking-tight uppercase transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 invisible w-0"}`}
            >
              BookZone{" "}
              <span className="text-primary font-bold text-[10px] ml-1 px-1.5 py-0.5 bg-primary/10 rounded-sm">
                PRO
              </span>
            </span>
          </div>
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <FiX size={24} />
            </button>
          )}
        </div>

        <nav className="flex-1 py-6 overflow-y-auto overflow-x-hidden custom-scrollbar space-y-1 px-2">
          {navItems.map((item) => {
            const active = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-4 px-4 py-3 rounded-sm transition-all
                  w-full
                  ${active ? "bg-primary text-white shadow-lg shadow-primary/20" : "hover:bg-slate-800/50 hover:text-white"}
                  ${!sidebarOpen && !isMobile ? "justify-center" : ""}
                `}
                title={item.label}
              >
                <span
                  className={`text-xl shrink-0 ${active ? "text-white" : "text-slate-400"}`}
                >
                  {item.icon}
                </span>
                <span
                  className={`font-bold text-sm tracking-wide transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 invisible w-0 hidden h-[100px]"}`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-md">
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-4 w-full p-3 rounded-sm text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all cursor-pointer
              ${!sidebarOpen && !isMobile ? "justify-center" : ""}
            `}
          >
            <FiLogOut className="text-xl shrink-0" />
            <span
              className={`font-bold text-sm tracking-wide transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 invisible w-0"}`}
            >
              Đăng xuất
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col min-w-0 max-w-full transition-all duration-300 ${!isMobile ? (sidebarOpen ? "pl-72" : "pl-20") : ""}`}>
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[30] backdrop-blur-md bg-white/80">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-sm bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm border border-slate-200 cursor-pointer active:scale-95"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu size={20} />
          </button>

          <div className="flex items-center gap-4 ml-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-black text-slate-900 tracking-tight">
                {user?.ho} {user?.ten}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-black text-slate-400">
                {user?.role === "admin" ? "Quản trị viên" : "Nhân viên"}
              </div>
            </div>
            <div className="w-10 h-10 rounded-sm bg-slate-900 flex items-center justify-center text-white font-black shadow-lg shadow-slate-200 border border-slate-800">
              {user?.ten?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1 w-full max-w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
