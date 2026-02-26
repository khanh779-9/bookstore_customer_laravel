@extends('layouts.app')

@section('title', 'Chính sách bảo mật')

@section('content')
    <style>
        .privacy-hero { background: radial-gradient(circle at 70% 20%, #e0e7ff, #c7d2fe 40%, #ffffff 75%); }
        .privacy-pill { background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.5); }
    </style>

    <div class="container mt-4 pb-5">
        <div class="privacy-hero rounded-4 p-4 p-lg-5 mb-4 shadow-sm">
            <div class="row g-4 align-items-center">
                <div class="col-lg-7">
                    <div class="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill privacy-pill mb-3">
                        <span class="badge bg-primary rounded-pill">GDPR Compliant</span>
                        <span class="text-muted small">Bảo vệ dữ liệu quốc tế</span>
                    </div>
                    <h1 class="display-6 fw-bold mb-3">Chính sách bảo mật</h1>
                    <p class="lead text-muted mb-0">Bảo vệ thông tin cá nhân của bạn là ưu tiên hàng đầu. Chúng tôi cam kết minh bạch, an toàn và tuân thủ pháp luật.</p>
                </div>
                <div class="col-lg-5">
                    <div class="bg-white rounded-4 shadow-sm p-4 border">
                        <div class="d-flex align-items-center gap-3 mb-3"><span class="badge bg-primary rounded-circle" style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-lock-fill"></i></span><div><div class="fw-bold">Bảo mật từng lớp</div><small class="text-muted">Tường lửa & kiểm tra định kỳ</small></div></div>
                        <div class="d-flex align-items-center gap-3"><span class="badge bg-success rounded-circle" style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-check-circle-fill"></i></span><div><div class="fw-bold">Minh bạch hoàn toàn</div><small class="text-muted">Chính sách rõ ràng</small></div></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card shadow-sm border-0 mb-4"><div class="card-body p-4 p-lg-5"><h2 class="h4 fw-bold mb-2"><i class="bi bi-shield-lock me-2 text-primary"></i>Cam kết bảo mật</h2><p class="text-muted mb-0">BookZone cam kết bảo vệ quyền riêng tư của bạn và chỉ sử dụng thông tin cho mục đích phục vụ đơn hàng, chăm sóc khách hàng và cải thiện dịch vụ.</p></div></div>
                <div class="card shadow-sm border-0 mb-4"><div class="card-body p-4 p-lg-5"><h2 class="h4 fw-bold mb-3"><i class="bi bi-info-circle me-2 text-info"></i>Thông tin chúng tôi thu thập</h2><div class="row g-3"><div class="col-md-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Thông tin cá nhân</div><p class="small text-muted mb-0">Họ tên, email, số điện thoại, địa chỉ</p></div></div><div class="col-md-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Thông tin thanh toán</div><p class="small text-muted mb-0">Dữ liệu thanh toán được mã hóa</p></div></div><div class="col-md-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Lịch sử đơn hàng</div><p class="small text-muted mb-0">Sản phẩm mua, giá cả, thời điểm mua</p></div></div><div class="col-md-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Dữ liệu sử dụng</div><p class="small text-muted mb-0">IP, trình duyệt, trang đã truy cập</p></div></div></div></div></div>
                <div class="card shadow-sm border-0"><div class="card-body p-4 p-lg-5"><h2 class="h4 fw-bold mb-3"><i class="bi bi-gear me-2 text-warning"></i>Cách sử dụng thông tin</h2><ul class="mb-0 text-secondary"><li>Xử lý đơn hàng, giao hàng và thanh toán.</li><li>Liên hệ xác nhận, hỗ trợ và chăm sóc khách hàng.</li><li>Phân tích để cải thiện trải nghiệm mua sắm.</li><li>Bảo vệ hệ thống, phát hiện gian lận.</li></ul></div></div>
            </div>
            <div class="col-lg-4">
                <div class="card shadow-sm border-0"><div class="card-body p-4"><h5 class="fw-bold mb-3"><i class="bi bi-check-square me-2 text-success"></i>Tóm tắt bảo mật</h5><ul class="list-unstyled mb-3 small text-muted"><li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Mã hóa SSL 256-bit</li><li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Không bán dữ liệu</li><li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Sao lưu hàng ngày</li><li><i class="bi bi-check-circle-fill text-success me-2"></i>Kiểm tra bảo mật định kỳ</li></ul><a href="{{ route('customer.contact') }}" class="btn btn-outline-primary w-100"><i class="bi bi-question-circle me-2"></i>Hỏi về bảo mật</a></div></div>
            </div>
        </div>
    </div>
@endsection
