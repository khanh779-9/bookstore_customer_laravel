@extends('layouts.employee')
@section('title', 'Danh mục')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Danh mục sản phẩm</h1>
<table class="table table-striped table-sm"><thead><tr><th>ID</th><th>Tên danh mục</th><th>Mô tả</th></tr></thead><tbody>@foreach($categories as $i)<tr><td>{{ $i->danhmucSP_id }}</td><td>{{ $i->tenDanhMuc }}</td><td>{{ $i->mo_ta }}</td></tr>@endforeach</tbody></table>
{{ $categories->links() }}</div></div>
@endsection
