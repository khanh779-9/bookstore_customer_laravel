# Implementation Plan - Backend Refactoring for Clean Code

## 1. Preparation & Foundation
- [x] Create `app/Services` directory.
- [x] Create `app/Http/Resources` directory.
- [x] Create `app/Http/Requests` directory.

## 2. API Resources (Transforming Data)
- [x] Create `SanPhamResource` to standardize product output.
- [x] Create `HoaDonResource` and `ChiTietHoaDonResource` for order details.
- [x] Create `KhachHangResource` for user profiles.
- [x] Create `DanhMucResource`, `TacGiaResource`, `NhaCungCapResource`, `NhaXuatBanResource`.

## 3. Form Requests (Validation)
- [x] Create `Auth/LoginRequest` and `Auth/RegisterRequest`.
- [x] Create `Product/SearchRequest`.
- [x] Create `Order/CheckoutRequest`.
- [x] Create `Product/ReviewRequest`.

## 4. Services (Business Logic)
- [x] **ProductService**: Move filtering, featured products, and review stats logic here.
- [x] **CartService**: Move cart management (add/update/remove) logic here, handling both session and DB.
- [x] **OrderService**: Move order creation, status updates, and stock management here.
- [x] **WishlistService**: Move wishlist toggle and retrieval logic here.

## 5. Controller Refactoring
- [x] **ProductController**: Use `ProductService` and `SanPhamResource`. Remove manual review logic.
- [x] **OrderController**: Use `OrderService` and `HoaDonResource`. Remove checkout preparation logic.
- [x] **CartController**: Use `CartService`.
- [x] **AuthController**: Use `AuthService` and `KhachHangResource`.

## 6. Model Cleanup
- [x] Remove excessive logic from Models (keep only relationships, scopes, and basic accessors).
- [x] Ensure consistent naming conventions for accessors.
- [x] Add missing type hints and return types.

## 7. Final Polish
- [x] Ensure all API responses follow a consistent format.
