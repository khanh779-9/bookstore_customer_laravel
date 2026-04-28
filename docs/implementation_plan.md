# Chuyển đổi BookStore sang kiến trúc Laravel (Backend) + React (Frontend)

## Mô tả
Chuyển đổi project nhà sách BookZone từ kiến trúc Laravel monolith (Blade views) hiện tại sang kiến trúc **Backend (Laravel API)** + **Frontend (React SPA)** riêng biệt, dựa trên code backup PHP thuần trước đó và code Laravel hiện tại.

## Tình trạng hiện tại

### Project hiện tại (`bookstore_customer_laravel`)
- **Backend**: Laravel 12 với Blade templates (server-side rendering)
- **9 Controllers**: `CartController`, `CustomerAuthController`, `CustomerPortalController`, `EmployeeAuthController`, `EmployeePortalController`, `HomeController`, `OrderController`, `ProductController`
- **17 Models**: `SanPham`, `Sach`, `VanPhongPham`, `KhachHang`, `NhanVien`, `HoaDon`, `ChiTietHoaDon`, `DanhGia`, `DanhMucSanPham`, `NhaCungCap`, `NhaXuatBan`, `KhuyenMai`, `ChiTietKhuyenMai`, `SanPhamYeuThich`, `ThongBao`, `DiaChiGiaoHang`
- **3 Middleware**: `EnsureCustomerAuthenticated`, `EnsureEmployeeAuthenticated`, `EnsureEmployeeRole`
- **Views**: Blade templates (layouts, auth, cart, customer, employee, home, orders, pages, products)
- **Database**: MySQL `db_nhasach` (Railway) - 17 bảng

### Project backup (`bookstore_customer_BACKUP_BEFORE_LARAVEL_20260224`)
- PHP thuần với MVC pattern tự xây dựng
- 9 controllers, 17 models, nhiều views (PHP template)
- Routing qua `index.php` với `$_GET['page']`

### Database Schema (17 bảng)
| Bảng | Mô tả | PK |
|------|--------|-----|
| `sanpham` | Sản phẩm chung | `sanpham_id` |
| `sach` | Sách (extends sanpham) | `sach_id` → `sanpham_id` |
| `vanphongpham` | Văn phòng phẩm (extends sanpham) | `vpp_id` → `sanpham_id` |
| `danhmucsanpham` | Danh mục SP | `danhmucSP_id` |
| `loaisach` | Loại sách | `loaisach_code` (enum) |
| `tacgia` | Tác giả | `tacgia_id` |
| `nhaxuatban` | Nhà xuất bản | `nhaxuatban_id` |
| `nhacungcap` | Nhà cung cấp | `nhacungcap_id` |
| `donvitinh` | Đơn vị tính | `donvitinh_id` |
| `khachhang` | Khách hàng | `khachhang_id` |
| `nhanvien` | Nhân viên | `nhanvien_id` |
| `giohang` | Giỏ hàng | `giohang_id` → `khachhang_id` |
| `chitietgiohang` | Chi tiết giỏ hàng | `ctgh_id` |
| `hoadon` | Hóa đơn | `hoadon_id` |
| `chitiethoadon` | Chi tiết hóa đơn | `cthd_id` |
| `khuyenmai` | Khuyến mãi | `khuyenmai_id` |
| `chitietkhuyenmai` | Chi tiết khuyến mãi | `ctkm_id` |
| `danhgia` | Đánh giá | `danhgia_id` |
| `sanphamyeuthich` | SP yêu thích | `spyt_id` |
| `diachi_giaohang` | Địa chỉ giao hàng | `dcgh_id` |
| `thongbao` | Thông báo | `thongbao_id` |

---

## User Review Required

> [!IMPORTANT]
> **Tổ chức thư mục**: Project sẽ được chia thành 2 thư mục riêng biệt:
> ```
> bookstore_customer_laravel/
> ├── backend/          ← Laravel API (move từ root)
> ├── frontend/         ← React SPA (tạo mới bằng Vite)
> └── template_database/ ← Giữ nguyên
> ```
> Điều này có nghĩa là tất cả file Laravel hiện tại ở root sẽ được **di chuyển vào `backend/`**.

> [!WARNING]
> **Breaking change**: Toàn bộ Blade views sẽ bị loại bỏ, thay bằng React components. Frontend sẽ gọi Backend qua REST API.

> [!IMPORTANT]
> **Authentication**: Sẽ chuyển từ session-based sang **Laravel Sanctum (API token)** để frontend React có thể xác thực qua SPA cookies hoặc Bearer token.

---

## Open Questions

> [!IMPORTANT]
> 1. **Vite vs CRA cho React?** - Tôi sẽ dùng **Vite** (nhanh, hiện đại). Bạn có muốn dùng framework khác không?
> 2. **CSS Framework cho React?** - Bạn muốn dùng **TailwindCSS** (tương thích với project hiện tại) hay Vanilla CSS / Material UI?
> 3. **Employee Portal**: Phần quản lý nhân viên (admin panel) có cần chuyển sang React không, hay chỉ cần phần khách hàng trước?
> 4. **Giữ nguyên DB schema hay tạo migration mới?** - Database hiện tại đã có data. Tôi recommend **giữ nguyên schema**, chỉ thêm bảng `personal_access_tokens` cho Sanctum.

---

## Proposed Changes

### Phase 1: Restructure — Di chuyển Laravel vào `backend/`

#### Bước 1: Di chuyển toàn bộ file Laravel hiện tại vào thư mục `backend/`
- Di chuyển tất cả file/folder Laravel (app, bootstrap, config, database, public, resources, routes, storage, tests, vendor, artisan, composer.json, .env, v.v.) vào `backend/`
- Giữ lại `template_database/` ở root
- Giữ lại `.git/`, `.gitignore` ở root

---

### Phase 2: Backend — Chuyển Laravel sang REST API

#### [MODIFY] `backend/routes/api.php`
- Tạo file routes API thay thế `web.php`
- Tất cả routes trả về JSON thay vì Blade views
- Prefix: `/api/v1/`

**API Endpoints:**

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| **Auth** | | |
| POST | `/api/v1/auth/login` | Đăng nhập KH |
| POST | `/api/v1/auth/register` | Đăng ký KH |
| POST | `/api/v1/auth/logout` | Đăng xuất |
| POST | `/api/v1/auth/google` | Google OAuth |
| POST | `/api/v1/auth/forgot-password` | Quên MK |
| POST | `/api/v1/auth/verify-code` | Xác nhận mã |
| POST | `/api/v1/auth/reset-password` | Đặt lại MK |
| **Products** | | |
| GET | `/api/v1/products` | Danh sách SP (filter, sort, paginate) |
| GET | `/api/v1/products/{id}` | Chi tiết SP |
| GET | `/api/v1/categories` | Danh mục |
| GET | `/api/v1/publishers` | NXB |
| GET | `/api/v1/providers` | NCC |
| **Cart** | | |
| GET | `/api/v1/cart` | Xem giỏ hàng |
| POST | `/api/v1/cart` | Thêm SP vào giỏ |
| PATCH | `/api/v1/cart/{id}` | Cập nhật SL |
| DELETE | `/api/v1/cart/{id}` | Xóa khỏi giỏ |
| **Orders** | | |
| GET | `/api/v1/orders` | Danh sách đơn hàng |
| GET | `/api/v1/orders/{id}` | Chi tiết đơn hàng |
| POST | `/api/v1/orders` | Tạo đơn hàng |
| **Wishlist** | | |
| GET | `/api/v1/wishlist` | DS yêu thích |
| POST | `/api/v1/wishlist/toggle` | Toggle yêu thích |
| **Account** | | |
| GET | `/api/v1/account` | Thông tin TK |
| PUT | `/api/v1/account/profile` | Cập nhật TK |
| PUT | `/api/v1/account/password` | Đổi MK |
| **Addresses** | | |
| GET | `/api/v1/addresses` | DS địa chỉ |
| POST | `/api/v1/addresses` | Thêm địa chỉ |
| PUT | `/api/v1/addresses/{id}` | Sửa địa chỉ |
| DELETE | `/api/v1/addresses/{id}` | Xóa địa chỉ |
| **Notifications** | | |
| GET | `/api/v1/notifications` | DS thông báo |
| POST | `/api/v1/notifications/mark-all` | Đánh dấu đã đọc |
| **Reviews** | | |
| POST | `/api/v1/products/{id}/reviews` | Đánh giá SP |
| **Home** | | |
| GET | `/api/v1/home` | Data trang chủ |
| **Employee Auth** | | |
| POST | `/api/v1/employee/login` | Đăng nhập NV |
| POST | `/api/v1/employee/logout` | Đăng xuất NV |
| **Employee Portal** | | |
| GET | `/api/v1/employee/dashboard` | Dashboard |
| GET | `/api/v1/employee/products` | Quản lý SP |
| GET | `/api/v1/employee/orders` | Quản lý ĐH |
| PATCH | `/api/v1/employee/orders/{id}/status` | Cập nhật trạng thái ĐH |
| GET | `/api/v1/employee/customers` | DS khách hàng |
| GET | `/api/v1/employee/employees` | DS nhân viên |
| GET | `/api/v1/employee/publishers` | DS NXB |
| GET | `/api/v1/employee/providers` | DS NCC |
| GET | `/api/v1/employee/categories` | DS danh mục |
| GET | `/api/v1/employee/promotions` | DS khuyến mãi |
| GET | `/api/v1/employee/reports` | Báo cáo |

#### [MODIFY] Controllers → trả JSON thay vì Blade views
- Tất cả controllers sẽ return `response()->json()` 
- Giữ nguyên logic business từ controllers hiện tại

#### [NEW] `backend/app/Http/Controllers/Api/` — API Controllers
- `AuthController.php` (merge CustomerAuth + EmployeeAuth)
- `ProductController.php`
- `CartController.php`
- `OrderController.php`
- `AccountController.php`
- `WishlistController.php`
- `NotificationController.php`
- `HomeController.php`
- `EmployeeController.php`

#### [MODIFY] Authentication → Laravel Sanctum
- Install `laravel/sanctum`
- Cấu hình SPA authentication (cookie-based cho same-domain)
- Middleware: `auth:sanctum`

#### [DELETE] `backend/resources/views/` — Xóa Blade views
- Không cần Blade views nữa (frontend React đảm nhận)

---

### Phase 3: Frontend — React SPA với Vite

#### [NEW] `frontend/` — Tạo project React bằng Vite

```
frontend/
├── public/
│   └── assets/         ← Copy hình ảnh từ backup
├── src/
│   ├── api/            ← Axios API client
│   │   └── client.js
│   ├── components/     ← Reusable components
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Product/
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProductGrid.jsx
│   │   ├── Cart/
│   │   │   └── CartItem.jsx
│   │   └── Common/
│   │       ├── Loading.jsx
│   │       ├── Pagination.jsx
│   │       └── Alert.jsx
│   ├── contexts/       ← React Context
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/          ← Custom hooks
│   │   ├── useAuth.js
│   │   └── useCart.js
│   ├── pages/          ← Pages (match routes)
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Account.jsx
│   │   ├── Orders.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Notifications.jsx
│   │   ├── Contact.jsx
│   │   ├── About.jsx
│   │   └── employee/
│   │       ├── Dashboard.jsx
│   │       ├── Products.jsx
│   │       ├── Orders.jsx
│   │       └── ...
│   ├── styles/         ← CSS files
│   │   └── index.css
│   ├── App.jsx         ← Router setup
│   └── main.jsx        ← Entry point
├── index.html
├── package.json
└── vite.config.js
```

#### Dependencies chính cho React:
- `react`, `react-dom`
- `react-router-dom` — Client routing
- `axios` — HTTP client
- `react-icons` — Icons
- `react-hot-toast` — Notifications

---

### Phase 4: Mapping cũ → mới

| Trang cũ (backup) | Blade view (Laravel) | React Page |
|----|----|----|
| `home` | `home/index.blade.php` | `Home.jsx` |
| `products` | `products/index.blade.php` | `Products.jsx` |
| `productview` | `products/show.blade.php` | `ProductDetail.jsx` |
| `cart` | `cart/index.blade.php` | `Cart.jsx` |
| `checkout` | `orders/create.blade.php` | `Checkout.jsx` |
| `login` | `auth/customer-login.blade.php` | `Login.jsx` |
| `register` | `auth/customer-register.blade.php` | `Register.jsx` |
| `account` | `customer/account.blade.php` | `Account.jsx` |
| `orders` | `customer/orders.blade.php` | `Orders.jsx` |
| `contact` | `pages/contact.blade.php` | `Contact.jsx` |
| `about` | `pages/about.blade.php` | `About.jsx` |
| `employee_*` | `employee/*.blade.php` | `employee/*.jsx` |

---

## Verification Plan

### Automated Tests
1. `cd backend && php artisan test` — Laravel tests
2. `cd frontend && npm run build` — React build check
3. Test API endpoints with `curl` / Postman

### Manual Verification
1. Chạy backend: `cd backend && php artisan serve` (port 8000)
2. Chạy frontend: `cd frontend && npm run dev` (port 5173)
3. Test flow: Trang chủ → Sản phẩm → Chi tiết → Thêm giỏ → Đăng nhập → Checkout
4. Test employee login & dashboard

---

## Thứ tự thực hiện
1. **Phase 1**: Di chuyển file Laravel vào `backend/` (~5 phút)
2. **Phase 2**: Cài Sanctum + Tạo API routes + Controllers (~30 phút)  
3. **Phase 3**: Tạo React app + Pages cốt lõi (~45 phút)
4. **Phase 4**: Polish & Testing (~15 phút)

> [!NOTE]
> Tổng thời gian ước tính: **~1.5–2 giờ** cho phần cốt lõi. Employee portal có thể làm sau nếu cần.
