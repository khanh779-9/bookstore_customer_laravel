@extends('layouts.employee')
@section('title', 'Hồ sơ nhân viên')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Hồ sơ nhân viên</h1>
@if($employee)
<p><strong>Mã:</strong> {{ $employee->nhanvien_id }}</p>
<p><strong>Họ tên:</strong> {{ trim(($employee->ho ?? '').' '.($employee->tendem ?? '').' '.($employee->ten ?? '')) }}</p>
<p><strong>Email:</strong> {{ $employee->email }}</p>
<p><strong>Vai trò:</strong> {{ employee_role_label($employee->role) }}</p>
<p class="mb-0"><strong>Trạng thái:</strong> {{ employee_status_label($employee->trangthai) }}</p>
@else
<p class="text-secondary mb-0">Không tìm thấy thông tin nhân viên.</p>
@endif
</div></div>
@endsection
