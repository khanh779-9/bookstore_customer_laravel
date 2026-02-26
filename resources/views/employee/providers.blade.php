@extends('layouts.employee')
@section('title', 'Nhà cung cấp')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Nhà cung cấp</h1>
<table class="table table-striped table-sm"><thead><tr><th>ID</th><th>Tên</th><th>Email</th></tr></thead><tbody>@foreach($providers as $i)<tr><td>{{ $i->nhacungcap_id }}</td><td>{{ $i->ten }}</td><td>{{ $i->email }}</td></tr>@endforeach</tbody></table>
{{ $providers->links() }}</div></div>
@endsection
