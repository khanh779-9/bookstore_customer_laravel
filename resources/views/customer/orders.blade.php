@extends('layouts.app')

@section('title', 'Đơn hàng của tôi')

@section('content')
    <div class="customer-portal mt-5">
        <div class="row g-4">
            <div class="col-lg-3">
                @include('customer.partials.portal-sidebar')
            </div>

            <div class="col-lg-9">
                <div class="customer-content-card card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h1 class="h5 m-2 fw-bold">Đơn hàng của tôi</h1>
                        <span class="badge text-bg-primary me-2">{{ $orders->total() }} đơn</span>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table customer-orders-table align-middle mb-0">
                                <thead>
                                <tr>
                                    <th class="ps-4">Mã đơn</th>
                                    <th>Ngày tạo</th>
                                    <th>Trạng thái</th>
                                    <th class="text-end pe-4">Tổng tiền</th>
                                    <th class="pe-4"></th>
                                </tr>
                                </thead>
                                <tbody>
                                @forelse($orders as $order)
                                    <tr>
                                        <td class="ps-4 fw-semibold">#{{ $order->hoadon_id }}</td>
                                        <td>{{ !empty($order->ngaytao) ? date('d/m/Y H:i', strtotime((string) $order->ngaytao)) : '-' }}</td>
                                        <td><span class="badge {{ order_status_badge_class($order->trangthai) }}">{{ order_status_label($order->trangthai) }}</span></td>
                                        <td class="text-end pe-4 fw-semibold text-primary">{{ number_format((float) $order->tongtien, 0, ',', '.') }}₫</td>
                                        <td class="pe-4 text-end">
                                            <a href="{{ route('customer.orders.detail', $order->hoadon_id) }}" class="btn btn-sm btn-outline-primary">Xem chi tiết</a>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan="5" class="text-center customer-empty py-5">Bạn chưa có đơn hàng nào.</td>
                                    </tr>
                                @endforelse
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="mt-3">{{ $orders->links() }}</div>
            </div>
        </div>
    </div>
@endsection
