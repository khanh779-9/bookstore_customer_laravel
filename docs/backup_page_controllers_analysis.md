# Phân Tích Backup Page Controllers

## Tổng quan

Project cũ sử dụng kiến trúc **MVC thuần (plain PHP)** với 2 file Page Controller chính:

---

## 1. `PageController.php` — Controller cho phía **Khách hàng**

| Method | Chức năng | Dữ liệu trả về |
|---|---|---|
| `prepareProductsPage()` | Trang danh sách sản phẩm - lọc theo search, danh mục, giá, NCC, NXB, sắp xếp | `products`, `catalogs`, `providers`, `publishers`, `globalMin/Max`, `minPrice/maxPrice`, `sortBy`, `search`, `categoryId`, `providerId`, `publisherId` |
| `prepareNotifications()` | Trang thông báo KH - phân loại: orders/promotions/system | `notifications`, `counts`, `tab`, `limit` |
| `prepareProductViewPage($id)` | Trang chi tiết sản phẩm | `product`, `reviews` |
| `prepareHeader()` | Dữ liệu cho header: menu, cart count, notifications | `search`, `catalogs`, `cart_count`, `notifications`, `notification_count`, `csrf_token` |
| `prepareHome()` | Trang chủ | `featured`, `bestSellers`, `newArrivals` |
| `prepareCart()` | Trang giỏ hàng (hỗ trợ cả guest cart) | `cart_items`, `cart_total` |
| `prepareCheckout()` | Trang thanh toán | `addresses`, `cart_items`, `cart_total` |
| `prepareAccount()` | Trang tài khoản KH | `account_customer`, `account_orders`, `account_wishlist`, `customer_addresses` |
| `fetchRecentOrders()` | Lấy đơn hàng gần đây (trả HTML string) | HTML string cho bảng đơn hàng |

---

## 2. `EmployeePageController.php` — Controller cho phía **Nhân viên (Admin)**

| Method | Chức năng | Dữ liệu trả về |
|---|---|---|
| `prepareEmployeeDashboard($period)` | Dashboard admin - thống kê doanh thu, đơn hàng, KH | `stats`, `topProducts`, `recentOrders`, `orderStats`, `customerStats`, `lowStockAlerts`, `revenueByDate`, `totalRevenue`, `totalOrders`, `avgOrderValue`, `revenueChange`, `ordersChange` |
| `prepareEmployeeProducts($subpage, $id)` | CRUD sản phẩm (list/edit) + phân trang | `products`, `product`, `productDetails`, `catalogs`, `publishers`, `providers`, `authors`, `loaisach`, `pagination` |
| `prepareEmployeeOrders($subpage, $id)` | Quản lý đơn hàng + phân trang | `orders`, `order`, `items`, `pagination` |
| `prepareEmployeeCustomers($subpage, $id)` | Quản lý KH + phân trang | `customers`, `pagination` |
| `prepareEmployeeEmployees($subpage, $id)` | Quản lý nhân viên | `employees`, `employee_data` |
| `prepareEmployeeProfile($employee_id)` | Profile nhân viên | `employee_data`, `processedCount` |
| `prepareEmployeeReports($startDate, $endDate)` | Báo cáo thống kê + xuất CSV/Excel/PDF | `bestSellers`, `allOrders`, `orderStats`, `revenueByDate`, `customerStats`, `inventory` |
| `prepareEmployeeSettings()` | Cài đặt | `allEmployees` |
| `prepareEmployeePublishers($subpage, $id)` | CRUD nhà xuất bản + phân trang | `publishers`, `publisher`, `pagination` |
| `prepareEmployeeProviders($subpage, $id)` | CRUD nhà cung cấp + phân trang | `providers`, `provider`, `pagination` |
| `prepareEmployeeCategories($subpage, $id)` | CRUD danh mục + phân trang | `categories`, `category`, `pagination` |
| `prepareEmployeePromotions($subpage, $id)` | CRUD khuyến mãi | `promotions`, `promotion` |

---

## So sánh với project Laravel hiện tại

Project Laravel hiện có các controller sau:

| Laravel Controller | Tương ứng trong backup |
|---|---|
| `ProductController.php` | `PageController::prepareProductsPage()` + `prepareProductViewPage()` + `EmployeePageController::prepareEmployeeProducts()` |
| `CartController.php` | `PageController::prepareCart()` |
| `OrderController.php` | `PageController::prepareCheckout()` + `EmployeePageController::prepareEmployeeOrders()` |
| `CustomerAccountController.php` | `PageController::prepareAccount()` |
| `EmployeeAccountController.php` | `EmployeePageController::prepareEmployeeEmployees()` + `prepareEmployeeProfile()` |
| `NotificationController.php` | `PageController::prepareNotifications()` |
| `AuthorController.php` | (một phần của `EmployeePageController::prepareEmployeeProducts()`) |
| `LoaiSachController.php` | (một phần của `EmployeePageController::prepareEmployeeProducts()`) |
| `UnitController.php` | Mới thêm |

### Chức năng trong backup **chưa có** trong Laravel:

> [!IMPORTANT]
> Các chức năng sau từ project cũ chưa thấy trong project Laravel mới:

1. **`prepareHome()`** — Trang chủ (featured, bestSellers, newArrivals)
2. **`prepareHeader()`** — Dữ liệu header chung (menu, cart count, thông báo)
3. **`prepareEmployeeDashboard()`** — Dashboard admin với thống kê
4. **`prepareEmployeeReports()`** — Báo cáo + xuất CSV/Excel/PDF
5. **`prepareEmployeeSettings()`** — Cài đặt
6. **`prepareEmployeePublishers()`** — CRUD nhà xuất bản
7. **`prepareEmployeeProviders()`** — CRUD nhà cung cấp
8. **`prepareEmployeeCategories()`** — CRUD danh mục
9. **`prepareEmployeePromotions()`** — CRUD khuyến mãi
10. **`prepareCheckout()`** — Logic checkout (addresses + cart)
11. **Guest Cart** — Hỗ trợ giỏ hàng cho khách chưa đăng nhập
12. **`fetchRecentOrders()`** — Widget đơn hàng gần đây

---

## Đặc điểm nổi bật của code backup

> [!NOTE]
> Các pattern đáng chú ý trong code cũ:

- **Phân trang server-side** với pattern: `$perPage`, `$currentPage`, `getXxxPage()` → `{items, total}`
- **Notification categorization** — tự động phân loại thông báo dựa trên nội dung (regex tiếng Việt)
- **Guest cart** — session-based cart cho khách chưa đăng nhập
- **Export reports** — hỗ trợ CSV, Excel (SimpleXLSXGen), PDF (mPDF)
- **Product type detection** — `is_book_category()` / `is_stationery_category()` để phân biệt Sách vs VPP
- **Dashboard stats comparison** — so sánh với kỳ trước (previous period) để tính % thay đổi
