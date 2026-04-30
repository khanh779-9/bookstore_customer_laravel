<?php

namespace App\Http\Controllers;

use App\Http\Resources\SanPhamResource;
use App\Models\SanPham;
use Illuminate\Http\Request;

class EmployeeProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenSP' => ['required', 'string', 'max:255'],
            'danhmucSP_id' => ['required', 'integer', 'exists:danhmucsanpham,danhmucSP_id'],
            'gia' => ['required', 'numeric', 'min:0'],
            'soluongton' => ['required', 'integer', 'min:0'],
            'donvitinh_id' => ['required', 'integer', 'exists:donvitinh,donvitinh_id'],
            'nhacungcap_id' => ['nullable', 'integer', 'exists:nhacungcap,nhacungcap_id'],
            'mo_ta' => ['nullable', 'string'],
        ]);

        $product = SanPham::create($validated);

        return (new SanPhamResource($product))->additional(['message' => 'Thêm sản phẩm thành công!']);
    }

    public function update(Request $request, int $id)
    {
        $product = SanPham::findOrFail($id);
        
        $validated = $request->validate([
            'tenSP' => ['sometimes', 'required', 'string', 'max:255'],
            'danhmucSP_id' => ['sometimes', 'required', 'integer', 'exists:danhmucsanpham,danhmucSP_id'],
            'gia' => ['sometimes', 'required', 'numeric', 'min:0'],
            'soluongton' => ['sometimes', 'required', 'integer', 'min:0'],
            'donvitinh_id' => ['sometimes', 'required', 'integer', 'exists:donvitinh,donvitinh_id'],
            'nhacungcap_id' => ['nullable', 'integer', 'exists:nhacungcap,nhacungcap_id'],
            'mo_ta' => ['nullable', 'string'],
        ]);

        $product->update($validated);

        return (new SanPhamResource($product))->additional(['message' => 'Cập nhật sản phẩm thành công!']);
    }

    public function destroy(int $id)
    {
        $product = SanPham::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Xóa sản phẩm thành công!']);
    }

    public function uploadImage(Request $request, int $id)
    {
        $request->validate(['image' => ['required', 'image', 'max:2048']]);
        $product = SanPham::findOrFail($id);
        
        // Simulating image upload for now
        $path = $request->file('image')->store('products', 'public');
        $product->update(['hinhanh' => $path]);

        return response()->json(['message' => 'Tải ảnh lên thành công!', 'image_url' => asset('storage/' . $path)]);
    }
}
