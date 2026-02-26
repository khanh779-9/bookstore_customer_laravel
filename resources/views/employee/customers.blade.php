@extends('layouts.employee')
@section('title', 'Quản lý khách hàng')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Khách hàng</h1>
<div class="table-responsive"><table class="table table-striped table-sm"><thead><tr><th>ID</th><th>Họ tên</th><th>Email</th><th>SĐT</th></tr></thead><tbody>
@foreach($customers as $c)
<tr><td>{{ $c->khachhang_id }}</td><td>{{ trim(($c->ho ?? '').' '.($c->tendem ?? '').' '.($c->ten ?? '')) }}</td><td>{{ $c->email }}</td><td>{{ $c->sdt }}</td></tr>
@endforeach
</tbody></table></div>{{ $customers->links() }}</div></div>
@endsection
