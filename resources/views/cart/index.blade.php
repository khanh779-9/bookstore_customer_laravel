@extends('layouts.app')

@section('title', 'BookStore - Giỏ hàng')

@section('content')
    <div class="container-fluid px-0 mt-4 pb-5">
    <h1 class="h4 fw-bold mb-4">Giỏ hàng</h1>

    @if(empty($cart))
        <div class="alert alert-info">Giỏ hàng đang trống. <a href="{{ route('customer.products.index') }}">Mua hàng ngay</a>.</div>
    @else
        <div class="row">
            <div class="col-lg-8">
        <div class="table-responsive bg-white border rounded shadow-sm">
            <table class="table mb-0 align-middle cart-table">
                <thead>
                <tr>
                    <th>Sản phẩm</th>
                    <th class="text-center">Đơn giá</th>
                    <th class="text-center">Số lượng</th>
                    <th class="text-end">Thành tiền</th>
                    <th class="text-center">Xóa</th>
                </tr>
                </thead>
                <tbody>
                @foreach($cart as $item)
                    <tr class="cart-row">
                        <td class="fw-semibold">{{ $item['name'] }}</td>
                        <td class="text-center text-primary fw-semibold">{{ number_format($item['price'], 0, ',', '.') }}₫</td>
                        <td style="max-width: 200px;" class="text-center">
                            <form action="{{ route('customer.cart.update', $item['sanpham_id']) }}" method="post" class="d-flex gap-2 justify-content-center">
                                @csrf
                                @method('PATCH')
                                <input type="number" name="quantity" min="1" value="{{ $item['quantity'] }}" class="form-control form-control-sm" style="max-width: 80px;">
                                <button class="btn btn-sm btn-outline-primary">Lưu</button>
                            </form>
                        </td>
                        <td class="text-end fw-bold text-primary">{{ number_format($item['subtotal'], 0, ',', '.') }}₫</td>
                        <td class="text-center">
                            <form action="{{ route('customer.cart.remove', $item['sanpham_id']) }}" method="post">
                                @csrf
                                @method('DELETE')
                                <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                            </form>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>

        <div class="d-flex justify-content-between mt-3">
            <a href="{{ route('customer.products.index') }}" class="btn btn-light border fw-bold">
                <i class="bi bi-arrow-left me-1"></i> Tiếp tục mua sắm
            </a>
        </div>
            </div>

            <div class="col-lg-4 mt-4 mt-lg-0">
                <div class="card shadow-sm border-0 position-sticky" style="top:90px;">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Tóm tắt đơn hàng</h5>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Tạm tính</span>
                            <span class="fw-bold">{{ number_format($total, 0, ',', '.') }}₫</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>Phí vận chuyển</span>
                            <span class="fw-bold">0₫</span>
                        </div>
                        <div class="border-top pt-3 d-flex justify-content-between mt-3">
                            <span class="fw-bold fs-5">Tổng cộng</span>
                            <span class="text-primary fw-bold fs-4">{{ number_format($total, 0, ',', '.') }}₫</span>
                        </div>
                        <a href="{{ route('customer.checkout.create') }}" class="btn btn-primary w-100 fw-bold mt-4 py-2 fs-5">Thanh toán ngay</a>
                    </div>
                </div>
            </div>
        </div>

    @endif
    </div>
@endsection
