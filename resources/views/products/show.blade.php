@extends('layouts.app')

@section('title', 'BookStore - Chi tiết sản phẩm')

@section('content')
    @php
        $starsCount = [5 => 0, 4 => 0, 3 => 0, 2 => 0, 1 => 0];
        foreach ($reviews as $reviewItem) {
            $value = (int) ($reviewItem->rating ?? 0);
            if (isset($starsCount[$value])) {
                $starsCount[$value]++;
            }
        }
    @endphp

    <div class="container mt-4 pb-4 px-0">
        <div class="row g-4 justify-content-center">
            <div class="col-lg-6">
                <div class="p-4 pb-3 bg-white border shadow-sm rounded-2 text-center">
                    <img src="{{ $product->hinhanh ? asset('assets/images/products/' . $product->hinhanh) : asset('assets/images/defaultProduct.png') }}" class="rounded-3 img-fluid" style="max-height:280px; object-fit:contain;" alt="{{ $product->ten_hien_thi }}">

                    <div class="d-flex flex-wrap gap-2 mt-4 justify-content-center">
                        <form action="{{ route('customer.cart.add') }}" method="post" class="d-flex gap-2">
                            @csrf
                            <input type="hidden" name="sanpham_id" value="{{ $product->sanpham_id }}">
                            <input type="number" name="quantity" min="1" max="{{ $product->soluongton }}" value="1" class="form-control" style="max-width:90px" required>
                            <button class="btn btn-outline-primary" type="submit"><i class="bi bi-cart-plus me-1"></i>Thêm</button>
                        </form>

                        @if(session('customer'))
                            <form action="{{ route('customer.wishlist.toggle') }}" method="post">
                                @csrf
                                <input type="hidden" name="sanpham_id" value="{{ $product->sanpham_id }}">
                                <button class="btn {{ $isWishlisted ? 'btn-danger' : 'btn-outline-danger' }}" type="submit">
                                    <i class="bi {{ $isWishlisted ? 'bi-heart-fill' : 'bi-heart' }}"></i>
                                </button>
                            </form>
                        @endif
                    </div>

                    <div class="text-start mt-4">
                        <h6 class="fw-semibold mb-3"><i class="bi bi-gift me-2"></i>Chính sách ưu đãi</h6>
                        <ul class="list-unstyled mb-0">
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i>Miễn phí giao hàng trên 300.000₫</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i>Đổi trả trong 7 ngày</li>
                            <li><i class="bi bi-check-circle-fill text-success me-2"></i>Nhiều phương thức thanh toán</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="p-4 bg-white rounded-2 shadow-sm mb-4">
                    <a href="{{ route('customer.products.index') }}" class="btn btn-sm btn-outline-secondary mb-3">&larr; Quay lại</a>
                    <h1 class="fw-bold mb-1">{{ $product->ten_hien_thi }}</h1>
                    <div class="my-3">
                        <div class="fs-2 fw-bold text-danger">{{ number_format((float) $product->gia, 0, ',', '.') }}₫</div>
                    </div>

                    <dl class="row g-2 mb-0">
                        <dt class="col-4 text-muted">Mã sản phẩm:</dt>
                        <dd class="col-8">{{ $product->sanpham_id }}</dd>
                        <dt class="col-4 text-muted">Tồn kho:</dt>
                        <dd class="col-8"><span class="badge bg-success">{{ $product->soluongton }}</span></dd>
                        <dt class="col-4 text-muted">Đã bán:</dt>
                        <dd class="col-8">{{ $product->soluongban }}</dd>
                    </dl>
                </div>
            </div>
        </div>

        <div class="p-4 bg-white rounded-2 shadow-sm mt-4">
            <h5 class="fw-semibold mb-3">Mô tả sản phẩm</h5>
            <p class="text-secondary lh-lg mb-0">{{ $product->mo_ta ?: 'Chưa có mô tả.' }}</p>
        </div>

        <div class="p-4 bg-white border rounded-2 shadow-sm mt-4">
            <h4 class="mb-3">Đánh giá sản phẩm</h4>
            <div class="d-flex align-items-center mb-4">
                <span class="fs-2 fw-bold me-3">{{ number_format($avgRating, 1) }}/5</span>
                <div>
                    <div class="text-warning">★★★★★</div>
                    <small class="text-muted">{{ $totalReviews }} đánh giá</small>
                </div>
            </div>

            @foreach($starsCount as $star => $count)
                @php
                    $percent = $totalReviews > 0 ? ($count / $totalReviews) * 100 : 0;
                    $percentClass = $percent >= 95 ? 'w-100' : ($percent >= 70 ? 'w-75' : ($percent >= 45 ? 'w-50' : ($percent >= 20 ? 'w-25' : '')));
                @endphp
                <div class="d-flex align-items-center mb-1">
                    <span class="me-2">{{ $star }} ⭐</span>
                    <div class="progress flex-grow-1">
                        <div class="progress-bar bg-warning {{ $percentClass }}"></div>
                    </div>
                    <span class="ms-2">{{ $count }} ({{ round($percent) }}%)</span>
                </div>
            @endforeach

            @if(session('customer') && $canReview)
                <div class="p-3 bg-light border rounded-2 mt-4">
                    <h6 class="mb-3">Viết đánh giá của bạn</h6>
                    <form method="post" action="{{ route('customer.products.reviews.submit', $product->sanpham_id) }}" class="row g-2">
                        @csrf
                        <div class="col-12 col-md-2">
                            <select name="rating" class="form-select" required>
                                <option value="">Sao</option>
                                @for($i=5;$i>=1;$i--)
                                    <option value="{{ $i }}">{{ $i }} ⭐</option>
                                @endfor
                            </select>
                        </div>
                        <div class="col-12 col-md-8">
                            <input class="form-control" name="binhluan" placeholder="Viết cảm nhận của bạn...">
                        </div>
                        <div class="col-12 col-md-2 d-grid">
                            <button type="submit" class="btn btn-primary">Gửi</button>
                        </div>
                    </form>
                </div>
            @elseif(session('customer') && $alreadyReviewed)
                <div class="alert alert-secondary mt-3 mb-0">Bạn đã đánh giá sản phẩm này rồi. Cảm ơn phản hồi của bạn.</div>
            @elseif(session('customer'))
                <div class="alert alert-info mt-3 mb-0">Bạn chỉ có thể đánh giá sau khi đã mua sản phẩm này.</div>
            @endif

            <div class="mt-4">
                @forelse($reviews as $review)
                    <div class="card mb-2 border-0 bg-light">
                        <div class="card-body py-2">
                            <div class="d-flex justify-content-between">
                                <strong>{{ (int)$review->rating }}/5 ⭐</strong>
                                <small class="text-secondary">{{ !empty($review->ngaytao) ? date('d/m/Y H:i', strtotime((string) $review->ngaytao)) : '' }}</small>
                            </div>
                            <div class="text-secondary">{{ $review->binhluan }}</div>
                        </div>
                    </div>
                @empty
                    <div class="text-secondary">Chưa có đánh giá nào.</div>
                @endforelse
            </div>
        </div>

        @if($relatedProducts->isNotEmpty())
            <div class="mt-5">
                <h4 class="mb-3">Sản phẩm khác bạn có thể thích</h4>
                <div class="row g-3">
                    @foreach($relatedProducts as $item)
                        <div class="col-6 col-md-3">
                            <div class="card h-100 shadow-sm border-0 product-card">
                                <div class="card-img-wrapper">
                                    <img src="{{ $item->hinhanh ? asset('assets/images/products/' . $item->hinhanh) : asset('assets/images/defaultProduct.png') }}" alt="{{ $item->ten_hien_thi }}">
                                </div>
                                <div class="card-body d-flex flex-column">
                                    <h6 class="card-title text-truncate">{{ $item->ten_hien_thi }}</h6>
                                    <div class="text-danger fw-bold mb-2">{{ number_format((float)$item->gia, 0, ',', '.') }}₫</div>
                                    <a href="{{ route('customer.products.show', $item->sanpham_id) }}" class="btn btn-sm btn-outline-secondary mt-auto">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif
    </div>
        </div>
@endsection
