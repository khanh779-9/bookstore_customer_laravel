<?php

namespace App\Http\Controllers;

use App\Models\SanPham;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class OracleCloudController extends Controller
{
    protected string $disk = 'oci';

    /**
     * Allowed roles for each action.
     */
    private const ROLE_UPLOAD = ['admin', 'quanly', 'nhanvien'];
    private const ROLE_DELETE = ['admin', 'quanly'];
    private const ROLE_VIEW   = ['admin', 'quanly', 'nhanvien'];

    // ──────────────────────────────────────────────
    //  Upload ảnh cho sản phẩm
    // ──────────────────────────────────────────────

    /**
     * POST /v1/employee/oracle-cloud/upload
     * Body: { image: file, path?: string }
     */
    public function upload(Request $request)
    {
        $employee = $request->user();
        if (!$this->checkRole($employee, self::ROLE_UPLOAD)) {
            return $this->handleFailure($request, 'Bạn không có quyền tải ảnh lên.', 403);
        }

        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:5120'],
            'path'  => ['nullable', 'string', 'max:255'],
        ]);

        try {
            $file     = $request->file('image');
            $subPath  = $request->input('path', 'products');
            $filename = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $filePath = trim($subPath, '/') . '/' . $filename;

            $uploaded = Storage::disk($this->disk)->put($filePath, file_get_contents($file), 'public');

            if (!$uploaded) {
                return $this->handleFailure($request, 'Không thể tải ảnh lên Oracle Cloud.', 500);
            }

            $url = Storage::disk($this->disk)->url($filePath);

            return $this->handleSuccess($request, 'Tải ảnh lên Oracle Cloud thành công!', [
                'file_path' => $filePath,
                'file_name' => $filename,
                'url'       => $url,
                'disk'      => $this->disk,
            ]);
        } catch (\Exception $e) {
            return $this->handleFailure($request, 'Lỗi tải ảnh: ' . $e->getMessage(), 500);
        }
    }

    /**
     * POST /v1/employee/oracle-cloud/upload-product/{productId}
     * Upload ảnh và gắn trực tiếp vào sản phẩm.
     */
    public function uploadProductImage(Request $request, int $productId)
    {
        $employee = $request->user();
        if (!$this->checkRole($employee, self::ROLE_UPLOAD)) {
            return $this->handleFailure($request, 'Bạn không có quyền tải ảnh lên.', 403);
        }

        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,gif', 'max:5120'],
        ]);

        try {
            $product = SanPham::findOrFail($productId);

            $file     = $request->file('image');
            $filename = 'products/' . Str::random(32) . '.' . $file->getClientOriginalExtension();

            Storage::disk($this->disk)->put($filename, file_get_contents($file), 'public');
            $url = Storage::disk($this->disk)->url($filename);

            // Xoá ảnh cũ trên OCI nếu có
            if ($product->hinhanh && str_starts_with($product->hinhanh, 'products/')) {
                Storage::disk($this->disk)->delete($product->hinhanh);
            }

            $product->update(['hinhanh' => $filename]);

            return $this->handleSuccess($request, 'Cập nhật ảnh sản phẩm thành công!', [
                'file_path' => $filename,
                'image_url' => $url,
            ]);
        } catch (\Exception $e) {
            return $this->handleFailure($request, 'Lỗi: ' . $e->getMessage(), 500);
        }
    }

    // ──────────────────────────────────────────────
    //  Lấy / xem ảnh
    // ──────────────────────────────────────────────

    /**
     * GET /v1/oracle-cloud/image
     * Query: ?path=products/abc.jpg
     * Public — ai cũng có thể xem ảnh sản phẩm.
     */
    public function getImage(Request $request)
    {
        $request->validate(['path' => ['required', 'string', 'max:500']]);

        $filePath = $request->input('path');

        if (!Storage::disk($this->disk)->exists($filePath)) {
            return $this->handleFailure($request, 'Không tìm thấy ảnh.', 404);
        }

        $url = Storage::disk($this->disk)->url($filePath);

        return response()->json([
            'file_path' => $filePath,
            'url'       => $url,
        ]);
    }

    /**
     * GET /v1/oracle-cloud/image/{productId}
     * Lấy ảnh của sản phẩm theo ID.
     * Public.
     */
    public function getProductImage(Request $request, int $productId)
    {
        try {
            $product = SanPham::findOrFail($productId);

            if (!$product->hinhanh) {
                return $this->handleFailure($request, 'Sản phẩm chưa có ảnh.', 404);
            }

            // Nếu ảnh đã là URL đầy đủ thì trả về luôn
            if (filter_var($product->hinhanh, FILTER_VALIDATE_URL)) {
                return response()->json([
                    'file_path' => $product->hinhanh,
                    'url'       => $product->hinhanh,
                ]);
            }

            // Ảnh lưu trên OCI
            if (Storage::disk($this->disk)->exists($product->hinhanh)) {
                return response()->json([
                    'file_path' => $product->hinhanh,
                    'url'       => Storage::disk($this->disk)->url($product->hinhanh),
                ]);
            }

            // Fallback: ảnh local
            if (file_exists(public_path('storage/' . $product->hinhanh))) {
                return response()->json([
                    'file_path' => $product->hinhanh,
                    'url'       => asset('storage/' . $product->hinhanh),
                ]);
            }

            return $this->handleFailure($request, 'Không tìm thấy ảnh.', 404);
        } catch (\Exception $e) {
            return $this->handleFailure($request, 'Lỗi: ' . $e->getMessage(), 500);
        }
    }

    // ──────────────────────────────────────────────
    //  Xoá ảnh
    // ──────────────────────────────────────────────

    /**
     * DELETE /v1/employee/oracle-cloud/image
     * Body: { path: "products/abc.jpg" }
     */
    public function deleteImage(Request $request)
    {
        $employee = $request->user();
        if (!$this->checkRole($employee, self::ROLE_DELETE)) {
            return $this->handleFailure($request, 'Bạn không có quyền xoá ảnh.', 403);
        }

        $request->validate(['path' => ['required', 'string', 'max:500']]);

        $filePath = $request->input('path');

        if (!Storage::disk($this->disk)->exists($filePath)) {
            return $this->handleFailure($request, 'Không tìm thấy ảnh để xoá.', 404);
        }

        try {
            Storage::disk($this->disk)->delete($filePath);
            return $this->handleSuccess($request, 'Xoá ảnh thành công!');
        } catch (\Exception $e) {
            return $this->handleFailure($request, 'Lỗi xoá ảnh: ' . $e->getMessage(), 500);
        }
    }

    // ──────────────────────────────────────────────
    //  Danh sách ảnh
    // ──────────────────────────────────────────────

    /**
     * GET /v1/employee/oracle-cloud/files
     * Query: ?prefix=products&max=20
     * Liệt kê file trong bucket.
     */
    public function listFiles(Request $request)
    {
        $employee = $request->user();
        if (!$this->checkRole($employee, self::ROLE_VIEW)) {
            return $this->handleFailure($request, 'Bạn không có quyền xem danh sách file.', 403);
        }

        $prefix = $request->input('prefix', '');
        $max    = min((int) $request->input('max', 50), 200);

        try {
            $files = collect(Storage::disk($this->disk)->files($prefix))
                ->take($max)
                ->map(fn ($path) => [
                    'path' => $path,
                    'url'  => Storage::disk($this->disk)->url($path),
                ])
                ->values();

            return response()->json([
                'files'  => $files,
                'total'  => $files->count(),
                'prefix' => $prefix,
            ]);
        } catch (\Exception $e) {
            return $this->handleFailure($request, 'Lỗi: ' . $e->getMessage(), 500);
        }
    }

    // ──────────────────────────────────────────────
    //  Helper
    // ──────────────────────────────────────────────

    private function checkRole($employee, array $allowedRoles): bool
    {
        if (!$employee || !isset($employee->role)) {
            return false;
        }
        return in_array($employee->role, $allowedRoles, true);
    }
}