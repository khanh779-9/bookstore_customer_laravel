@extends('layouts.employee')
@section('title', 'Quản lý sản phẩm')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Sản phẩm</h1>
<div class="table-responsive"><table class="table table-striped table-sm"><thead><tr><th>Mã</th><th>Tên</th><th>Tồn</th><th>Đã bán</th><th>Giá</th></tr></thead><tbody>
@foreach($products as $p)
<tr><td>{{ $p->sanpham_id }}</td><td>{{ $p->ten_hien_thi }}</td><td>{{ $p->soluongton }}</td><td>{{ $p->soluongban }}</td><td>{{ number_format((float)$p->gia,0,',','.') }} đ</td></tr>
@endforeach
</tbody></table></div>{{ $products->links() }}</div></div>
@endsection
