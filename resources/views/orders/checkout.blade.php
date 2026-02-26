@extends('layouts.app')

@section('title', 'BookStore - Thanh toán')

@section('content')
    <div class="container-fluid px-0 mt-4">
    <h1 class="h4 fw-bold mb-4">Thanh toán</h1>

    @if($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="row g-4 pb-5">
        <div class="col-12 col-lg-7">
            <form action="{{ route('customer.checkout.store') }}" method="post" class="card shadow-sm border-0">
                @csrf
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Khách hàng</label>
                        <input type="text" class="form-control" value="{{ session('customer.name') }} (ID: {{ session('customer.id') }})" disabled>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Địa chỉ giao hàng</label>
                        <select class="form-select" name="dcgh_id">
                            <option value="">-- Chọn địa chỉ --</option>
                            @foreach($addresses as $address)
                                <option value="{{ $address->dcgh_id }}" @selected((string) old('dcgh_id') === (string) $address->dcgh_id)>{{ $address->diachi }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Phương thức thanh toán</label>
                        <select class="form-select" name="phuongthuc_thanhtoan" required>
                            @foreach(payment_method_options_for_checkout() as $methodCode => $methodLabel)
                                <option value="{{ $methodCode }}" @selected(old('phuongthuc_thanhtoan', 'tien_mat') === $methodCode)>{{ $methodLabel }}</option>
                            @endforeach
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Ghi chú</label>
                        <textarea class="form-control" name="ghichu" rows="3">{{ old('ghichu') }}</textarea>
                    </div>

                    <button class="btn btn-success" type="submit">Xác nhận & đặt hàng</button>
                </div>
            </form>
        </div>

        <div class="col-12 col-lg-5">
            <div class="card shadow-sm border-0 position-sticky" style="top:90px;">
                <div class="card-header bg-white fw-bold">Đơn hàng của bạn</div>
                <ul class="list-group list-group-flush">
                    @foreach($cart as $item)
                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div>
                                <div>{{ $item['name'] }}</div>
                                <small class="text-secondary">SL: {{ $item['quantity'] }}</small>
                            </div>
                            <strong>{{ number_format($item['subtotal'], 0, ',', '.') }}₫</strong>
                        </li>
                    @endforeach
                    <li class="list-group-item d-flex justify-content-between">
                        <strong>Tổng cộng</strong>
                        <strong class="text-primary fs-5">{{ number_format($total, 0, ',', '.') }}₫</strong>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </div>
@endsection
