import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiHome, FiShoppingBag, FiBox, FiUsers, FiSettings, FiLogOut, FiMenu, FiGrid, FiTruck, FiBook, FiBarChart2 } from 'react-icons/fi';
import { useState } from 'react';

export default function EmployeeLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: <FiHome />, label: 'Tổng quan' },
    { path: '/admin/orders', icon: <FiShoppingBag />, label: 'Đơn hàng' },
    { path: '/admin/products', icon: <FiBox />, label: 'Sản phẩm' },
    { path: '/admin/categories', icon: <FiGrid />, label: 'Danh mục' },
    { path: '/admin/publishers', icon: <FiBook />, label: 'Nhà xuất bản' },
    { path: '/admin/providers', icon: <FiTruck />, label: 'Nhà cung cấp' },
    { path: '/admin/customers', icon: <FiUsers />, label: 'Khách hàng' },
    { path: '/admin/reports', icon: <FiBarChart2 />, label: 'Báo cáo' },
    { path: '/admin/settings', icon: <FiSettings />, label: 'Cài đặt' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className={`bg-[#111827] text-gray-300 transition-all duration-300 flex flex-col sticky top-0 h-screen ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-800 overflow-hidden whitespace-nowrap">
          <span className={`text-xl font-bold text-white transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
            BookZone Admin
          </span>
        </div>
        
        <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex items-center gap-4 px-6 py-3 transition-colors hover:bg-gray-800 hover:text-white ${location.pathname.startsWith(item.path) ? 'bg-gray-800 text-primary border-r-4 border-primary' : ''}`}
              title={item.label}
            >
              <span className="text-xl shrink-0">{item.icon}</span>
              <span className={`font-medium transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-4 w-full p-3 rounded-none text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <FiLogOut className="text-xl shrink-0" />
            <span className={`font-medium transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
              Đăng xuất
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-20 bg-white shadow-none border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <button className="text-2xl text-gray-500 hover:text-gray-800" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-gray-800">{user?.ho} {user?.ten}</div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">
                {user?.role === 'admin' ? 'Quản trị viên' : 'Nhân viên'}
              </div>
            </div>
            <div className="w-10 h-10 rounded-none bg-primary flex items-center justify-center text-white font-bold shadow-none">
              {user?.ten?.charAt(0) || 'A'}
            </div>
          </div>
        </header>
        
        <main className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



