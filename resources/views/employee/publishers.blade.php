@extends('layouts.employee')
@section('title', 'Nhà xuất bản')
@section('content')
<div class="card"><div class="card-body">
<h1 class="h5 mb-3">Nhà xuất bản</h1>
<table class="table table-striped table-sm"><thead><tr><th>ID</th><th>Tên</th><th>Email</th></tr></thead><tbody>@foreach($publishers as $i)<tr><td>{{ $i->nhaxuatban_id }}</td><td>{{ $i->ten }}</td><td>{{ $i->email }}</td></tr>@endforeach</tbody></table>
{{ $publishers->links() }}</div></div>
@endsection
