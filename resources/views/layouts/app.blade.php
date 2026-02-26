<!doctype html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'BookStore')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="{{ asset('css/legacy-theme.css') }}">
</head>
<body class="bg-light">
@php
    $cartCount = collect(session('cart', []))->sum('quantity');
    $customer = session('customer');
    $categories = \App\Models\DanhMucSanPham::orderBy('danhmucSP_id')->get();
    $notificationCount = $customer ? \App\Models\ThongBao::where('khachhang_id', (int) $customer['id'])->where('trang_thai', notification_unread_code())->count() : 0;
    $mobileNotifications = $customer
        ? \App\Models\ThongBao::where('khachhang_id', (int) $customer['id'])->orderByDesc('thongbao_id')->limit(5)->get()
        : collect();
@endphp

<nav class="navbar navbar-expand-lg navbar-modern sticky-top mb-4">
    <div class="container px-4">
        <a class="navbar-brand fw-bold text-primary d-flex align-items-center" href="{{ route('customer.home') }}">
            <img src="{{ asset('assets/images/bookstoreLogo.png') }}" alt="logo" class="me-2 img-fluid" style="height: 50px; object-fit: contain;">
            <span class="ms-1">BookZone</span>
        </a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse d-none d-lg-flex" id="mainNav">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="categoryMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid fa-list me-1"></i> Danh mục
                    </a>
                    <ul class="dropdown-menu shadow-sm" aria-labelledby="categoryMenu">
                        @foreach($categories as $cat)
                            <li><a class="dropdown-item" href="{{ route('customer.products.index', ['danhmucSP_id' => $cat->danhmucSP_id]) }}">{{ $cat->tenDanhMuc }}</a></li>
                        @endforeach
                    </ul>
                </li>
                <li class="nav-item"><a class="nav-link" href="{{ route('customer.products.index') }}">Tất cả sản phẩm</a></li>
                <li class="nav-item"><a class="nav-link" href="{{ route('customer.contact') }}">Liên hệ</a></li>
                <li class="nav-item"><a class="nav-link" href="{{ route('customer.about') }}">Về</a></li>
            </ul>
            <form class="me-3 flex-grow-1 flex-lg-grow-0" method="get" action="{{ route('customer.products.index') }}">
                <div class="input-group">
                    <input type="search" class="form-control" name="q" value="{{ request('q') }}" placeholder="Tìm kiếm sản phẩm...">
                    <button class="btn btn-outline-primary" type="submit"><i class="fa fa-search"></i></button>
                </div>
            </form>

            <ul class="navbar-nav mb-2 mb-lg-0 legacy-top-actions align-items-center">
                @if($customer)
                    <li class="nav-item me-2">
                        <a class="nav-link position-relative" href="{{ route('customer.notifications') }}">
                            <i class="fa-regular fa-bell fs-5"></i>
                            @if($notificationCount > 0)
                                <span class="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">{{ $notificationCount }}</span>
                            @endif
                        </a>
                    </li>
                @endif
                <li class="nav-item me-2">
                    <a class="nav-link position-relative" href="{{ route('customer.cart.index') }}">
                        <i class="fa-solid fa-cart-shopping fs-5"></i>
                        @if($cartCount > 0)
                            <span class="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill">{{ $cartCount }}</span>
                        @endif
                    </a>
                </li>

                @if($customer)
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="accountMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fa-regular fa-user"></i>
                            <span class="ms-2 d-none d-lg-inline">{{ $customer['name'] }}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="accountMenu">
                            <li><a class="dropdown-item" href="{{ route('customer.account') }}">Hồ sơ</a></li>
                            <li><a class="dropdown-item" href="{{ route('customer.orders') }}">Đơn hàng</a></li>
                            <li><a class="dropdown-item" href="{{ route('customer.notifications') }}">Thông báo</a></li>
                            <li><a class="dropdown-item" href="{{ route('customer.wishlist.index') }}">Yêu thích</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <form method="post" action="{{ route('customer.logout') }}" class="mb-0">
                                    @csrf
                                    <button class="dropdown-item text-danger" type="submit">Đăng xuất</button>
                                </form>
                            </li>
                        </ul>
                    </li>
                @else
                    <li class="nav-item"><a href="{{ route('customer.login') }}" class="btn btn-primary">Đăng nhập</a></li>
                @endif

                <li class="nav-item ms-lg-2"><a class="nav-link" href="{{ route('employee.login') }}">Nhân viên</a></li>
            </ul>
        </div>
    </div>
</nav>

<div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="mobileMenuLabel">Menu</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div class="mb-3">
            <form class="d-flex" method="get" action="{{ route('customer.products.index') }}">
                <div class="input-group">
                    <input type="search" class="form-control" name="q" value="{{ request('q') }}" placeholder="Tìm kiếm sản phẩm...">
                    <button class="btn btn-outline-primary" type="submit"><i class="fa fa-search"></i></button>
                </div>
            </form>
        </div>

        @if($customer)
            <div class="card mb-3">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center">
                        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width:44px;height:44px;font-size:1.1rem;">
                            <i class="fa-regular fa-user"></i>
                        </div>
                        <div class="ms-3 flex-grow-1">
                            <div class="fw-semibold">{{ $customer['name'] }}</div>
                            <small class="text-muted d-block">{{ $customer['email'] ?? '' }}</small>
                        </div>
                    </div>
                    <div class="mt-3 d-flex gap-2">
                        <a href="{{ route('customer.account') }}" class="btn btn-sm btn-outline-secondary flex-fill">Hồ sơ</a>
                        <a href="{{ route('customer.orders') }}" class="btn btn-sm btn-outline-secondary flex-fill">Đơn hàng</a>
                    </div>
                    <a href="{{ route('customer.wishlist.index') }}" class="btn btn-sm btn-outline-secondary w-100 mt-2">Sản phẩm yêu thích</a>
                    <form method="post" action="{{ route('customer.logout') }}" class="mt-2">
                        @csrf
                        <button type="submit" class="btn btn-sm btn-outline-danger w-100">Đăng xuất</button>
                    </form>
                </div>
            </div>
        @else
            <div class="d-grid gap-2 mb-3">
                <a class="btn btn-primary" href="{{ route('customer.login') }}">Đăng nhập</a>
                <a class="btn btn-outline-secondary" href="{{ route('customer.register') }}">Đăng ký</a>
            </div>
        @endif

        <div class="mb-3">
            <div class="fw-semibold mb-2 d-flex align-items-center justify-content-between">
                <span>Thông báo</span>
                @if($notificationCount > 0)<span class="badge bg-danger">{{ $notificationCount }}</span>@endif
            </div>
            <div class="list-group mb-2">
                @if($mobileNotifications->isNotEmpty())
                    @foreach($mobileNotifications as $note)
                        <div class="list-group-item small mobile-menu-note">
                            {{ \Illuminate\Support\Str::limit($note->tieu_de ?? 'Thông báo', 60) }}<br>
                            <small class="text-muted">{{ \Illuminate\Support\Str::limit($note->noi_dung ?? '', 80) }}</small>
                        </div>
                    @endforeach
                @else
                    <div class="list-group-item small text-muted">Không có thông báo.</div>
                @endif
            </div>
            <a href="{{ route('customer.notifications') }}" class="small text-decoration-none">Xem tất cả thông báo</a>
        </div>

        <div class="mb-3">
            <div class="fw-semibold mb-2">Danh mục</div>
            <div class="list-group">
                @foreach($categories as $cat)
                    <a class="list-group-item list-group-item-action" href="{{ route('customer.products.index', ['danhmucSP_id' => $cat->danhmucSP_id]) }}">{{ $cat->tenDanhMuc }}</a>
                @endforeach
            </div>
        </div>

        <div class="d-flex gap-2">
            <a class="btn btn-outline-secondary flex-grow-1" href="{{ route('customer.cart.index') }}">
                <i class="fa-solid fa-cart-shopping"></i> Giỏ hàng
                @if($cartCount > 0)<span class="badge bg-danger ms-2">{{ $cartCount }}</span>@endif
            </a>
        </div>
    </div>
</div>

<main class="container pb-5">
    @if(session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    @yield('content')
</main>

<footer class="legacy-footer bg-white text-dark pt-5 pb-3 mt-5 border-top">
    <div class="container">
        <div class="row gy-4">
            <div class="col-12 col-sm-6 col-md-3 fmenu">
                <img src="{{ asset('assets/images/bookstoreLogo.png') }}" alt="Logo" width="90" class="mb-3">
                <h6 class="fw-bold text-primary mb-2">BookZone</h6>
                <p class="small text-muted mb-0">Nhà sách trực tuyến chuyên sách, văn phòng phẩm chính hãng.</p>
            </div>

            <div class="col-12 col-sm-6 col-md-3 fmenu">
                <h6 class="fw-bold mb-3">Dịch vụ</h6>
                <ul class="list-unstyled small mb-0">
                    <li class="mb-2"><a href="{{ route('customer.return-policy') }}" class="text-muted text-decoration-none">Chính sách đổi trả</a></li>
                    <li class="mb-2"><a href="{{ route('customer.warranty-policy') }}" class="text-muted text-decoration-none">Chính sách bảo hành</a></li>
                    <li class="mb-2"><a href="{{ route('customer.shipping-delivery') }}" class="text-muted text-decoration-none">Chính sách vận chuyển & giao hàng</a></li>
                    <li><a href="{{ route('customer.privacy-policy') }}" class="text-muted text-decoration-none">Chính sách bảo mật</a></li>
                </ul>
            </div>

            <div class="col-12 col-sm-6 col-md-3 fmenu">
                <h6 class="fw-bold mb-3">Hỗ trợ</h6>
                <ul class="list-unstyled small mb-0">
                    <li class="mb-2"><a href="{{ route('customer.contact') }}" class="text-muted text-decoration-none">Liên hệ</a></li>
                    <li class="mb-2"><a href="{{ route('customer.about') }}" class="text-muted text-decoration-none">Về chúng tôi</a></li>
                    <li><a href="{{ route('customer.products.index') }}" class="text-muted text-decoration-none">Tìm sản phẩm</a></li>
                </ul>
            </div>

            <div class="col-12 col-sm-6 col-md-3 fmenu">
                <h6 class="fw-bold mb-3">Liên hệ</h6>
                <p class="small text-muted mb-1"><i class="bi bi-telephone me-2"></i><a href="tel:0239482958" class="text-muted text-decoration-none">0239 482 958</a></p>
                <p class="small text-muted mb-1"><i class="bi bi-envelope me-2"></i><a href="mailto:qkhanh12.duration060@passinbox.com" class="text-muted text-decoration-none">qkhanh12.duration060@passinbox.com</a></p>
                <p class="small text-muted mb-0"><i class="bi bi-geo-alt me-2"></i>180 Cao Lỗ, Quận 8, TP.HCM</p>
            </div>
        </div>

        <hr class="border-secondary-subtle my-3">
        <div class="text-center small text-muted">© 2025 BookZone. All rights reserved.</div>
    </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
