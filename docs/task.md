# Task: Chuyển đổi BookStore → Laravel API + React SPA

## Phase 1: Restructure — Di chuyển Laravel vào `backend/`
- [x] Di chuyển toàn bộ file Laravel vào `backend/`
- [x] Giữ `template_database/` ở root

## Phase 2: Backend — Laravel REST API
 - [x] Cài Laravel Sanctum
 - [x] Tạo API routes (`routes/api.php`)
- [x] Tạo API Controllers (Auth, Product, Cart, Order, Account, Home, Employee)
 - [x] Cấu hình CORS cho React frontend
 - [x] Xóa Blade views (không cần nữa)

## Phase 3 & Phase 4: Frontend — React SPA (Vite) & UI
- [x] Khởi tạo React project bằng Vite
- [x] Cài dependencies (react-router-dom, axios, react-icons, react-hot-toast)
- [x] Tạo API client (axios)
- [x] Tạo Context (Auth, Cart)
- [x] Tạo Layout components (Header, Footer, EmployeeLayout)
- [x] Tạo Pages Khách Hàng:
  - [x] Home, Products, ProductDetail, Cart, Checkout
  - [x] Login, Register, Account, Orders, Wishlist, Notifications
  - [x] Contact, About, Policies (Privacy, Return, Warranty, Shipping)
- [x] Tạo Employee Pages (Dashboard, Login, Products, Orders, Customers)
- [x] Kết nối CRUD Logic Backend (Thêm/Sửa/Xóa Sản phẩm)
- [x] CSS / Styling

## Phase 5: Verification & Integration
- [x] Backend API test
- [x] Frontend build check (npm run build OK)
- [x] Integration test
