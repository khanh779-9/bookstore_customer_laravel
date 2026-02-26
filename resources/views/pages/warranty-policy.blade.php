@extends('layouts.app')

@section('title', 'Chính sách bảo hành')

@section('content')
    <style>
        .warranty-hero { background: radial-gradient(circle at 80% 30%, #fef3c7, #fecaca 35%, #ffffff 70%); }
        .warranty-pill { background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.5); }
    </style>

    <div class="container mt-4 pb-5">
        <div class="warranty-hero rounded-4 p-4 p-lg-5 mb-4 shadow-sm">
            <div class="row g-4 align-items-center">
                <div class="col-lg-7">
                    <div class="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill warranty-pill mb-3">
                        <span class="badge bg-warning rounded-pill">BookZone Guarantee</span>
                        <span class="text-muted small">Sửa chữa hoặc thay thế miễn phí</span>
                    </div>
                    <h1 class="display-6 fw-bold mb-3">Chính sách bảo hành</h1>
                    <p class="lead text-muted mb-0">Tất cả sản phẩm BookZone đều được bảo hành chuyên nghiệp với thời gian phù hợp từng loại sản phẩm.</p>
                </div>
                <div class="col-lg-5">
                    <div class="bg-white rounded-4 shadow-sm p-4 border">
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <span class="badge bg-warning rounded-circle" style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-shield-check"></i></span>
                            <div><div class="fw-bold">Miễn phí sửa chữa</div><small class="text-muted">Cho lỗi do nhà sản xuất</small></div>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <span class="badge bg-primary rounded-circle" style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-box-seam"></i></span>
                            <div><div class="fw-bold">Trả về miễn phí</div><small class="text-muted">Nếu lỗi do NSX</small></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body p-4 p-lg-5">
                        <h2 class="h4 fw-bold mb-3"><i class="bi bi-shield-check me-2 text-warning"></i>Thời hạn bảo hành</h2>
                        <div class="row g-3">
                            <div class="col-sm-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Sách & Văn phòng</div><p class="text-muted small mb-0">7 ngày từ ngày nhận</p></div></div>
                            <div class="col-sm-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Sản phẩm điện tử</div><p class="text-muted small mb-0">12 tháng từ ngày mua</p></div></div>
                            <div class="col-sm-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Bộ quà tặng</div><p class="text-muted small mb-0">14 ngày từ ngày nhận</p></div></div>
                            <div class="col-sm-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Sản phẩm khác</div><p class="text-muted small mb-0">Theo quy định NSX</p></div></div>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm border-0">
                    <div class="card-body p-4 p-lg-5">
                        <h2 class="h4 fw-bold mb-3"><i class="bi bi-tools me-2 text-info"></i>Điều kiện bảo hành</h2>
                        <ul class="mb-0 text-secondary">
                            <li>Lỗi kỹ thuật không do người dùng gây ra.</li>
                            <li>Còn trong thời hạn bảo hành quy định.</li>
                            <li>Có hóa đơn/giấy tờ mua hàng hợp lệ.</li>
                            <li>Không bị tháo rời hoặc sửa chữa trái phép.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <h5 class="fw-bold mb-3"><i class="bi bi-headset me-2 text-warning"></i>Hỗ trợ bảo hành</h5>
                        <p class="text-muted small mb-3">Liên hệ với chúng tôi để được hướng dẫn gửi sản phẩm bảo hành.</p>
                        <a href="{{ route('customer.contact') }}" class="btn btn-outline-warning w-100"><i class="bi bi-envelope me-2"></i>Liên hệ CSKH</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
