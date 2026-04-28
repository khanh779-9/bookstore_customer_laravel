# Kế Hoạch Đồng Bộ Giao Diện với Tailwind CSS (Phase 6 - V2)

Mục tiêu: Sử dụng **Tailwind CSS** để tái tạo giao diện Bookstore cũ một cách hiện đại, giữ nguyên màu sắc chủ đạo, logo và hình ảnh.

## Proposed Changes

### 1. Thiết lập Tailwind CSS
- Cài đặt `tailwindcss`, `postcss`, `autoprefixer` via npm.
- Khởi tạo `tailwind.config.js`.
- Cấu hình màu chủ đạo (Primary: `#0dfd69`) vào file config để sử dụng qua các class như `bg-primary`, `text-primary`.

### 2. Tái cấu trúc UI (Tailwind Style)
- **Header.jsx**: Sử dụng Tailwind để tạo navbar. Gắn logo `bookstoreLogo.png`.
- **Footer.jsx**: Thiết kế lại theo phong cách cũ nhưng dùng utility classes của Tailwind.
- **Home.jsx**: Cập nhật Banner/Carousel và danh sách sản phẩm theo thiết kế card của dự án cũ (sử dụng shadow, hover effects của Tailwind).

### 3. Đồng bộ hóa màu sắc & Assets
- Chuyển đổi các quy tắc quan trọng trong `style.css` cũ sang custom CSS trong `index.css` (kết hợp với Tailwind `@layer components`).
- Đảm bảo toàn bộ icon sử dụng `react-icons` thay vì FontAwesome cũ để đồng nhất với React.

### 4. Hoàn thiện các trang còn thiếu
Xây dựng các trang quản trị sau bằng Tailwind:
- `EmployeeCategories.jsx`
- `EmployeePublishers.jsx`
- `EmployeeProviders.jsx`
- `EmployeeEmployees.jsx`
- `EmployeeReports.jsx`

## User Review Required

> [!IMPORTANT]
> Tôi sẽ bắt đầu bằng việc cài đặt Tailwind CSS. Quá trình này sẽ thay đổi file `index.css` hiện tại. Bạn có xác nhận để tôi thực hiện bước cài đặt này không?
