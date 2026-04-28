import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import CustomerLayout from './components/Layout/CustomerLayout';
import EmployeeLayout from './components/Layout/EmployeeLayout';

// Customer Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Notifications from './pages/Notifications';
import Contact from './pages/Contact';
import About from './pages/About';

// Policy Pages
import PolicyBaoMat from './pages/policies/PolicyBaoMat';
import ReturnPolicy from './pages/policies/ReturnPolicy';
import WarrantyPolicy from './pages/policies/WarrantyPolicy';
import ShippingPolicy from './pages/policies/ShippingPolicy';

// Employee Pages
import EmployeeLogin from './pages/employee/EmployeeLogin';
import Dashboard from './pages/employee/Dashboard';
import EmployeeOrders from './pages/employee/EmployeeOrders';
import EmployeeProducts from './pages/employee/EmployeeProducts';
import EmployeeCustomers from './pages/employee/EmployeeCustomers';
import EmployeeCategories from './pages/employee/EmployeeCategories';
import EmployeePublishers from './pages/employee/EmployeePublishers';
import EmployeeProviders from './pages/employee/EmployeeProviders';
import EmployeeReports from './pages/employee/EmployeeReports';

function App() {
  return (
    <div className="app-container font-sans bg-gray-50 text-gray-800 min-h-screen">
      <Toaster position="top-right" />
      
      <Routes>
        {/* Customer Routes with Layout */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          
          {/* Policies */}
          <Route path="/privacy-policy" element={<PolicyBaoMat />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/warranty-policy" element={<WarrantyPolicy />} />
          <Route path="/shipping-delivery" element={<ShippingPolicy />} />
          
          {/* Customer Auth Routes */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        
        {/* Employee Routes */}
        <Route path="/admin/login" element={<EmployeeLogin />} />
        <Route path="/admin" element={<EmployeeLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<EmployeeOrders />} />
          <Route path="products" element={<EmployeeProducts />} />
          <Route path="categories" element={<EmployeeCategories />} />
          <Route path="publishers" element={<EmployeePublishers />} />
          <Route path="providers" element={<EmployeeProviders />} />
          <Route path="customers" element={<EmployeeCustomers />} />
          <Route path="reports" element={<EmployeeReports />} />
          <Route path="settings" element={<div className="p-8"><h2>Cài đặt hệ thống (Đang phát triển)</h2></div>} />
        </Route>

        <Route path="*" element={<div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-6xl font-black text-gray-300 mb-4">404</h1>
          <p className="text-xl text-gray-500 mb-8">Trang không tồn tại.</p>
          <a href="/" className="px-6 py-3 bg-primary text-white rounded-full font-bold">Về trang chủ</a>
        </div>} />
      </Routes>
    </div>
  );
}

export default App;

