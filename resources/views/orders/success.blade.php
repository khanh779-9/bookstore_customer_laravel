@extends('layouts.app')

@section('title', 'BookStore - Đặt hàng thành công')

@section('content')
    <div class="card">
        <div class="card-body text-center py-5">
            <h1 class="h4 mb-3">Tạo đơn hàng thành công</h1>
            <p class="text-secondary mb-2">Đơn hàng đã được tạo ở trạng thái chờ thanh toán.</p>

            @if($order)
                <p class="mb-2">Mã đơn hàng của bạn: <strong>#{{ $order->hoadon_id }}</strong></p>
                <p class="mb-4">Trạng thái hiện tại: <span class="badge {{ order_status_badge_class($order->trangthai) }}">{{ order_status_label($order->trangthai) }}</span></p>

                @if($order->trangthai === 'cho_thanh_toan')
                    <form method="post" action="{{ route('customer.checkout.confirm') }}" class="d-inline-block me-2">
                        @csrf
                        <input type="hidden" name="order_id" value="{{ $order->hoadon_id }}">
                        <button type="submit" class="btn btn-success">Tôi đã thanh toán - Xác nhận đơn</button>
                    </form>
                @endif

                <a href="{{ route('customer.orders.detail', $order->hoadon_id) }}" class="btn btn-outline-primary">Xem chi tiết đơn</a>
            @elseif($orderId)
                <p class="mb-4">Mã đơn hàng của bạn: <strong>#{{ $orderId }}</strong></p>
            @endif

            <div class="mt-3">
                <a href="{{ route('customer.products.index') }}" class="btn btn-primary">Tiếp tục mua sắm</a>
            </div>
        </div>
    </div>
@endsection
