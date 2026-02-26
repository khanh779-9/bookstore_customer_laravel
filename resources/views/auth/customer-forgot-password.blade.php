@extends('layouts.app')

@section('title', 'Quên mật khẩu')

@section('content')
    <div class="row justify-content-center mt-4 pb-5">
        <div class="col-12 col-md-7 col-lg-5">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <h1 class="h5 mb-4 text-center fw-bold text-primary">Quên mật khẩu</h1>

                    @php($state = $state ?? 'request')

                    @if($state === 'request')
                        <form method="post" action="{{ route('customer.password.send-code') }}">
                            @csrf
                            <div class="mb-3">
                                <label class="form-label">Email tài khoản</label>
                                <input type="email" class="form-control" name="email" value="{{ old('email', $email ?? '') }}" required>
                            </div>
                            <button class="btn btn-primary w-100">Gửi mã xác nhận</button>
                        </form>
                    @elseif($state === 'verify')
                        <form method="post" action="{{ route('customer.password.verify-code') }}">
                            @csrf
                            <div class="alert alert-info">Mã xác nhận đã gửi đến email: <strong>{{ $email }}</strong></div>
                            <div class="mb-3">
                                <label class="form-label">Mã xác nhận (6 chữ số)</label>
                                <input type="text" class="form-control" name="code" maxlength="6" required>
                            </div>
                            <button class="btn btn-primary w-100">Xác thực mã</button>
                        </form>
                        <form method="post" action="{{ route('customer.password.send-code') }}" class="text-center mt-3">
                            @csrf
                            <input type="hidden" name="email" value="{{ $email }}">
                            <button class="btn btn-link btn-sm" type="submit">Gửi lại mã</button>
                        </form>
                    @else
                        <form method="post" action="{{ route('customer.password.reset') }}">
                            @csrf
                            <div class="alert alert-success">Xác thực thành công. Nhập mật khẩu mới cho <strong>{{ $email }}</strong>.</div>
                            <div class="mb-3">
                                <label class="form-label">Mật khẩu mới</label>
                                <input type="password" class="form-control" name="password" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Xác nhận mật khẩu mới</label>
                                <input type="password" class="form-control" name="password_confirmation" required>
                            </div>
                            <button class="btn btn-primary w-100">Đặt lại mật khẩu</button>
                        </form>
                    @endif

                    <div class="text-center mt-3">
                        <a href="{{ route('customer.login') }}">Quay về đăng nhập</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
