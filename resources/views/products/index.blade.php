@extends('layouts.app')

@section('title', 'BookStore - Danh sách sản phẩm')

@section('content')
    <div class="container-fluid px-0 mt-4">
        <div class="row g-3">
            <aside class="col-md-3 d-none d-md-block">
                <div class="card p-3 shadow-sm">
                    <h5 class="mb-3">Bộ lọc</h5>
                    <form method="get" action="{{ route('customer.products.index') }}">
                        <div class="mb-3">
                            <label class="form-label">Từ khóa</label>
                            <input class="form-control" name="q" value="{{ $keyword }}" placeholder="Tên sách / văn phòng phẩm">
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Danh mục</label>
                            <select name="danhmucSP_id" class="form-select">
                                <option value="0">Tất cả</option>
                                @foreach($categories as $cat)
                                    <option value="{{ $cat->danhmucSP_id }}" @selected((int)$categoryId === (int)$cat->danhmucSP_id)>{{ $cat->tenDanhMuc }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Nhà cung cấp</label>
                            <select name="provider_id" class="form-select">
                                <option value="0">Tất cả</option>
                                @foreach($providers as $provider)
                                    <option value="{{ $provider->nhacungcap_id }}" @selected((int)$providerId === (int)$provider->nhacungcap_id)>{{ $provider->ten ?? $provider->tenNCC }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Nhà xuất bản</label>
                            <select name="publisher_id" class="form-select">
                                <option value="0">Tất cả</option>
                                @foreach($publishers as $publisher)
                                    <option value="{{ $publisher->nhaxuatban_id }}" @selected((int)$publisherId === (int)$publisher->nhaxuatban_id)>{{ $publisher->ten ?? $publisher->tenNXB }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Khoảng giá (₫)</label>
                            <div class="d-flex gap-2 align-items-center">
                                <input class="form-control" type="number" min="0" name="min" value="{{ $minPrice }}" placeholder="Từ">
                                <span>—</span>
                                <input class="form-control" type="number" min="0" name="max" value="{{ $maxPrice }}" placeholder="Đến">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">Sắp xếp theo</label>
                            <select name="sort_by" class="form-select">
                                <option value="newest" @selected($sortBy === 'newest')>Mới nhất</option>
                                <option value="price_asc" @selected($sortBy === 'price_asc')>Giá thấp → cao</option>
                                <option value="price_desc" @selected($sortBy === 'price_desc')>Giá cao → thấp</option>
                                <option value="best_selling" @selected($sortBy === 'best_selling')>Bán chạy</option>
                            </select>
                        </div>

                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="submit">Lọc</button>
                            <a class="btn btn-outline-secondary" href="{{ route('customer.products.index') }}">Xóa lọc</a>
                            @if(session('customer'))
                                <a class="btn btn-outline-primary" href="{{ route('customer.wishlist.index') }}">Sản phẩm yêu thích</a>
                            @endif
                        </div>
                    </form>
                </div>
            </aside>

            <section class="col-md-9">
                <div class="d-flex d-md-none align-items-center justify-content-between mb-3">
                    <h1 class="h5 m-0">Danh sách sản phẩm</h1>
                    <button class="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#productFilterOffcanvas">
                        <i class="bi bi-funnel-fill me-1"></i>Bộ lọc
                    </button>
                </div>

                <div class="row g-2">
                    @forelse($products as $product)
                        @php
                            $stat = $reviewStats[$product->sanpham_id] ?? null;
                            $avgRating = $stat ? round((float)($stat['avg_rating'] ?? 0), 1) : null;
                            $ratingCount = (int)($stat['total_reviews'] ?? 0);
                            $isWishlisted = in_array((int)$product->sanpham_id, array_map('intval', $wishlistedIds ?? []), true);
                        @endphp
                        <div class="col-6 col-sm-6 col-md-4 col-lg-3">
                            <div class="card h-100 shadow-sm border-0 product-card">
                                <a href="{{ route('customer.products.show', $product->sanpham_id) }}" class="text-decoration-none text-dark">
                                    <div class="card-img-wrapper">
                                        <img src="{{ $product->hinhanh ? asset('assets/images/products/' . $product->hinhanh) : asset('assets/images/defaultProduct.png') }}" alt="{{ $product->ten_hien_thi }}">
                                    </div>
                                </a>

                                <div class="card-body d-flex flex-column pt-2">
                                    <h6 class="card-title mb-1 text-truncate" title="{{ $product->ten_hien_thi }}">
                                        <a href="{{ route('customer.products.show', $product->sanpham_id) }}" class="text-dark text-decoration-none">{{ $product->ten_hien_thi }}</a>
                                    </h6>

                                    <div class="d-flex align-items-center mb-2 small" style="gap:.5rem;">
                                        @if($avgRating)
                                            <span class="text-warning">★</span>
                                            <span class="text-muted">{{ $avgRating }} ({{ $ratingCount }})</span>
                                        @else
                                            <span class="text-muted">Chưa có đánh giá</span>
                                        @endif
                                        <span class="ms-auto text-muted">Đã bán: <strong class="text-dark">{{ $product->soluongban }}</strong></span>
                                    </div>

                                    <div class="mb-2 text-danger fw-bold fs-6">{{ number_format((float)$product->gia, 0, ',', '.') }}₫</div>

                                    <div class="mt-auto d-grid gap-2">
                                        <div class="d-flex gap-1">
                                            <form action="{{ route('customer.cart.add') }}" method="post" class="flex-grow-1">
                                                @csrf
                                                <input type="hidden" name="sanpham_id" value="{{ $product->sanpham_id }}">
                                                <input type="hidden" name="quantity" value="1">
                                                <button type="submit" class="btn btn-sm btn-primary w-100"><i class="bi bi-cart-plus"></i> Thêm vào giỏ</button>
                                            </form>

                                            @if(session('customer'))
                                                <form action="{{ route('customer.wishlist.toggle') }}" method="post">
                                                    @csrf
                                                    <input type="hidden" name="sanpham_id" value="{{ $product->sanpham_id }}">
                                                    <button type="submit" class="btn btn-sm {{ $isWishlisted ? 'btn-danger' : 'btn-outline-danger' }}" title="{{ $isWishlisted ? 'Bỏ yêu thích' : 'Yêu thích' }}">
                                                        <i class="bi bi-heart{{ $isWishlisted ? '-fill' : '' }}"></i>
                                                    </button>
                                                </form>
                                            @else
                                                <a href="{{ route('customer.login') }}" class="btn btn-sm btn-outline-secondary" title="Đăng nhập để yêu thích"><i class="bi bi-heart"></i></a>
                                            @endif
                                        </div>

                                        <a href="{{ route('customer.products.show', $product->sanpham_id) }}" class="btn btn-outline-secondary btn-sm"><i class="bi bi-eye"></i> Xem chi tiết</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @empty
                        <div class="col-12"><div class="alert alert-warning mb-0">Không tìm thấy sản phẩm.</div></div>
                    @endforelse
                </div>

                <div class="mt-3">{{ $products->links() }}</div>
            </section>
        </div>

        <div class="offcanvas offcanvas-start d-md-none" tabindex="-1" id="productFilterOffcanvas" aria-labelledby="productFilterOffcanvasLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="productFilterOffcanvasLabel">Bộ lọc</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body">
                <form method="get" action="{{ route('customer.products.index') }}">
                    <div class="mb-3">
                        <label class="form-label">Từ khóa</label>
                        <input class="form-control" name="q" value="{{ $keyword }}" placeholder="Tên sản phẩm">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Danh mục</label>
                        <select name="danhmucSP_id" class="form-select">
                            <option value="0">Tất cả</option>
                            @foreach($categories as $cat)
                                <option value="{{ $cat->danhmucSP_id }}" @selected((int)$categoryId === (int)$cat->danhmucSP_id)>{{ $cat->tenDanhMuc }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Giá từ</label>
                        <input class="form-control" type="number" min="0" name="min" value="{{ $minPrice }}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Giá đến</label>
                        <input class="form-control" type="number" min="0" name="max" value="{{ $maxPrice }}">
                    </div>
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary" type="submit">Lọc</button>
                        <a class="btn btn-outline-secondary" href="{{ route('customer.products.index') }}">Xóa lọc</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection
