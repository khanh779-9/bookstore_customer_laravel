**Project Overview**
- **Path:** C:\Users\quock\OneDrive\Máy tính\TTCN\bookstore_customer_BACKUP_BEFORE_LARAVEL_20260224
- **Type:** Custom PHP MVC-like application (legacy codebase, not Laravel)
- **High-level components:** `app/` (controllers, models, views, core), `public/`, libs (PHPMailer, Mpdf, SimpleXLSXGen), `assets/`, `config/` and helper scripts.

**Key Findings (Architecture & Flow)**
- **Bootstrap:** `index.php` (root) initializes session, loads autoloader, models, controllers and provides a simple routing and page dispatch mechanism. It also emits a CSRF token into `$_SESSION`.
- **Routing:** Lightweight custom router in `app/core/Router.php` that maps `?page=` / `?action=` to controller methods, with simple validation to reduce accidental exposures.
- **Database access:** `app/core/Database.php` builds a PDO instance from `app/config.php` and exposes `Database::getInstance()` used by models.
- **Model layer:** `app/models/*` contains table-specific models (e.g., `product.php`) with methods using PDO prepared statements for most operations. `ProductModel` mixes raw SQL, unions and transaction usage for complex writes.
- **Controllers & Views:** `app/controllers/*` provide controller actions; `app/views/*` contain PHP views. The app uses controller preparer functions to build view data then includes view files.
- **Third-party libs:** bundled (not composer-managed) clients: Google API client, PHPMailer, Mpdf, SimpleXLSXGen, and XLSX helpers under `app/`.

**Security & Maintainability Issues**
- **Hard-coded credentials:** `app/config.php` contains database credentials in source. (REDACTED in this report). Replace with environment variables and a `.env` loader.
- **Error handling:** `Database::getInstance()` calls `die()` on connection failure — leaks full PDO exception message. Replace with controlled logging and user-friendly error pages.
- **Sensitive output:** Avoid committing production secrets to VCS. Use secrets manager or local `.env` excluded from VCS.
- **Input sanitization:** Router enforces basic name patterns, but many controllers rely on `$_GET/$_POST` with minimal filtering. Ensure validation at controller/request boundaries and use prepared statements everywhere (already used in many model methods).
- **CSRF:** Basic CSRF token generation exists in `index.php`, but views/forms must validate tokens on POST handlers. Verify consistent token checks across forms.
- **Role enforcement:** Employee pages call `EmployeeAuthController::enforceRole()` — good practice. Confirm all privileged handlers call enforcement.

**Code Quality Observations**
- **Clear separation** of controllers/models/views, but no framework conventions (manual includes). This increases bootstrap complexity and maintenance burden.
- **Autoloading:** `app/core/Autoloader.php` present — migrate to Composer autoloading for dependency management and PSR-4 compliance.
- **SQL usage:** Mixed raw queries and prepared statements; some use `query()` then `execute()` (redundant). Normalize to prepared statements and parameterized queries to avoid injection risk.
- **Transactions:** Product create/update/delete correctly use transactions (good). Ensure consistent error handling and logging on rollbacks.
- **Single-responsibility:** Some functions (notably in `index.php`) contain routing, request parsing, and view selection — consider extracting route handling and request lifecycle into small components.

**Operational Notes**
- **APIs:** Simple JSON endpoints exist (e.g., `?page=api_products`) that include controller and call static methods; good for lightweight API but consider versioning and authentication.
- **Assets:** `public/css/style.css` and `assets/` served directly; consider bundling/optimization pipeline if migrating front-end.
- **Email & PDF:** Bundled libraries are in-tree — migrating to composer and using maintained packages simplifies security updates.

**Migration Recommendations (to Laravel / modern stack)**
- **Config & secrets:** Move DB config to `.env` and do not commit credentials. Use `config/database.php` and Laravel environment variables when migrating.
- **Autoload & dependencies:** Run `composer init` in the project, add the threerd-party packages via Composer, and use PSR-4 autoloading to drop manual includes.
- **Routing & controllers:** Map existing controllers to Laravel controllers and routes (`routes/web.php`, `routes/api.php`). Replace custom Router with Laravel routing and middleware for auth and CSRF.
- **Models:** Rewrite models as Eloquent models where appropriate. Product SQL includes unions and complex joins — start by extracting read-heavy queries into query builder scopes or dedicated repository classes.
- **Views:** Convert PHP view templates incrementally to Blade templates; keep layout structure and partials (header/footer) similar.
- **Auth & RBAC:** Replace custom auth with Laravel Auth and policies/gates for role enforcement; migrate session and employee role checks accordingly.
- **Testing:** Add unit tests for model logic and HTTP feature tests for controllers. Start with `ProductModel` logic and API endpoints.

**Redaction Note**
- I found database credentials inside `app/config.php`. For safety the values are not included in this report. Replace these with environment variables as a priority.

**Scope**
- This document and analysis cover only the legacy backup project located at `C:\Users\quock\OneDrive\Máy tính\TTCN\bookstore_customer_BACKUP_BEFORE_LARAVEL_20260224`.
- I explicitly excluded analysis of the current workspace skill folders (`.agents`, `.agent`, `.claude`) and the nearby `bookstore_customer_laravel` repository; those are out of scope per your request.

**Actionable Next Steps (priority ordered)**
- **1 — Secrets removal (urgent):** Remove committed DB credentials, rotate the DB password, and switch to `.env` management.
- **2 — Composer adoption:** Initialize Composer, require maintained packages (PHPMailer, Google client, mpdf) and enable PSR-4 autoloading.
- **3 — Automated tests:** Add a small PHPUnit test suite around critical model logic (e.g., product filters, add/update/delete flows) to protect migrations.
- **4 — Incremental migration plan:** Create a migration mapping (controller -> Laravel controller, model -> Eloquent, view -> Blade). Start with API endpoints to reduce surface area.
- **5 — Frontend audit:** Use rules from `vercel-react-best-practices` and `web-design-guidelines` when refactoring the `frontend/` to React or when optimizing `public/` assets.

**Files reviewed (examples)**
- `app/config.php` — configuration and discovered hard-coded credentials (redacted)
- `index.php` — bootstrap and request dispatch flow
- `app/core/Database.php` — PDO connection logic
- `app/core/Router.php` — lightweight router implementation
- `app/models/product.php` — product-related queries, transactions, and paging logic
- `.agents/skills/*/SKILL.md` — frontend performance & composition guidance

**Where I saved this analysis**
- **File:** [docs/old_project_backup_analysis.md](docs/old_project_backup_analysis.md)

If you want, I can now:
- convert the `app/` autoload to Composer PSR-4 (automate autoloader)
- produce a migration map (controller/model/view -> Laravel equivalents)
- run a credentials search and redact/replace them with `.env` scaffold

Tell me which next step you prefer and I'll proceed.

## Detailed Code Inventory

**Core / Bootstrap**
- `index.php`: application bootstrap, session handling, model/controller includes, CSRF token generation, page dispatch and API routing stubs.
- `app/core/Autoloader.php`: local class autoloader (replace with Composer PSR-4).
- `app/core/Router.php`: simple router supporting controller/action via `$_GET` (basic validation included).
- `app/core/Database.php`: PDO singleton factory using `app/config.php` values.

**Controllers (file → key public methods / responsibilities)**
- `app/controllers/ApiController.php` — `products()`, `providers()`, `publishers()`, `customers()`, `employees()`, `searchProducts()`; handles JSON responses, CORS, API key check, basic rate limiting and role enforcement for protected endpoints.
- `app/controllers/AuthController.php` — `login()`, `loginWithGoogle()`, `register()`, `logout()`, `requireLogin()`; customer authentication, session creation, Google OAuth flow.
- `app/controllers/PageController.php` — many `prepare*` helpers: `prepareProductsPage()`, `prepareHome()`, `prepareCart()`, `prepareCheckout()`, `prepareAccount()`, `prepareProductViewPage()`, `prepareHeader()`, `prepareNotifications()`; prepares data for views.
- `app/controllers/ProductController.php` — `index()`, `show()`; simple product listing and single product rendering.
- `app/controllers/EmployeeAuthController.php` — `employeeLogin()`, `employeeLogout()`, `requireEmployeeLogin()`, `enforceRole()`; employee authentication and role guards.
- `app/controllers/CustomerActionController.php` (named `CustomerController` in file) — many `handle*` actions for forms: `handleCustomerLogin()`, `handleCustomerRegister()`, `handleForgotRequest()`, `handleForgotVerify()`, `handleForgotReset()`, `handleProfileUpdate()`, `handleCartAdd()`, `handleCartUpdate()`, `handleCartRemove()`, `handleCheckout()`, `handleCheckoutConfirm()`, etc.; validates CSRF and orchestrates model calls.
- `app/controllers/EmployeePageController.php` — (employee view preparers; read `app/views/employee/*`) — responsible for admin page data (not exhaustively listed here).
- `app/controllers/EmployeeActionController.php` — (employee actions: CRUD for products/orders/customers/employees/etc.).
- `app/controllers/CrawlController.php` — (site crawl or sitemap generation; check file for specifics if needed).

**Models (file → responsibilities & representative public methods)**
Note: each model exposes a static PDO accessor pattern and a predictable set of CRUD/list/page methods.
- `app/models/product.php` (ProductModel): `getAllProducts()`, `getProductById()`, `getProductsByType()`, `addProduct()`, `updateProduct()`, `deleteProduct()`, `filterProducts()`, `getProductsPage()`, `getFeaturedProducts()`, `getNewArrivals()`, `getProductsFromPromotion()` — handles `sanpham`, `sach`, `vanphongpham` and complex read logic (UNIONs, joins, transactions for writes).
- `app/models/customer.php` (CustomerModel): `getAllCustomers()`, `getCustomersPage()`, `getCustomerById()`, `findCustomerByEmail()`, `createCustomer()`, `updateCustomer()`, `updatePassword()` — handles `khachhang` table and auth-related persistence.
- `app/models/orders.php` (OrdersModel): `getAllOrders()`, `getOrdersPage()`, `getOrderById()`, `getOrderItemsByOrderId()`, `createOrder()`, `updateOrderStatus()`, `finalizePendingOrder()`, `getOrderStatistics()` — handles `hoadon`, `chitiethoadon` and order lifecycle, stock updates in transactions.
- `app/models/cart.php` (CartModel): cart CRUD (guest and customer flows), `getCartItems()`, `addCartItem()`, `updateCartItem()`, `clearCart()` — manage `giohang` and `chitietgiohang` (or similar) tables.
- `app/models/categories.php` (CategoriesModel): `getAllCategories()`, `getCategoriesPage()`, `createCategory()`, `updateCategory()`, `deleteCategory()` — `danhmucsanpham` management and cache invalidation helpers.
- `app/models/provider.php` (ProviderModel): provider CRUD and listing (`nhacungcap`).
- `app/models/publisher.php` (PublisherModel): publisher (`nhaxuatban`) listing.
- `app/models/author.php` / `authors.php` (AuthorsModel): `tacgia` table helpers.
- `app/models/reviews.php` (ReviewsModel): manage `danhgia` and review listing.
- `app/models/notification.php` (NotificationModel): create/get notifications (`thongbao` table) and customer notification helpers.
- `app/models/promotions.php` (PromotionModel): `khuyenmai` CRUD and `searchProducts()` used by API.
- `app/models/employee.php` & `employee_helpers.php`: employee CRUD, lookup by code, role management, helper reports like top-selling products.
- `app/models/addresses.php` (AddressesModel): customer shipping addresses (`diachi_giaohang`) management.
- `app/models/units.php` (UnitsModel), `loaisach.php` (LoaisachModel), `wishlist.php` (WishlistModel) — various supporting models.

**Views (layout & pages)**
- Public customer views: `app/views/home.php`, `products.php`, `productview.php`, `cartPage.php`, `checkout.php`, `loginPage.php`, `registerPage.php`, `account`, `orders.php`, `contact.php`, policies pages under views.
- Employee admin views: `app/views/employee/*` (dashboard, products, orders, customers, employees, reports, settings, publishers, providers, categories, promotions) and `employee/employeeLayout.php`.
- Shared partials: `app/views/layouts/header.php`, `app/views/layouts/footer.php`, `app/views/components.php`.

**Database Tables (inferred from models and queries)**
- Primary tables: `sanpham`, `sach`, `vanphongpham`, `danhmucsanpham`, `nhacungcap`, `nhaxuatban`, `tacgia`, `donvitinh`, `khachhang`, `hoadon`, `chitiethoadon`, `giohang`, `chitietgiohang` (or `chitiethoadon`/`chitietgiohang` naming), `diachi_giaohang`, `thongbao`, `khuyenmai`, `chitietkhuyenmai`, `danhgia`.
- Auxiliary / mapping tables implied: `sanpham_yeu_thich` (wishlist), `nhanvien` (employee), `sach`/`vanphongpham` join to `sanpham`.

**Helpers & Libraries (bundled)**
- `app/helpers.php`: utility functions used across controllers/views (CSRF helper, formatting, logging helpers like `app_log`).
- `app/login_with_google_helper.php`: Google OAuth helpers.
- `app/mail_helper.php`, `app/PHPMailer/` and `app/Mpdf/`: in-tree mailing/PDF libs.
- Excel/XLSX helpers: `SimpleXLSXGen/`, `xlsx_helper.php`.

**Important Cross-cutting Patterns**
- All models use a `static ?PDO $pdo` pattern with `init()` and `getPdo()` fallback to `Database::getInstance()` — consistent and easy to migrate to dependency injection.
- Controllers frequently call `require_csrf_or_redirect()` and helper functions for authorization; CSRF tokens generated in bootstrap but need consistent validation on handlers.
- Transactions are used for critical writes (`OrdersModel::createOrder`, `ProductModel::addProduct/updateProduct/deleteProduct`) — good practice to retain.

**Security Checklist (module-level)**
- Secrets: `app/config.php` contains DB credentials — rotate & move to `.env` immediately.
- Passwords: migration path to `password_hash()` already present (code rehashing when plain-text detected) — keep and enforce password policies.
- Prepared statements: models mostly use prepared statements; continue to audit any direct string interpolation in SQL.
- Error handling: avoid `die()` with raw exception messages; log to files instead and show friendly error pages.

**Migration Mapping (quick)**
- `app/controllers/*` → `app/Http/Controllers/*` (Laravel controllers; actions → controller methods; use form requests for validation).
- `app/models/*` → `app/Models/*` (Eloquent models). Where models span multiple tables (e.g., `ProductModel` wraps `sanpham` + `sach` + `vanphongpham`), split into `Product`, `Book`, `Stationery` Eloquent models and repositories for complex queries.
- `app/views/*` → `resources/views/*` (Blade templates). Keep `layouts/header.php`/`footer.php` as Blade layouts and partials.
- `app/core/Database.php` → use Laravel DB config and `DB` facade; remove custom PDO singleton.
- `app/helpers.php` → convert to service classes or global helpers (`app/Helpers.php`) and register via Composer autoload.

**Next suggested work (concrete tasks)**
1. `SECRETS` — Remove credentials from `app/config.php`, add `.env.example`, instruct rotation.
2. `COMPOSER` — Init Composer, require `phpmailer/phpmailer`, `mpdf/mpdf`, `google/apiclient`, map PSR-4, and remove in-tree libraries over time.
3. `AUTOMATION` — Add basic PHPUnit tests for `ProductModel::filterProducts`, `OrdersModel::createOrder` flows (use in-memory sqlite or test DB).
4. `MIGRATE_API` — Move JSON endpoints to a small Laravel API route group and add token-based auth & rate-limiting via middleware.

---

If you want, I will now (pick one):
- create a `composer.json` and PSR-4 scaffold for the `app/` namespace, or
- generate a full migration map (one-to-one file mapping CSV/MD) from the current controllers/models/views to Laravel equivalents, or
- run an automated secret scan (grep) and create `.env.example` with placeholders.
\

---

## Reference Tables (quick lookup)

### Controllers
| File | Main Methods | Responsibility |
|---|---|---|
| `app/controllers/ApiController.php` | `products(), providers(), publishers(), customers(), employees(), searchProducts()` | JSON API endpoints, CORS, API-key, rate-limiting, role checks |
| `app/controllers/AuthController.php` | `login(), register(), loginWithGoogle(), logout()` | Customer auth, session, Google OAuth, password rehashing |
| `app/controllers/ProductController.php` | `index(), show()` | Public product pages (list & detail) |
| `app/controllers/PageController.php` | `prepare*()` helpers | Build data for views (home, products, cart, header, etc.) |
| `app/controllers/CustomerActionController.php` | `handle*()` actions | Form handlers (cart, checkout, profile, password reset) with CSRF checks |
| `app/controllers/EmployeeAuthController.php` | `employeeLogin(), enforceRole(), requireEmployeeLogin()` | Employee auth and RBAC enforcement |
| `app/controllers/EmployeeActionController.php` | various `handle*` | Admin CRUD for products/orders/customers (employee actions) |

### Models (primary)
| File | Key Methods | Primary Tables | Notes |
|---|---|---|---|
| `app/models/product.php` | `getAllProducts(), getProductById(), addProduct(), updateProduct(), deleteProduct(), getProductsPage()` | `sanpham`, `sach`, `vanphongpham` | Complex joins/UNIONs; uses transactions for writes |
| `app/models/customer.php` | `findCustomerByEmail(), createCustomer(), updateCustomer(), updatePassword()` | `khachhang` | Password hashing, pagination helpers |
| `app/models/orders.php` | `createOrder(), finalizePendingOrder(), updateOrderStatus(), getOrdersPage()` | `hoadon`, `chitiethoadon` | Transactional order lifecycle, stock updates |
| `app/models/cart.php` | `getCartItems(), addCartItem(), updateCartItem(), clearCart()` | `giohang`, `chitietgiohang` | Supports guest/session and customer flows |
| `app/models/categories.php` | `getAllCategories(), createCategory(), updateCategory()` | `danhmucsanpham` | Cache invalidation helper present |
| `app/models/promotions.php` | `getAllPromotions(), getPromotionDetails(), searchProducts()` | `khuyenmai`, `chitietkhuyenmai` | Promotion-product mapping and search used by API |

### Views (public & admin)
| Path | Purpose | Notes |
|---|---|---|
| `app/views/home.php` | Public homepage | Uses `PageController::prepareHome()` |
| `app/views/products.php` | Product catalog | Filter/sort UI backed by `ProductModel` |
| `app/views/productview.php` | Product detail | Shows product + reviews |
| `app/views/cartPage.php`, `checkout.php` | Cart & checkout flow | Tied to `CartModel` / `OrdersModel` |
| `app/views/loginPage.php`, `registerPage.php` | Auth forms | CSRF tokens required |
| `app/views/employee/*` | Admin UI (dashboard, orders, products, reports) | Protected by `EmployeeAuthController` |

### Helpers & Bundled Libraries
| File / Folder | Purpose |
|---|---|
| `app/helpers.php` | Global helpers: CSRF generation/validation, formatting, logging (`app_log`) |
| `app/login_with_google_helper.php` | Google OAuth helper wrappers |
| `app/mail_helper.php`, `app/PHPMailer/` | Email sending utilities (PHPMailer bundled) |
| `app/Mpdf/` | PDF generation library (mpdf bundled) |
| `SimpleXLSXGen/`, `xlsx_helper.php` | Excel export helpers |

### Database Tables (inferred)
| Table | Purpose | Referenced By |
|---|---|---|
| `sanpham` | Main product table (generic product record) | `ProductModel`, `OrdersModel` |
| `sach` | Book-specific product fields (tenSach, tacgia_id, nhaxuatban_id) | `ProductModel` |
| `vanphongpham` | Stationery-specific product fields (tenVPP) | `ProductModel` |
| `danhmucsanpham` | Product categories | `CategoriesModel`, `PageController` |
| `nhacungcap` | Providers | `ProviderModel` |
| `nhaxuatban` | Publishers | `PublisherModel` |
| `khachhang` | Customers | `CustomerModel`, `AuthController` |
| `hoadon` | Orders header | `OrdersModel` |
| `chitiethoadon` | Order line items | `OrdersModel` |
| `giohang` / `chitietgiohang` | Carts and items | `CartModel` |
| `thongbao` | Notifications | `NotificationModel` |
| `khuyenmai`, `chitietkhuyenmai` | Promotions and details | `PromotionModel` |
| `danhgia` | Reviews | `ReviewsModel` |

### Quick Method Map (representative)
| Module | Representative Methods / Usage |
|---|---|
| Routing/bootstrap | `index.php` loads `app/core/Autoloader.php`, sets CSRF token, includes model/controller files, handles `?page=` and API routes |
| Product flow | `ProductModel::getProductsPage()` used by `ApiController::products()` and `PageController::prepareProductsPage()` |
| Order flow | `CartModel` builds items → `OrdersModel::createOrder()` (transaction) → `OrdersModel::updateOrderStatus()` to mark delivered and update product metrics |
| Auth flow | `AuthController::login()` uses `CustomerModel::findCustomerByEmail()` and password_verify; supports Google OAuth via `login_with_google_helper.php` |

---

I can now mark the new table task as completed and commit further refinements (e.g., CSV export of the mapping). Chọn bước tiếp theo bạn muốn tôi thực hiện:
- tạo `composer.json` + PSR-4 scaffold, hoặc
- xuất bản đồ chuyển đổi (CSV/MD) chi tiết.

---

## Comprehensive File & Method Inventory (exhaustive)

### Controllers — full file list and public methods
| File | Public Methods (representative) |
|---|---|
| `app/controllers/ApiController.php` | `products(), providers(), publishers(), customers(), employees(), searchProducts(), respondJson(), ensureApiAllowed()` |
| `app/controllers/AuthController.php` | `login(), loginWithGoogle(), register(), logout(), requireLogin(), redirect()` |
| `app/controllers/PageController.php` | `prepareHome(), prepareProductsPage(), prepareProductViewPage($id), prepareCart(), prepareCheckout(), prepareAccount(), prepareHeader(), prepareNotifications(), fetchRecentOrders()` |
| `app/controllers/ProductController.php` | `index(), show()` |
| `app/controllers/CustomerActionController.php` (`CustomerController`) | `handleCustomerLogin(), handleCustomerRegister(), handleForgotRequest(), handleForgotVerify(), handleForgotReset(), handleProfileUpdate(), handleCartAdd(), handleCartUpdate(), handleCartRemove(), handleCheckout(), handleCheckoutConfirm()` |
| `app/controllers/EmployeeAuthController.php` | `employeeLogin(), employeeLogout(), requireEmployeeLogin(), enforceRole(), redirect()` |
| `app/controllers/EmployeePageController.php` | preparer methods for employee pages (dashboard, products, orders, reports, settings) |
| `app/controllers/EmployeeActionController.php` | CRUD handlers for admin actions (products, orders, customers, employees, publishers, providers, categories, promotions) |
| `app/controllers/CrawlController.php` | sitemap/crawl helper methods (site-specific) |

### Models — full file list and exported methods
| File | Representative Methods | Notes |
|---|---|---|
| `app/models/product.php` | `init(), getAllProducts(), getProductById(), getProductsByType(), addProduct(), updateProduct(), deleteProduct(), filterProducts(), getProductsPage(), checkProductNameExists()` | joins across `sanpham`,`sach`,`vanphongpham`; transactions for writes |
| `app/models/customer.php` | `init(), findCustomerByEmail(), createCustomer(), updateCustomer(), updatePassword(), getCustomersPage()` | auth-related persistence, password rehash logic elsewhere |
| `app/models/orders.php` | `createOrder(), finalizePendingOrder(), updateOrderStatus(), getOrdersPage(), getOrderDetailsById(), getProductsByOrderId()` | transactional writes, stock adjustments, statistics helpers |
| `app/models/cart.php` | `getCart(), getCartItems(), addCartItem(), updateCartItem(), clearCart()` | guest & authenticated cart logic |
| `app/models/categories.php` | `getAllCategories(), getCategoryById(), createCategory(), updateCategory(), deleteCategory(), clearCategoriesCache()` | cache invalidation helper used by controllers/views |
| `app/models/promotions.php` | `getAllPromotions(), getPromotionDetails(), searchProducts()` | maps promotions → products used by admin + API |
| `app/models/reviews.php` | `getAllReviewsByProductId(), addReview(), deleteReview()` | product reviews / ratings |
| `app/models/notification.php` | `createNotification(), getCustomerNotifications(), countUnreadNotifications()` | used in login flows and order events |
| `app/models/employee.php` | `findEmployeeByCode(), getAllEmployees(), updatePassword()` | employee auth & role fields |
| `app/models/addresses.php` | `getAddressesByCustomer(), addAddress()` | shipping addresses helper |

### Views — exhaustive list (files & purpose)
- `app/views/home.php` — homepage (featured, bestSellers, newArrivals)
- `app/views/products.php` — product listing / filters
- `app/views/productview.php` — single product page
- `app/views/cartPage.php` — shopping cart
- `app/views/checkout.php` — checkout confirmation
- `app/views/loginPage.php`, `registerPage.php` — auth forms
- `app/views/forgot_resetPass.php` — password reset UI
- `app/views/account` / `customerPage.php` — account overview
- `app/views/notifications.php` — user notifications
- `app/views/orders.php` — order history for customers
- `app/views/employee/*` — admin area pages (list in file system)
- `app/views/layouts/header.php`, `footer.php` — shared layout partials

### Config & Important Files
| File | Purpose |
|---|---|
| `app/config.php` | DB credentials, `base_url`, `api_key`, rate-limit config — contains secrets (rotate) |
| `index.php` | HTTP bootstrap, includes, CSRF token generation, API route dispatch |
| `app/core/Autoloader.php` | local autoloader (PSR-4 absent) |
| `app/core/Database.php` | PDO singleton factory and error handling |

### Bundled Third-Party Packages (in-tree)
- `app/PHPMailer/` — PHPMailer (bundled copy)
- `app/Mpdf/` — mPDF (bundled copy)
- `app/google-api-php-client/` — Google client (bundled copy)
- `SimpleXLSXGen/` — Excel generator

### Immediate Risk & Fix Priorities (ordered)
1. Remove & rotate secrets: `app/config.php` has plaintext DB credentials. Create `.env` and `.env.example`, update `Database.php` to read environment variables.
2. Replace in-tree libs with Composer dependencies: remove bundled `PHPMailer`, `mpdf`, `google-api-php-client` and require them via `composer.json`.
3. Fix error handling: in `Database::getInstance()` replace `die()` with error logging (`error_log`) and show a friendly maintenance page to users.
4. Audit SQL concatenations: grep for `"..." . $_GET` patterns and ensure prepared statements are used everywhere.
5. Verify CSRF enforcement: ensure all form handlers (all `handle*` methods) call `require_csrf_or_redirect()` and that views include the token input.
6. Add tests for critical flows: `ProductModel::filterProducts`, `OrdersModel::createOrder`, `AuthController::login`.

---

I completed the detailed, line-item inventory and risk/priorities. Tôi đã cập nhật todo list.


