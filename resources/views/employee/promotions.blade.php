@extends('layouts.employee')
@section('title', 'Khuyến mãi')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Khuyến mãi</h1>
<table class="table table-striped table-sm"><thead><tr><th>ID</th><th>Tên</th><th>Bắt đầu</th><th>Kết thúc</th></tr></thead><tbody>@foreach($promotions as $i)<tr><td>{{ $i->khuyenmai_id }}</td><td>{{ $i->ten }}</td><td>{{ $i->ngaybatdau }}</td><td>{{ $i->ngayketthuc }}</td></tr>@endforeach</tbody></table>
{{ $promotions->links() }}</div></div>
@endsection
