@extends('layouts.employee')

@section('title', 'Dashboard nhân viên')

@section('content')
    <h1 class="h4 mb-3">Dashboard</h1>
    <div class="row g-3 mb-3">
        <div class="col-md-3"><div class="card"><div class="card-body"><div class="text-secondary">Sản phẩm</div><div class="h4">{{ $stats['products'] }}</div></div></div></div>
        <div class="col-md-3"><div class="card"><div class="card-body"><div class="text-secondary">Đơn hàng</div><div class="h4">{{ $stats['orders'] }}</div></div></div></div>
        <div class="col-md-3"><div class="card"><div class="card-body"><div class="text-secondary">Khách hàng</div><div class="h4">{{ $stats['customers'] }}</div></div></div></div>
        <div class="col-md-3"><div class="card"><div class="card-body"><div class="text-secondary">Doanh thu</div><div class="h5">{{ number_format($stats['revenue'], 0, ',', '.') }} đ</div></div></div></div>
    </div>
    <div class="card">
        <div class="card-body">
            <h2 class="h6">Đơn hàng gần đây</h2>
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead><tr><th>#</th><th>Khách hàng</th><th>Trạng thái</th><th>Tổng tiền</th></tr></thead>
                    <tbody>
                    @foreach($recentOrders as $o)
                        <tr><td>#{{ $o->hoadon_id }}</td><td>{{ $o->khachhang_id }}</td><td>{{ order_status_label($o->trangthai) }}</td><td>{{ number_format((float)$o->tongtien,0,',','.') }} đ</td></tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
