<?php

namespace App\Http\Controllers;

use App\Http\Resources\DanhMucResource;
use App\Models\DanhMucSanPham;
use Illuminate\Http\Request;

class EmployeeCategoryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenDanhMuc' => ['required', 'string', 'max:100'],
            'mo_ta' => ['nullable', 'string', 'max:500'],
        ]);

        $category = DanhMucSanPham::create($validated);

        return (new DanhMucResource($category))->additional(['message' => 'Thêm danh mục thành công!']);
    }

    public function update(Request $request, int $id)
    {
        $category = DanhMucSanPham::findOrFail($id);
        $validated = $request->validate([
            'tenDanhMuc' => ['sometimes', 'required', 'string', 'max:100'],
            'mo_ta' => ['nullable', 'string', 'max:500'],
        ]);

        $category->update($validated);

        return (new DanhMucResource($category))->additional(['message' => 'Cập nhật danh mục thành công!']);
    }

    public function destroy(int $id)
    {
        $category = DanhMucSanPham::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Xóa danh mục thành công!']);
    }
}
