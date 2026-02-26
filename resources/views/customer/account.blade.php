@extends('layouts.app')

@section('title', 'Tài khoản khách hàng')

@section('content')
    @php
        $profile = $customerRecord ?? null;
    @endphp

    <div class="customer-portal mt-5">
        <div class="row g-4">
            <div class="col-lg-3">
                @include('customer.partials.portal-sidebar', ['customer' => $customer])
            </div>

            <div class="col-lg-9">
                <div class="customer-content-card card">
                    <div class="card-header">
                        <h1 class="h5 m-2 fw-bold">Thông tin cá nhân</h1>
                    </div>
                    <div class="card-body p-4">
                        <form method="post" action="{{ route('customer.account.profile') }}" class="row g-3">
                            @csrf
                            <div class="col-md-4">
                                <label class="form-label">Họ</label>
                                <input type="text" class="form-control" name="ho" value="{{ old('ho', $profile->ho ?? '') }}" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Tên đệm</label>
                                <input type="text" class="form-control" name="tendem" value="{{ old('tendem', $profile->tendem ?? '') }}">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Tên</label>
                                <input type="text" class="form-control" name="ten" value="{{ old('ten', $profile->ten ?? '') }}" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Email</label>
                                <input type="text" class="form-control" value="{{ $profile->email ?? ($customer['email'] ?? '-') }}" disabled>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">SĐT</label>
                                <input type="text" class="form-control" name="sdt" value="{{ old('sdt', $profile->sdt ?? '') }}">
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Ngày sinh</label>
                                <input type="date" class="form-control" name="ngaysinh" value="{{ old('ngaysinh', !empty($profile?->ngaysinh) ? substr((string) $profile->ngaysinh, 0, 10) : '') }}">
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary px-4">Cập nhật</button>
                            </div>
                        </form>

                        <hr class="my-4">

                        <h5 class="h6 fw-bold mb-3">Đổi mật khẩu</h5>
                        <form method="post" action="{{ route('customer.account.password') }}" class="row g-3">
                            @csrf
                            <div class="col-md-4">
                                <label class="form-label">Mật khẩu hiện tại</label>
                                <input type="password" class="form-control" name="current_password" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Mật khẩu mới</label>
                                <input type="password" class="form-control" name="new_password" required>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label">Xác nhận mật khẩu mới</label>
                                <input type="password" class="form-control" name="new_password_confirmation" required>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-outline-primary">Đổi mật khẩu</button>
                            </div>
                        </form>

                        <hr class="my-4">

                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h5 class="h6 fw-bold mb-0">Địa chỉ giao hàng</h5>
                        </div>

                        <form method="post" action="{{ route('customer.account.addresses.add') }}" class="row g-2 mb-3">
                            @csrf
                            <div class="col-12 col-md-9">
                                <input type="text" class="form-control" name="diachi" placeholder="Nhập địa chỉ giao hàng mới" required>
                            </div>
                            <div class="col-12 col-md-3 d-grid">
                                <button type="submit" class="btn btn-primary">Thêm địa chỉ</button>
                            </div>
                        </form>

                        @if(($addresses ?? collect())->isEmpty())
                            <div class="customer-empty">Chưa có địa chỉ giao hàng nào.</div>
                        @else
                            <div class="row g-3">
                                @foreach($addresses as $address)
                                    <div class="col-12">
                                        <div class="border rounded-3 p-3">
                                            <form method="post" action="{{ route('customer.account.addresses.update', $address->dcgh_id) }}" class="row g-2 align-items-center">
                                                @csrf
                                                @method('PUT')
                                                <div class="col-12 col-md-8">
                                                    <input type="text" class="form-control" name="diachi" value="{{ $address->diachi }}" required>
                                                </div>
                                                <div class="col-6 col-md-2 d-grid">
                                                    <button type="submit" class="btn btn-outline-primary btn-sm">Lưu</button>
                                                </div>
                                            </form>
                                            <form method="post" action="{{ route('customer.account.addresses.delete', $address->dcgh_id) }}" class="mt-2">
                                                @csrf
                                                @method('DELETE')
                                                <button type="submit" class="btn btn-outline-danger btn-sm" onclick="return confirm('Xóa địa chỉ này?')">Xóa</button>
                                            </form>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>

    @if($errors->any())
        <div class="alert alert-danger mt-3">
            <ul class="mb-0">
                @foreach($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif
@endsection
