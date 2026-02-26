<!doctype html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Đăng nhập nhân viên - BookStore</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-body-tertiary">
<div class="container py-5">
    @if(session('success'))<div class="alert alert-success">{{ session('success') }}</div>@endif
    @if(session('error'))<div class="alert alert-danger">{{ session('error') }}</div>@endif
    @if($errors->any())
        <div class="alert alert-danger"><ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul></div>
    @endif
    <div class="row justify-content-center">
        <div class="col-12 col-md-5">
            <div class="card shadow-sm">
                <div class="card-body p-4">
                    <h1 class="h5 mb-3">Đăng nhập nhân viên</h1>
                    <form method="post" action="{{ route('employee.login.submit') }}">
                        @csrf
                        <div class="mb-3">
                            <label class="form-label">Mã nhân viên</label>
                            <input type="number" class="form-control" name="nhanvien_id" value="{{ old('nhanvien_id') }}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Mật khẩu</label>
                            <input type="password" class="form-control" name="password" required>
                        </div>
                        <button class="btn btn-dark w-100">Đăng nhập</button>
                    </form>
                    <a class="btn btn-link w-100 mt-2" href="{{ route('customer.home') }}">← Về trang khách hàng</a>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
