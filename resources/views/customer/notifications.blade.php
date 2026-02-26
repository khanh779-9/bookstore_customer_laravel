@extends('layouts.app')

@section('title', 'Thông báo')

@section('content')
    @php
        $iconByType = [
            'khuyen_mai' => 'bi-gift',
            'don_hang' => 'bi-truck',
            'khach_hang' => 'bi-person-circle',
            'he_thong' => 'bi-bell',
        ];
    @endphp

    <div class="customer-portal mt-5">
        <div class="row g-4">
            <div class="col-lg-3">
                @include('customer.partials.portal-sidebar')
            </div>

            <div class="col-lg-9">
                <div class="customer-content-card card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h1 class="h5 m-2 fw-bold">Thông báo của tôi</h1>
                        <div class="d-flex align-items-center gap-2 me-2">
                            <span class="badge text-bg-primary">{{ $notifications->total() }} thông báo</span>
                            <form method="post" action="{{ route('customer.notifications.mark-all') }}" class="mb-0">
                                @csrf
                                <button type="submit" class="btn btn-sm btn-outline-primary">Đánh dấu đã đọc tất cả</button>
                            </form>
                        </div>
                    </div>

                    <div class="card-body p-4">
                        <form method="get" action="{{ route('customer.notifications') }}" class="row g-2 align-items-end mb-4">
                            <div class="col-12 col-md-4">
                                <label class="form-label">Lọc theo loại</label>
                                <select class="form-select" name="loai">
                                    <option value="">Tất cả loại</option>
                                    @foreach(notification_type_options() as $typeCode => $typeLabel)
                                        <option value="{{ $typeCode }}" @selected(($selectedType ?? '') === $typeCode)>{{ $typeLabel }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-12 col-md-4">
                                <label class="form-label">Lọc theo trạng thái</label>
                                <select class="form-select" name="trang_thai">
                                    <option value="">Tất cả trạng thái</option>
                                    @foreach(notification_status_filter_options() as $statusCode => $statusLabel)
                                        <option value="{{ $statusCode }}" @selected(($selectedStatus ?? '') === $statusCode)>{{ $statusLabel }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <div class="col-12 col-md-4 d-flex gap-2">
                                <button type="submit" class="btn btn-primary">Áp dụng</button>
                                <a href="{{ route('customer.notifications') }}" class="btn btn-outline-secondary">Đặt lại</a>
                            </div>
                        </form>

                        @forelse($notifications as $notification)
                            @php
                                $icon = $iconByType[$notification->loai] ?? 'bi-bell';
                                $statusCode = $notification->trang_thai ?? null;
                                $isUnread = $statusCode === notification_unread_code();
                                $isArchived = $statusCode === notification_archived_code();
                                $statusText = notification_status_label($statusCode);
                                $typeText = notification_type_label($notification->loai ?? null);
                            @endphp
                            <div class="notification-item p-3 mb-3">
                                <div class="d-flex align-items-start gap-3">
                                    <div class="note-icon">
                                        <i class="bi {{ $icon }} text-primary"></i>
                                    </div>
                                    <div class="flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-start gap-2">
                                            <div class="d-flex align-items-center gap-2">
                                                <strong>{{ $notification->tieu_de }}</strong>
                                                <span class="badge text-bg-light border">{{ $typeText }}</span>
                                            </div>
                                            <div class="d-flex align-items-center gap-2">
                                                <span class="badge {{ notification_status_badge_class($statusCode) }}">{{ $statusText }}</span>
                                                <small class="text-secondary">{{ !empty($notification->ngay_tao) ? date('d/m/Y H:i', strtotime((string) $notification->ngay_tao)) : '-' }}</small>
                                            </div>
                                        </div>
                                        <div class="text-secondary mt-1">{{ $notification->noi_dung }}</div>
                                        <div class="d-flex gap-2 mt-2">
                                            <form method="post" action="{{ route('customer.notifications.toggle', $notification->thongbao_id) }}" class="mb-0">
                                                @csrf
                                                <button type="submit" class="btn btn-sm btn-outline-success">
                                                    {{ notification_toggle_read_text($statusCode) }}
                                                </button>
                                            </form>
                                            @if(! $isArchived)
                                                <form method="post" action="{{ route('customer.notifications.archive', $notification->thongbao_id) }}" class="mb-0">
                                                    @csrf
                                                    <button type="submit" class="btn btn-sm btn-outline-secondary">Lưu trữ</button>
                                                </form>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @empty
                            <div class="text-center customer-empty py-5">
                                <i class="bi bi-inbox fs-1"></i>
                                <div class="mt-2">Chưa có thông báo.</div>
                            </div>
                        @endforelse
                        <div class="mt-3">{{ $notifications->appends(request()->query())->links() }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
