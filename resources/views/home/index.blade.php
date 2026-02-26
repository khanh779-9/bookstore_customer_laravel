@extends('layouts.app')

@section('title', 'BookStore - Trang chủ')

@section('content')
    <div id="heroCarousel" class="carousel slide carousel-fade hero-carousel mb-4" data-bs-ride="carousel" data-bs-interval="4000">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
        </div>
        <div class="carousel-inner rounded-3 overflow-hidden shadow-sm">
            <div class="carousel-item active">
                <img src="{{ asset('assets/banners/1600w-iUbywlem9dU.jpg') }}" alt="Banner sách">
                <div class="carousel-caption h-100 d-flex flex-column justify-content-center align-items-start hero-overlay">
                    <h2 class="fw-bold">Khuyến mãi sách học tập</h2>
                    <p>Giảm sâu cho học sinh - sinh viên.</p>
                    <a href="{{ route('customer.products.index') }}" class="btn btn-warning fw-semibold px-4">Mua ngay</a>
                </div>
            </div>
            <div class="carousel-item">
                <img src="{{ asset('assets/banners/ROHTO_Main-Banner-Web.webp') }}" alt="Banner văn phòng phẩm">
                <div class="carousel-caption h-100 d-flex flex-column justify-content-center align-items-start hero-overlay">
                    <h2 class="fw-bold">Văn phòng phẩm siêu tiết kiệm</h2>
                    <p>Mua càng nhiều, giá càng tốt.</p>
                    <a href="{{ route('customer.products.index', ['danhmucSP_id' => 2]) }}" class="btn btn-warning fw-semibold px-4">Khám phá</a>
                </div>
            </div>
            <div class="carousel-item">
                <img src="{{ asset('assets/banners/VPBANK-T10-Web1920x450.webp') }}" alt="Banner sale">
                <div class="carousel-caption h-100 d-flex flex-column justify-content-center align-items-start hero-overlay">
                    <h2 class="fw-bold">Flash Sale cuối tuần</h2>
                    <p>Ưu đãi sách nổi bật và quà tặng.</p>
                    <a href="#promotions" class="btn btn-warning fw-semibold px-4">Xem ngay</a>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>

    <div class="quick-links text-center my-4">
        <div class="btn-group flex-wrap gap-2">
            <a href="{{ route('customer.products.index', ['danhmucSP_id' => 1]) }}" class="btn btn-outline-primary">Sách</a>
            <a href="#promotions" class="btn btn-outline-primary">Khuyến mãi</a>
            <a href="{{ route('customer.products.index', ['danhmucSP_id' => 2]) }}" class="btn btn-outline-primary">Văn phòng phẩm</a>
            <a href="#best-sellers" class="btn btn-outline-primary">Bán chạy</a>
        </div>
    </div>

    @if($categories->isNotEmpty())
        <div class="mb-4 d-flex flex-wrap gap-2">
            @foreach($categories as $category)
                <a href="{{ route('customer.products.index', ['danhmucSP_id' => $category->danhmucSP_id]) }}" class="btn btn-sm btn-light border">{{ $category->tenDanhMuc }}</a>
            @endforeach
        </div>
    @endif

    <section id="promotions" class="mb-5">
        <h4 class="mb-3 fw-bold text-dark">Sản phẩm khuyến mãi</h4>
        <div class="row g-4">
            @forelse($promotedProducts as $product)
                <div class="col-md-3">
                    <div class="card h-100 product-card border-0">
                        <div class="card-img-wrapper position-relative">
                            <img src="{{ $product->hinhanh ? asset('assets/images/products/' . $product->hinhanh) : 'https://via.placeholder.com/320x220?text=BookStore' }}" alt="{{ $product->ten_hien_thi }}">
                            <span class="badge bg-danger position-absolute top-0 end-0 m-2">-{{ (int) ($product->max_discount ?? 0) }}%</span>
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title mb-1">{{ $product->ten_hien_thi }}</h6>
                            <div class="mb-2 text-danger fw-bold">{{ number_format((float) $product->gia, 0, ',', '.') }} đ</div>
                            <div class="small text-muted mb-2">Đã bán: {{ $product->soluongban }}</div>
                            <a href="{{ route('customer.products.show', $product->sanpham_id) }}" class="btn btn-sm btn-outline-secondary mt-auto">Xem chi tiết</a>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-12"><div class="alert alert-warning mb-0">Hiện chưa có chương trình khuyến mãi đang hoạt động.</div></div>
            @endforelse
        </div>
    </section>

    <section id="best-sellers" class="mb-5">
        <h4 class="mb-3 fw-bold text-dark">Bán chạy nhất</h4>
        <div class="row g-4">
            @foreach($bestSellers as $product)
                <div class="col-md-3">
                    <div class="card h-100 product-card border-0">
                        <div class="card-img-wrapper">
                            <img src="{{ $product->hinhanh ? asset('assets/images/products/' . $product->hinhanh) : 'https://via.placeholder.com/320x220?text=BookStore' }}" alt="{{ $product->ten_hien_thi }}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h6 class="card-title mb-1">{{ $product->ten_hien_thi }}</h6>
                            <div class="mb-2 text-danger fw-bold">{{ number_format((float) $product->gia, 0, ',', '.') }} đ</div>
                            <div class="small text-muted mb-2">Đã bán: {{ $product->soluongban }}</div>
                            <a href="{{ route('customer.products.show', $product->sanpham_id) }}" class="btn btn-sm btn-outline-secondary mt-auto">Xem chi tiết</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </section>

    <section class="mb-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h4 class="m-0 fw-bold text-dark">Sản phẩm mới cập nhật</h4>
            <a href="{{ route('customer.products.index') }}" class="btn btn-sm btn-primary">Xem tất cả</a>
        </div>
        <div class="row g-3">
            @foreach($newArrivals as $product)
                <div class="col-12 col-md-6 col-lg-3">
                    <div class="card h-100 product-card border-0">
                        <div class="card-body d-flex flex-column">
                            <h3 class="h6">{{ $product->ten_hien_thi }}</h3>
                            <p class="small text-secondary mb-3">Tồn kho: {{ $product->soluongton }}</p>
                            <p class="fw-bold text-primary mt-auto">{{ number_format((float) $product->gia, 0, ',', '.') }} đ</p>
                            <a href="{{ route('customer.products.show', $product->sanpham_id) }}" class="btn btn-outline-primary btn-sm">Chi tiết</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </section>
@endsection
