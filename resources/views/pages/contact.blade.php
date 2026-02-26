@extends('layouts.app')

@section('title', 'Liên hệ')

@section('content')
    <div class="container-fluid px-0 mt-4 pb-5">
        <div class="text-center mb-4">
            <h1 class="display-6 fw-bold mb-2">Liên hệ với chúng tôi</h1>
            <p class="text-muted">Chúng tôi luôn sẵn lòng lắng nghe mọi câu hỏi và góp ý của bạn.</p>
        </div>

        <div class="row g-4">
            <div class="col-lg-6">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-body p-4">
                        <h2 class="h5 fw-bold mb-4">Thông tin cửa hàng</h2>

                        <div class="vstack gap-3">
                            <div class="d-flex gap-3">
                                <i class="bi bi-geo-alt-fill text-primary"></i>
                                <div><div class="fw-semibold">Địa chỉ</div><div class="text-muted">180 Cao Lỗ, Quận 8, TP.HCM</div></div>
                            </div>
                            <div class="d-flex gap-3">
                                <i class="bi bi-telephone-fill text-primary"></i>
                                <div><div class="fw-semibold">Điện thoại</div><a href="tel:0239482958" class="text-decoration-none">0239 482 958</a></div>
                            </div>
                            <div class="d-flex gap-3">
                                <i class="bi bi-envelope-fill text-primary"></i>
                                <div><div class="fw-semibold">Email</div><a href="mailto:qkhanh12.duration060@passinbox.com" class="text-decoration-none">qkhanh12.duration060@passinbox.com</a></div>
                            </div>
                            <div class="d-flex gap-3">
                                <i class="bi bi-clock-fill text-primary"></i>
                                <div><div class="fw-semibold">Giờ làm việc</div><div class="text-muted">Thứ Hai - Chủ Nhật: 8:00 - 22:00</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <h2 class="h5 fw-bold mb-3">Gửi tin nhắn cho chúng tôi</h2>
                        <form class="row g-3">
                            <div class="col-12"><input class="form-control" placeholder="Họ và tên"></div>
                            <div class="col-md-6"><input class="form-control" type="email" placeholder="Email"></div>
                            <div class="col-md-6"><input class="form-control" placeholder="Số điện thoại"></div>
                            <div class="col-12"><input class="form-control" placeholder="Tiêu đề"></div>
                            <div class="col-12"><textarea class="form-control" rows="4" placeholder="Nội dung liên hệ"></textarea></div>
                            <div class="col-12"><button type="button" class="btn btn-primary w-100"><i class="bi bi-send me-2"></i>Gửi ngay</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
