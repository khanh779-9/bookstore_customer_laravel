@extends('layouts.employee')
@section('title', 'Quản lý nhân viên')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Nhân viên (Admin)</h1>
<div class="table-responsive"><table class="table table-striped table-sm"><thead><tr><th>ID</th><th>Họ tên</th><th>Email</th><th>Vai trò</th><th>Trạng thái</th></tr></thead><tbody>
@foreach($employees as $e)
<tr><td>{{ $e->nhanvien_id }}</td><td>{{ trim(($e->ho ?? '').' '.($e->tendem ?? '').' '.($e->ten ?? '')) }}</td><td>{{ $e->email }}</td><td>{{ employee_role_label($e->role) }}</td><td>{{ employee_status_label($e->trangthai) }}</td></tr>
@endforeach
</tbody></table></div>{{ $employees->links() }}</div></div>
@endsection
