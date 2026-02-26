@extends('layouts.app')

@section('title', 'Chi tiết đơn hàng')

@section('content')
    <div class="customer-portal mt-5">
        <div class="row g-4">
            <div class="col-lg-3">
                @include('customer.partials.portal-sidebar')
            </div>

            <div class="col-lg-9">
                <div class="customer-content-card card mb-3">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h1 class="h5 m-2 fw-bold">Chi tiết đơn #{{ $order->hoadon_id }}</h1>
                        <a href="{{ route('customer.orders') }}" class="btn btn-sm btn-outline-secondary me-2">Quay lại danh sách đơn</a>
                    </div>
                    <div class="card-body p-4">
                        <div class="row g-3">
                            <div class="col-md-4">
                                <div class="small text-muted">Ngày tạo</div>
                                <div class="fw-semibold">{{ !empty($order->ngaytao) ? date('d/m/Y H:i', strtotime((string) $order->ngaytao)) : '-' }}</div>
                            </div>
                            <div class="col-md-4">
                                <div class="small text-muted">Trạng thái</div>
                                <div class="fw-semibold">
                                    <span class="badge {{ order_status_badge_class($order->trangthai) }}">{{ order_status_label($order->trangthai) }}</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="small text-muted">Tổng tiền</div>
                                <div class="fw-bold text-primary">{{ number_format((float) $order->tongtien, 0, ',', '.') }}₫</div>
                            </div>
                            <div class="col-md-4">
                                <div class="small text-muted">Phương thức thanh toán</div>
                                <div class="fw-semibold">{{ payment_method_label($order->phuongthuc_thanhtoan) }}</div>
                            </div>
                            <div class="col-md-8">
                                <div class="small text-muted">Địa chỉ giao hàng</div>
                                <div class="fw-semibold">{{ $deliveryAddress?->diachi ?: 'Chưa chọn địa chỉ giao hàng' }}</div>
                            </div>
                            <div class="col-md-4">
                                <div class="small text-muted">Trạng thái thanh toán</div>
                                <div class="fw-semibold">
                                    @if($order->trangthai === 'cho_thanh_toan')
                                        <span class="badge bg-warning text-dark">Chưa xác nhận</span>
                                    @else
                                        <span class="badge bg-success">Đã xác nhận</span>
                                    @endif
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="small text-muted">Ghi chú</div>
                                <div class="fw-semibold">{{ $order->ghichu ?: 'Không có ghi chú' }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="customer-content-card card">
                    <div class="card-header">
                        <h2 class="h6 m-2 fw-bold">Sản phẩm trong đơn</h2>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table customer-orders-table align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th class="ps-4">Sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th class="text-end">Đơn giá</th>
                                        <th class="text-end pe-4">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @forelse($items as $item)
                                        @php
                                            $product = $products[$item->sanpham_id] ?? null;
                                        @endphp
                                        <tr>
                                            <td class="ps-4 fw-semibold">{{ $product?->ten_hien_thi ?? ('Sản phẩm #' . $item->sanpham_id) }}</td>
                                            <td>{{ (int) $item->soluong }}</td>
                                            <td class="text-end">{{ number_format((float) $item->dongia, 0, ',', '.') }}₫</td>
                                            <td class="text-end pe-4">{{ number_format((float) $item->thanhtien, 0, ',', '.') }}₫</td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="4" class="text-center customer-empty py-5">Không có sản phẩm trong đơn hàng này.</td>
                                        </tr>
                                    @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
