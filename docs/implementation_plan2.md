# Kế Hoạch Đồng Bộ Giao Diện & Hoàn Thiện Tính Năng (Phase 6)

Mục tiêu của giai đoạn này là đảm bảo dự án React SPA có **giao diện giống hệt 100%** với dự án cũ (sử dụng màu xanh, logo, hình ảnh cũ) và đảm bảo **không thiếu bất kỳ trang chức năng nào**.

## Hiện Trạng
1. **Giao diện (UI)**: Dự án React hiện tại đang dùng CSS thuần cơ bản. Dự án cũ sử dụng **Bootstrap 5** kết hợp với file `style.css` tùy chỉnh (chứa mã màu `--primary-color: #0dfd69`). Do đó giao diện hiện tại đang bị khác so với bản gốc.
2. **Hình ảnh & Logo**: Các file ảnh (`bookstoreLogo.png`, ảnh banner) đã được copy sang thư mục `public/assets` nhưng chưa được gắn vào các Component (Header, Footer).
3. **Các trang còn thiếu**: 
   - Khách hàng: Chưa code giao diện chi tiết cho `About` (Về chúng tôi), `Contact` (Liên hệ).
   - Quản trị (Employee): Chưa làm các trang Quản lý Danh Mục, Nhà Xuất Bản, Nhà Cung Cấp, Nhân Viên, và Báo Cáo.

## Proposed Changes

### 1. Phục hồi Giao diện gốc (UI Restoration)
- **Cài đặt Bootstrap**: Cài đặt thư viện `bootstrap` và `bootstrap-icons` vào Frontend để nhận diện toàn bộ các class từ dự án cũ.
- **Tích hợp CSS cũ**: Copy nguyên bản file `style.css` từ dự án cũ sang `frontend/src/assets/style.css` và import vào dự án.
- **Chỉnh sửa Header & Footer**: Áp dụng lại cấu trúc HTML/Bootstrap chuẩn của file `header.php` và `footer.php` cũ sang `Header.jsx` và `Footer.jsx`. Gắn chính xác file logo `bookstoreLogo.png`.

### 2. Hoàn thiện các trang Khách Hàng (Customer)
- [NEW] Cập nhật giao diện `Home.jsx` với Banner Carousel y hệt cũ.
- [NEW] Xây dựng trang `Contact.jsx` và `About.jsx` dựa trên bản sao lưu.

### 3. Hoàn thiện toàn bộ các trang Nội Bộ (Employee Admin)
Bổ sung các bảng quản trị (CRUD) còn thiếu để đảm bảo hoạt động giống dự án cũ 100%:
- [NEW] `EmployeeCategories.jsx` (Quản lý Danh mục)
- [NEW] `EmployeePublishers.jsx` (Quản lý NXB)
- [NEW] `EmployeeProviders.jsx` (Quản lý Nhà cung cấp)
- [NEW] `EmployeeEmployees.jsx` (Quản lý Nhân viên)
- [NEW] `EmployeeReports.jsx` (Báo cáo doanh thu)

## User Review Required

> [!IMPORTANT]
> - Dự án cũ dùng màu chủ đạo là `#0dfd69` (Xanh lá sáng). Tôi sẽ bê nguyên file `style.css` cũ sang nên màu sắc, kích thước và font chữ sẽ được giữ nguyên 100%. Bạn có đồng ý cài đặt thêm Bootstrap vào dự án React không?
> - Các trang Admin còn thiếu sẽ được tôi code với giao diện bảng Bootstrap đồng nhất. Bạn hãy xem qua danh sách trên và xác nhận để tôi bắt đầu thực hiện nhé!
