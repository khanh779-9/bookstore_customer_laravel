<?php

namespace App\Http\Controllers;

use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\SanPhamResource;
use App\Services\ProductService;
use Illuminate\Http\Request;

class EmployeeProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function store(StoreProductRequest $request)
    {
        try {
            $product = $this->productService->createProduct($request->validated());
            return $this->handleSuccess($request, 'Thêm sản phẩm thành công!', new SanPhamResource($product));
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }

    public function update(UpdateProductRequest $request, int $id)
    {
        try {
            $product = $this->productService->updateProduct($id, $request->validated());
            return $this->handleSuccess($request, 'Cập nhật sản phẩm thành công!', new SanPhamResource($product));
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }

    public function destroy(Request $request, int $id)
    {
        try {
            $this->productService->deleteProduct($id);
            return $this->handleSuccess($request, 'Xóa sản phẩm thành công!');
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }

    public function uploadImage(Request $request, int $id)
    {
        $request->validate(['image' => ['required', 'image', 'max:2048']]);
        
        try {
            $product = \App\Models\SanPham::findOrFail($id);
            $path = $request->file('image')->store('products', 'public');
            $product->update(['hinhanh' => $path]);

            return $this->handleSuccess($request, 'Tải ảnh lên thành công!', ['image_url' => asset('storage/' . $path)]);
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }
}
