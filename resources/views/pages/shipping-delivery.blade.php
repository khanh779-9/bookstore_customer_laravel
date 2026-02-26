@extends('layouts.app')

@section('title', 'Chính sách vận chuyển & giao hàng')

@section('content')
    <style>
        .shipping-hero { background: radial-gradient(circle at 30% 50%, #dbeafe, #a7f3d0 40%, #ffffff 75%); }
        .shipping-pill { background: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.5); }
    </style>

    <div class="container mt-4 pb-5">
        <div class="shipping-hero rounded-4 p-4 p-lg-5 mb-4 shadow-sm">
            <div class="row g-4 align-items-center">
                <div class="col-lg-7">
                    <div class="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill shipping-pill mb-3">
                        <span class="badge bg-success rounded-pill">BookZone Logistics</span>
                        <span class="text-muted small">Giao nhanh, đảm bảo an toàn</span>
                    </div>
                    <h1 class="display-6 fw-bold mb-3">Vận chuyển & Giao hàng</h1>
                    <p class="lead text-muted mb-0">Hợp tác với các đối tác vận chuyển uy tín, đảm bảo sản phẩm đến tay bạn nhanh chóng và an toàn.</p>
                </div>
                <div class="col-lg-5">
                    <div class="bg-white rounded-4 shadow-sm p-4 border">
                        <div class="d-flex align-items-center gap-3 mb-3"><span class="badge bg-success rounded-circle" style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-truck"></i></span><div><div class="fw-bold">Nhiều lựa chọn</div><small class="text-muted">Giao nhanh hoặc tiêu chuẩn</small></div></div>
                        <div class="d-flex align-items-center gap-3"><span class="badge bg-primary rounded-circle" style="width:46px;height:46px;display:flex;align-items:center;justify-content:center;"><i class="bi bi-shield-check"></i></span><div><div class="fw-bold">Bảo hiểm hàng</div><small class="text-muted">Bảo vệ sản phẩm</small></div></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card shadow-sm border-0 mb-4">
                    <div class="card-body p-4 p-lg-5">
                        <h2 class="h4 fw-bold mb-3"><i class="bi bi-truck me-2 text-success"></i>Dịch vụ vận chuyển</h2>
                        <div class="row g-3">
                            <div class="col-md-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Giao nhanh</div><p class="text-muted small mb-0">1-2 ngày làm việc</p></div></div>
                            <div class="col-md-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Giao tiêu chuẩn</div><p class="text-muted small mb-0">3-5 ngày làm việc</p></div></div>
                            <div class="col-md-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Toàn quốc</div><p class="text-muted small mb-0">Tất cả tỉnh thành</p></div></div>
                            <div class="col-md-6"><div class="p-3 rounded-3 bg-light h-100"><div class="fw-bold mb-1">Lấy tại cửa hàng</div><p class="text-muted small mb-0">Miễn phí vận chuyển</p></div></div>
                        </div>
                    </div>
                </div>

                <div class="card shadow-sm border-0">
                    <div class="card-body p-4 p-lg-5">
                        <h2 class="h4 fw-bold mb-3"><i class="bi bi-question-circle me-2 text-info"></i>Câu hỏi thường gặp</h2>
                        <div class="accordion" id="shippingFAQ">
                            <div class="accordion-item">
                                <h2 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">Tôi có thể theo dõi đơn hàng không?</button></h2>
                                <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#shippingFAQ"><div class="accordion-body">Có, sau khi đặt hàng bạn sẽ nhận được mã vận đơn để theo dõi trạng thái giao hàng.</div></div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">Hàng bị hỏng hoặc thất lạc thì sao?</button></h2>
                                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#shippingFAQ"><div class="accordion-body">Liên hệ với chúng tôi ngay để được hỗ trợ xử lý và bồi hoàn theo chính sách.</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="card shadow-sm border-0">
                    <div class="card-body p-4">
                        <h5 class="fw-bold mb-3"><i class="bi bi-building me-2 text-success"></i>Đối tác vận chuyển</h5>
                        <ul class="list-unstyled mb-0 small text-muted">
                            <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Giao hàng nhanh</li>
                            <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>Viettel Post</li>
                            <li class="mb-2"><i class="bi bi-check-circle-fill text-success me-2"></i>DHL Express</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i>Và các đối tác khác</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
