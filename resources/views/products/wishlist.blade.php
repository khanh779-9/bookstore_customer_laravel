@extends('layouts.app')

@section('title', 'Sản phẩm yêu thích')

@section('content')
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h4 m-0">Sản phẩm yêu thích</h1>
        <a href="{{ route('customer.products.index') }}" class="btn btn-outline-secondary btn-sm">Xem tất cả sản phẩm</a>
    </div>

    <div class="row g-3">
        @forelse($products as $product)
            <div class="col-12 col-md-6 col-lg-3">
                <div class="card h-100 product-card border-0 shadow-sm">
                    <div class="card-img-wrapper">
                        <img src="{{ $product->hinhanh ? asset('assets/images/products/' . $product->hinhanh) : asset('assets/images/defaultProduct.png') }}" alt="{{ $product->ten_hien_thi }}">
                    </div>
                    <div class="card-body d-flex flex-column">
                        <h2 class="h6">{{ $product->ten_hien_thi }}</h2>
                        <p class="small text-secondary mb-2">Mã SP: {{ $product->sanpham_id }}</p>
                        <p class="fw-bold text-primary mt-auto">{{ number_format((float) $product->gia, 0, ',', '.') }} đ</p>
                        <div class="d-flex gap-2">
                            <a href="{{ route('customer.products.show', $product->sanpham_id) }}" class="btn btn-outline-primary btn-sm flex-grow-1">Chi tiết</a>
                            <form action="{{ route('customer.wishlist.toggle') }}" method="post">
                                @csrf
                                <input type="hidden" name="sanpham_id" value="{{ $product->sanpham_id }}">
                                <button class="btn btn-outline-danger btn-sm" type="submit" title="Bỏ yêu thích"><i class="bi bi-heartbreak"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-12">
                <div class="alert alert-info mb-0">Bạn chưa có sản phẩm yêu thích nào.</div>
            </div>
        @endforelse
    </div>

    <div class="mt-3">{{ $products->links() }}</div>
@endsection
