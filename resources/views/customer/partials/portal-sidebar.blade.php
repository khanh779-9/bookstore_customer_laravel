@php
    $customer = $customer ?? session('customer');
    $name = trim((string) ($customer['name'] ?? '-'));
    $email = (string) ($customer['email'] ?? '-');
    $id = (string) ($customer['id'] ?? '-');

    $parts = preg_split('/\s+/u', $name, -1, PREG_SPLIT_NO_EMPTY);
    $initials = '';
    if (!empty($parts)) {
        $initials .= mb_strtoupper(mb_substr($parts[0], 0, 1));
        if (count($parts) > 1) {
            $initials .= mb_strtoupper(mb_substr($parts[count($parts) - 1], 0, 1));
        }
    }
    $initials = $initials !== '' ? $initials : 'KH';
@endphp

<div class="customer-panel card">
    <div class="card-body text-center p-4">
        <div class="customer-avatar mx-auto mb-3">{{ $initials }}</div>
        <h5 class="fw-bold mb-1">{{ $name }}</h5>
        <p class="text-muted small mb-0">{{ $email }}</p>
        <p class="text-muted small mb-0">Mã KH: {{ $id }}</p>
    </div>

    <div class="customer-menu list-group list-group-flush">
        <a href="{{ route('customer.account') }}" class="list-group-item list-group-item-action {{ request()->routeIs('customer.account') ? 'active' : '' }}">
            <i class="bi bi-person-circle me-2"></i>Thông tin
        </a>
        <a href="{{ route('customer.orders') }}" class="list-group-item list-group-item-action {{ request()->routeIs('customer.orders') ? 'active' : '' }}">
            <i class="bi bi-basket me-2"></i>Đơn hàng
        </a>
        <a href="{{ route('customer.notifications') }}" class="list-group-item list-group-item-action {{ request()->routeIs('customer.notifications') ? 'active' : '' }}">
            <i class="bi bi-bell me-2"></i>Thông báo
        </a>
        <form method="post" action="{{ route('customer.logout') }}" class="mb-0">
            @csrf
            <button type="submit" class="list-group-item list-group-item-action text-danger w-100 text-start border-0 bg-white">
                <i class="bi bi-box-arrow-right me-2"></i>Đăng xuất
            </button>
        </form>
    </div>
</div>
