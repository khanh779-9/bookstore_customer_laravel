<?php

namespace App\Http\Controllers;

use App\Http\Resources\NhaCungCapResource;
use App\Models\NhaCungCap;
use Illuminate\Http\Request;

class EmployeeProviderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ten' => ['required', 'string', 'max:255'],
            'diachi' => ['nullable', 'string', 'max:500'],
            'sdt' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:100'],
        ]);

        $provider = NhaCungCap::create($validated);

        return (new NhaCungCapResource($provider))->additional(['message' => 'Thêm nhà cung cấp thành công!']);
    }

    public function update(Request $request, int $id)
    {
        $provider = NhaCungCap::findOrFail($id);
        $validated = $request->validate([
            'ten' => ['sometimes', 'required', 'string', 'max:255'],
            'diachi' => ['nullable', 'string', 'max:500'],
            'sdt' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:100'],
        ]);

        $provider->update($validated);

        return (new NhaCungCapResource($provider))->additional(['message' => 'Cập nhật nhà cung cấp thành công!']);
    }

    public function destroy(int $id)
    {
        $provider = NhaCungCap::findOrFail($id);
        $provider->delete();

        return response()->json(['message' => 'Xóa nhà cung cấp thành công!']);
    }
}
