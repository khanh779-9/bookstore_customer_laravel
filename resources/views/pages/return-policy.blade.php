@extends('layouts.app')

@section('title', 'Chính sách đổi trả')

@section('content')
    <style>
        .return-hero { background: radial-gradient(circle at 20% 20%, #eef2ff, #e0f2fe 45%, #ffffff 80%); }
        .return-pill { background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.5); }
        .timeline-clean { position: relative; --icon-size: 38px; --icon-left: 0.95rem; --icon-top: 0.25rem; }
        .timeline-clean::before { content: ""; position: absolute; left: calc(var(--icon-left) + (var(--icon-size) / 2)); top: calc(var(--icon-top) + (var(--icon-size) / 2)); bottom: calc((var(--icon-size) / 2) - var(--icon-top)); width: 2px; background: #e5e7eb; }
        .timeline-clean .step .d-flex { position: relative; }
        .timeline-clean .step .icon-circle { position: absolute; left: var(--icon-left); top: var(--icon-top); width: var(--icon-size); height: var(--icon-size); display: flex; align-items: center; justify-content: center; border-radius: 50%; background: linear-gradient(135deg, #4f46e5, #2563eb); color: #fff; font-weight: 700; font-size: 15px; box-shadow: 0 8px 18px rgba(37, 99, 235, 0.2); }
        .timeline-clean .step .d-flex > div:last-child { margin-left: 3.5rem; }
    </style>

    <div class="container mt-4 pb-5">
        <div class="return-hero rounded-4 p-4 p-lg-5 mb-4 shadow-sm overflow-hidden">
            <div class="row g-4 align-items-center">
                <div class="col-lg-7">
                    <div class="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill return-pill mb-3">
                        <span class="badge bg-primary rounded-pill">BookZone Care</span>
                        <span class="text-muted small">Đổi trả nhanh - xử lý minh bạch</span>
                    </div>
                    <h1 class="display-6 fw-bold mb-3">Chính sách đổi trả</h1>
                    <p class="lead text-muted mb-0">Tự tin mua sắm với quy trình đổi trả rõ ràng, linh hoạt và ưu tiên quyền lợi khách hàng.</p>
                </div>
                <div class="col-lg-5">
                    <div class="bg-white rounded-4 shadow-sm p-4 border">
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <span class="badge bg-success rounded-circle" style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-shield-check"></i></span>
                            <div><div class="fw-bold">An tâm 1 đổi 1</div><small class="text-muted">Áp dụng với sản phẩm lỗi do nhà sản xuất</small></div>
                        </div>
                        <div class="d-flex align-items-center gap-3">
                            <span class="badge bg-primary rounded-circle" style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-clock-history"></i></span>
                            <div><div class="fw-bold">5-7 ngày</div><small class="text-muted">Thời gian xử lý trung bình</small></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body p-4 p-lg-5">
                        <h2 class="h4 fw-bold mb-3"><i class="bi bi-arrow-left-right me-2 text-primary"></i>Điều kiện đổi trả</h2>
                        <div class="row g-3">
                            <div class="col-sm-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Thời gian</div><p class="text-muted small mb-0">Đổi trả trong vòng 30 ngày kể từ ngày nhận hàng.</p></div></div>
                            <div class="col-sm-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Tình trạng</div><p class="text-muted small mb-0">Sản phẩm còn nguyên vẹn, chưa sử dụng hoặc lỗi do nhà sản xuất.</p></div></div>
                            <div class="col-sm-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Hóa đơn & bao bì</div><p class="text-muted small mb-0">Kèm hóa đơn gốc, tem mác và phụ kiện (nếu có).</p></div></div>
                            <div class="col-sm-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Chi phí vận chuyển</div><p class="text-muted small mb-0">Miễn phí với sản phẩm lỗi kỹ thuật do nhà sản xuất.</p></div></div>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm border-0">
                    <div class="card-body p-4 p-lg-5">
                        <h2 class="h4 fw-bold mb-3"><i class="bi bi-bag-check me-2 text-success"></i>Quy trình đổi trả</h2>
                        <div class="timeline-clean">
                            <div class="step mb-4"><div class="d-flex align-items-start gap-3"><div class="icon-circle">1</div><div><div class="fw-bold">Báo yêu cầu</div><p class="text-muted small mb-1">Liên hệ hotline hoặc trang Liên hệ, cung cấp mã đơn và lý do đổi trả.</p></div></div></div>
                            <div class="step mb-4"><div class="d-flex align-items-start gap-3"><div class="icon-circle">2</div><div><div class="fw-bold">Chuẩn bị sản phẩm</div><p class="text-muted small mb-1">Giữ nguyên phụ kiện, tem mác và đóng gói cùng hóa đơn.</p></div></div></div>
                            <div class="step mb-4"><div class="d-flex align-items-start gap-3"><div class="icon-circle">3</div><div><div class="fw-bold">Gửi về BookZone</div><p class="text-muted small mb-1">Gửi đến trung tâm đổi trả theo hướng dẫn từ CSKH.</p></div></div></div>
                            <div class="step"><div class="d-flex align-items-start gap-3"><div class="icon-circle">4</div><div><div class="fw-bold">Nhận kết quả</div><p class="text-muted small mb-0">Hoàn tiền, đổi mới hoặc sửa chữa theo kết quả kiểm tra.</p></div></div></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body p-4">
                        <h5 class="fw-bold mb-3"><i class="bi bi-headset me-2 text-primary"></i>Cần hỗ trợ ngay?</h5>
                        <p class="text-muted small mb-3">Đội ngũ CSKH sẵn sàng hỗ trợ trong giờ hành chính.</p>
                        <div class="d-grid gap-2">
                            <a href="{{ route('customer.contact') }}" class="btn btn-primary"><i class="bi bi-envelope me-2"></i>Gửi yêu cầu đổi trả</a>
                            <a href="tel:0239482958" class="btn btn-outline-primary"><i class="bi bi-telephone me-2"></i>Hotline 0239 482 958</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
