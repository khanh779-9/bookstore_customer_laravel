@extends('layouts.employee')
@section('title', 'Quản lý đơn hàng')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Đơn hàng</h1>
<div class="table-responsive"><table class="table table-striped table-sm align-middle"><thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Trạng thái</th><th>Tổng tiền</th><th>Cập nhật</th></tr></thead><tbody>
@foreach($orders as $o)
<tr>
<td>#{{ $o->hoadon_id }}</td><td>{{ $o->khachhang_id }}</td><td>{{ order_status_label($o->trangthai) }}</td><td>{{ number_format((float)$o->tongtien,0,',','.') }} đ</td>
<td>
<form method="post" action="{{ route('employee.orders.status', $o->hoadon_id) }}" class="d-flex gap-2">
@csrf @method('PATCH')
<select name="trangthai" class="form-select form-select-sm">
@foreach(order_status_db_codes() as $st)
<option value="{{ $st }}" @selected($o->trangthai === $st)>{{ order_status_label($st) }}</option>
@endforeach
</select>
<button class="btn btn-sm btn-primary">Lưu</button>
</form>
</td>
</tr>
@endforeach
</tbody></table></div>{{ $orders->links() }}</div></div>
@endsection
