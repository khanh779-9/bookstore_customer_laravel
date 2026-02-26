@extends('layouts.app')

@section('title', 'Đăng nhập khách hàng')

@section('content')
    <div class="row justify-content-center mt-2 mb-4">
        <div class="col-12 col-md-6 col-lg-5 col-xl-4">
            <div class="card shadow border-0">
                <div class="card-body p-4">
                    <h1 class="h4 text-center mb-4 fw-bold text-primary">Đăng nhập khách hàng</h1>
                    <form method="post" action="{{ route('customer.login.submit') }}">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label">Email</label>
                            <input class="form-control" type="email" name="email" value="{{ old('email') }}" placeholder="Nhập email" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mật khẩu</label>
                            <div class="position-relative">
                                <input id="loginPassword" class="form-control pe-5" type="password" name="password" placeholder="Nhập mật khẩu" required>
                                <button id="togglePasswordBtn" class="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary text-decoration-none" type="button" aria-label="Hiện hoặc ẩn mật khẩu">
                                    <i id="togglePasswordIcon" class="bi bi-eye-fill"></i>
                                </button>
                            </div>
                        </div>
                        <div class="text-end mb-3">
                            <a href="{{ route('customer.password.forgot') }}" class="small">Quên mật khẩu?</a>
                        </div>
                        <button class="btn btn-primary w-100">Đăng nhập</button>

                        <div class="text-center my-3">
                            <a href="{{ route('customer.login.google') }}" class="btn btn-outline-danger w-100 fw-medium">
                                <i class="bi bi-google me-2"></i>Đăng nhập với Google
                            </a>
                        </div>
                    </form>

                    <div class="text-center mt-3">
                        <span class="text-muted small">Chưa có tài khoản?</span>
                        <a href="{{ route('customer.register') }}" class="fw-semibold">Đăng ký</a>
                    </div>

                    <div class="text-center mt-2 small text-muted">
                        Đăng nhập với tài khoản nội bộ?
                        <a href="{{ route('employee.login') }}" class="text-danger fw-semibold text-decoration-none">Đăng nhập</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        (function () {
            const passwordInput = document.getElementById('loginPassword');
            const toggleBtn = document.getElementById('togglePasswordBtn');
            const toggleIcon = document.getElementById('togglePasswordIcon');

            if (!passwordInput || !toggleBtn || !toggleIcon) {
                return;
            }

            toggleBtn.addEventListener('click', function () {
                const showPassword = passwordInput.type === 'password';
                passwordInput.type = showPassword ? 'text' : 'password';
                toggleIcon.className = showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill';
            });
        })();
    </script>
@endsection
