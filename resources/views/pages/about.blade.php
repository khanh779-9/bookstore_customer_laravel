@extends('layouts.app')

@section('title', 'Về BookZone')

@section('content')
    <div class="container p-4 pt-0 mt-4">
        <div class="hero-section">
            <div class="container">
                <h1 class="hero-title">Câu Chuyện Về BookZone</h1>
                <p class="lead">Khai Nguồn Hứng Sáng Tạo</p>
                <a href="{{ route('customer.products.index') }}" class="btn btn-primary rounded-4 px-3 py-2 fw-bold fs-6 mt-2">Khám Phá Sản Phẩm</a>
            </div>
        </div>

        <div class="mt-4 text-center w-75 mx-auto">
            <p>
                Chào mừng đến với BookZone, nơi mỗi sản phẩm không chỉ là một công cụ mà còn là nguồn cảm hứng cho sự sáng tạo và học hỏi.
                Chúng tôi mang đến những sản phẩm văn phòng phẩm chất lượng, đa dạng và thân thiện với môi trường, phục vụ cho mọi nhu cầu học tập,
                công việc và đam mê nghệ thuật.
            </p>
        </div>

        <section class="my-4">
            <h2 class="mb-4">Hành Trình Của Chúng Tôi</h2>
            <div class="timeline-container">
                <div class="timeline-item">
                    <div class="timeline-icon-wrapper"><i class="fa-solid fa-store"></i></div>
                    <div class="timeline-content"><p class="timeline-title">Thành lập cửa hàng</p><p class="mb-0"><strong>2015</strong> - Cửa hàng nhỏ đầu tiên ra đời từ niềm đam mê về giấy và bút.</p></div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon-wrapper"><i class="fa-solid fa-map-pin"></i></div>
                    <div class="timeline-content"><p class="timeline-title">Mở chi nhánh thứ hai</p><p class="mb-0"><strong>2018</strong> - Mở rộng quy mô, giới thiệu thêm nhiều dòng sản phẩm sáng tạo.</p></div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon-wrapper"><i class="fa-solid fa-globe"></i></div>
                    <div class="timeline-content"><p class="timeline-title">Ra mắt website bán hàng</p><p class="mb-0"><strong>2020</strong> - Đưa BookZone lên không gian số phục vụ khách hàng toàn quốc.</p></div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon-wrapper"><i class="fa-solid fa-paint-brush"></i></div>
                    <div class="timeline-content"><p class="timeline-title">Sự kiện cộng đồng</p><p class="mb-0"><strong>2022</strong> - Tổ chức workshop sáng tạo, kết nối cộng đồng yêu văn phòng phẩm.</p></div>
                </div>
            </div>
        </section>

        <section class="my-5">
            <h2 class="mb-4">Giá Trị Cốt Lõi</h2>
            <div class="row">
                <div class="col-md-4"><div class="card value-card shadow-sm"><div class="value-icon"><i class="bi bi-patch-check-fill text-primary"></i></div><h3 class="value-title">Chất Lượng</h3><p>Sản phẩm được lựa chọn kỹ lưỡng từ nhà cung cấp uy tín trong và ngoài nước.</p></div></div>
                <div class="col-md-4"><div class="card value-card shadow-sm"><div class="value-icon"><i class="bi bi-lightbulb-fill text-primary"></i></div><h3 class="value-title">Sáng Tạo</h3><p>Luôn cập nhật các sản phẩm độc đáo, khơi nguồn cảm hứng trong công việc và học tập.</p></div></div>
                <div class="col-md-4"><div class="card value-card shadow-sm"><div class="value-icon"><i class="bi bi-people-fill text-primary"></i></div><h3 class="value-title">Tận Tâm</h3><p>Khách hàng là trọng tâm, đội ngũ BookZone luôn sẵn sàng hỗ trợ nhanh chóng.</p></div></div>
            </div>
        </section>

        <section class="my-5 text-center">
            <p class="lead mb-3">Sẵn sàng để sáng tạo cùng chúng tôi?</p>
            <p class="mb-4">Khám phá bộ sưu tập sản phẩm đa dạng và tìm kiếm nguồn cảm hứng mới ngay hôm nay.</p>
            <a href="{{ route('customer.products.index') }}" class="btn btn-primary rounded-4 px-3 py-2 fw-bold fs-6">Xem tất cả sản phẩm</a>
        </div>
    </div>

    <style>
        .hero-section {
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("{{ asset('assets/images/about_background.png') }}") center/cover no-repeat;
            color: white;
            padding: 140px 0;
            text-align: center;
            border-radius: 20px;
            min-height: 430px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
        }
        .hero-title { font-size: 2.5rem; font-weight: 700; }
        .timeline-item { display: flex; align-items: flex-start; padding-bottom: 20px; position: relative; }
        .timeline-icon-wrapper { width: 40px; height: 40px; min-width: 40px; background-color: #0d6efd; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; margin-right: 15px; position: relative; z-index: 10; }
        .timeline-content { padding-top: 5px; }
        .timeline-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 5px; }
        .timeline-container { padding-left: 20px; margin-left: 20px; }
        .timeline-item:before { content: ''; position: absolute; left: 19px; top: 0; bottom: 0; width: 2px; background-color: #ccc; z-index: 5; }
        .timeline-item:first-child:before { top: 20px; }
        .timeline-item:last-child:before { bottom: calc(100% - 20px); }
        .value-card { text-align: center; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; margin-bottom: 20px; }
        .value-icon { width: 70px; height: 70px; margin: 0 auto 15px; background-color: #e5edf9; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 1.5rem; }
        .value-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
    </style>
@endsection
