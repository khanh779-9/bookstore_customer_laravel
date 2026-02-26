<!doctype html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Quản trị BookStore')</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="{{ asset('css/legacy-theme.css') }}">
</head>
<body class="employee-body">
@php $emp = session('employee'); @endphp
<div class="employee-shell">
    <aside class="employee-sidebar p-3">
        <div class="employee-brand mb-3">📚 BookStore Admin</div>
        <p class="small mb-3 text-white-50">{{ $emp['name'] ?? '' }} ({{ employee_role_label($emp['role'] ?? null) }})</p>
        <nav class="nav flex-column gap-1">
            <a href="{{ route('employee.dashboard') }}" class="nav-link {{ request()->routeIs('employee.dashboard') ? 'active' : '' }}"><i class="bi bi-speedometer2 me-2"></i>Dashboard</a>
            <a href="{{ route('employee.products') }}" class="nav-link {{ request()->routeIs('employee.products') ? 'active' : '' }}"><i class="bi bi-box-seam me-2"></i>Sản phẩm</a>
            <a href="{{ route('employee.orders') }}" class="nav-link {{ request()->routeIs('employee.orders') ? 'active' : '' }}"><i class="bi bi-receipt me-2"></i>Đơn hàng</a>
            <a href="{{ route('employee.customers') }}" class="nav-link {{ request()->routeIs('employee.customers') ? 'active' : '' }}"><i class="bi bi-people me-2"></i>Khách hàng</a>
            <a href="{{ route('employee.profile') }}" class="nav-link {{ request()->routeIs('employee.profile') ? 'active' : '' }}"><i class="bi bi-person-circle me-2"></i>Hồ sơ</a>
            <a href="{{ route('employee.publishers') }}" class="nav-link {{ request()->routeIs('employee.publishers') ? 'active' : '' }}"><i class="bi bi-building me-2"></i>NXB</a>
            <a href="{{ route('employee.providers') }}" class="nav-link {{ request()->routeIs('employee.providers') ? 'active' : '' }}"><i class="bi bi-truck me-2"></i>Nhà cung cấp</a>
            <a href="{{ route('employee.categories') }}" class="nav-link {{ request()->routeIs('employee.categories') ? 'active' : '' }}"><i class="bi bi-tags me-2"></i>Danh mục</a>
            <a href="{{ route('employee.promotions') }}" class="nav-link {{ request()->routeIs('employee.promotions') ? 'active' : '' }}"><i class="bi bi-megaphone me-2"></i>Khuyến mãi</a>
            <a href="{{ route('employee.reports') }}" class="nav-link {{ request()->routeIs('employee.reports') ? 'active' : '' }}"><i class="bi bi-bar-chart me-2"></i>Báo cáo</a>
            @if(($emp['role'] ?? '') === 'admin')
                <a href="{{ route('employee.employees') }}" class="nav-link {{ request()->routeIs('employee.employees') ? 'active' : '' }}"><i class="bi bi-person-badge me-2"></i>Nhân viên</a>
                <a href="{{ route('employee.settings') }}" class="nav-link {{ request()->routeIs('employee.settings') ? 'active' : '' }}"><i class="bi bi-gear me-2"></i>Cài đặt</a>
            @endif
        </nav>
        <form method="post" action="{{ route('employee.logout') }}" class="mt-3">
            @csrf
            <button class="btn btn-outline-light btn-sm w-100">Đăng xuất</button>
        </form>
    </aside>

    <main class="employee-content p-3 p-lg-4">
        <div class="employee-topbar d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">@yield('title', 'Dashboard')</h5>
            <span class="text-muted small">Vai trò: {{ employee_role_label($emp['role'] ?? null) }}</span>
        </div>
        @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
        @if(session('error'))<div class="alert alert-danger">{{ session('error') }}</div>@endif
        @yield('content')
    </main>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
