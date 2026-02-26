@extends('layouts.employee')
@section('title', 'Báo cáo')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Báo cáo doanh thu theo tháng</h1>
<table class="table table-striped table-sm"><thead><tr><th>Tháng</th><th>Số đơn</th><th>Doanh thu</th></tr></thead><tbody>
@forelse($revenueByMonth as $row)
<tr><td>{{ $row->thang }}</td><td>{{ $row->sodon }}</td><td>{{ number_format((float)$row->doanhthu,0,',','.') }} đ</td></tr>
@empty
<tr><td colspan="3" class="text-center">Không có dữ liệu</td></tr>
@endforelse
</tbody></table>
</div></div>
@endsection
