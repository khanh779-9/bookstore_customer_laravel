@extends('layouts.app')

@section('title', 'Đăng ký khách hàng')

@section('content')
    <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-7">
            <div class="card">
                <div class="card-body">
                    <h1 class="h5 mb-3">Đăng ký tài khoản khách hàng</h1>
                    <form method="post" action="{{ route('customer.register.submit') }}" class="row g-3">
                        @csrf
                        <div class="col-md-4">
                            <label class="form-label">Họ</label>
                            <input class="form-control" name="ho" value="{{ old('ho') }}" required>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Tên đệm</label>
                            <input class="form-control" name="tendem" value="{{ old('tendem') }}">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Tên</label>
                            <input class="form-control" name="ten" value="{{ old('ten') }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-control" name="email" value="{{ old('email') }}" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">SĐT</label>
                            <input class="form-control" name="sdt" value="{{ old('sdt') }}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Mật khẩu</label>
                            <input type="password" class="form-control" name="password" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Xác nhận mật khẩu</label>
                            <input type="password" class="form-control" name="password_confirmation" required>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary">Đăng ký</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
