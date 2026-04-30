<?php

namespace App\Http\Controllers;

use App\Http\Resources\NhaXuatBanResource;
use App\Models\NhaXuatBan;
use Illuminate\Http\Request;

class EmployeePublisherController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ten' => ['required', 'string', 'max:255'],
            'diachi' => ['nullable', 'string', 'max:500'],
            'sdt' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:100'],
        ]);

        $publisher = NhaXuatBan::create($validated);

        return (new NhaXuatBanResource($publisher))->additional(['message' => 'Thêm nhà xuất bản thành công!']);
    }

    public function update(Request $request, int $id)
    {
        $publisher = NhaXuatBan::findOrFail($id);
        $validated = $request->validate([
            'ten' => ['sometimes', 'required', 'string', 'max:255'],
            'diachi' => ['nullable', 'string', 'max:500'],
            'sdt' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email', 'max:100'],
        ]);

        $publisher->update($validated);

        return (new NhaXuatBanResource($publisher))->additional(['message' => 'Cập nhật nhà xuất bản thành công!']);
    }

    public function destroy(int $id)
    {
        $publisher = NhaXuatBan::findOrFail($id);
        $publisher->delete();

        return response()->json(['message' => 'Xóa nhà xuất bản thành công!']);
    }
}
