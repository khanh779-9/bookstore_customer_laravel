<?php

namespace App\Http\Controllers;

use App\Models\ChiTietKhuyenMai;
use App\Models\KhuyenMai;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PromotionController extends Controller
{
    /**
     * List all promotions.
     */
    public function index(Request $request)
    {
        $promotions = KhuyenMai::with('chiTiet.sanPham')
            ->orderByDesc('khuyenmai_id')
            ->paginate(15);

        if ($request->expectsJson()) return response()->json($promotions);
        return view('employee.promotions', compact('promotions'));
    }

    /**
     * Show a single promotion with details.
     */
    public function show(Request $request, int $id)
    {
        $promotion = KhuyenMai::with('chiTiet.sanPham')->findOrFail($id);

        if ($request->expectsJson()) return response()->json($promotion);
        return view('employee.promotions.show', compact('promotion'));
    }

    /**
     * Store a new promotion.
     * Mirrors: EmployeeActionController::handlePromotionSave()
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ten'          => ['required', 'string', 'max:255'],
            'ngaybatdau'   => ['required', 'date'],
            'ngayketthuc'  => ['required', 'date', 'after_or_equal:ngaybatdau'],
            // Optional: promotion details array
            'details'               => ['nullable', 'array'],
            'details.*.sanpham_id'  => ['required_with:details', 'integer', 'exists:sanpham,sanpham_id'],
            'details.*.soluong'     => ['nullable', 'integer', 'min:0'],
            'details.*.tilegiamgia' => ['required_with:details', 'numeric', 'min:0', 'max:100'],
        ]);

        try {
            $promotion = DB::transaction(function () use ($validated) {
                $promotion = KhuyenMai::create([
                    'ten'         => $validated['ten'],
                    'ngaybatdau'  => $validated['ngaybatdau'],
                    'ngayketthuc' => $validated['ngayketthuc'],
                ]);

                if (!empty($validated['details'])) {
                    foreach ($validated['details'] as $detail) {
                        ChiTietKhuyenMai::create([
                            'khuyenmai_id' => $promotion->khuyenmai_id,
                            'sanpham_id'   => $detail['sanpham_id'],
                            'soluong'      => $detail['soluong'] ?? 0,
                            'tilegiamgia'  => $detail['tilegiamgia'],
                        ]);
                    }
                }

                return $promotion->load('chiTiet.sanPham');
            });

            if ($request->expectsJson()) {
                return response()->json(['message' => 'Thêm khuyến mãi thành công!', 'promotion' => $promotion], 201);
            }
            return back()->with('success', 'Thêm khuyến mãi thành công!');
        } catch (\Exception $e) {
            return $this->fail($request, 'Thêm khuyến mãi thất bại: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Update an existing promotion.
     * Mirrors: EmployeeActionController::handlePromotionUpdate()
     */
    public function update(Request $request, int $id)
    {
        $promotion = KhuyenMai::findOrFail($id);

        $validated = $request->validate([
            'ten'         => ['required', 'string', 'max:255'],
            'ngaybatdau'  => ['required', 'date'],
            'ngayketthuc' => ['required', 'date', 'after_or_equal:ngaybatdau'],
        ]);

        $promotion->update($validated);

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Cập nhật khuyến mãi thành công!', 'promotion' => $promotion]);
        }
        return back()->with('success', 'Cập nhật khuyến mãi thành công!');
    }

    /**
     * Delete a promotion.
     * Mirrors: EmployeeActionController::handlePromotionDelete()
     */
    public function destroy(Request $request, int $id)
    {
        $promotion = KhuyenMai::findOrFail($id);

        DB::transaction(function () use ($promotion) {
            $promotion->chiTiet()->delete();
            $promotion->delete();
        });

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Xóa khuyến mãi thành công!']);
        }
        return back()->with('success', 'Xóa khuyến mãi thành công!');
    }

    /**
     * Add a product to a promotion.
     * Mirrors: EmployeeActionController::handlePromotionDetailAdd()
     */
    public function addDetail(Request $request, int $id)
    {
        KhuyenMai::findOrFail($id);

        $validated = $request->validate([
            'sanpham_id'  => ['required', 'integer', 'exists:sanpham,sanpham_id'],
            'soluong'     => ['nullable', 'integer', 'min:0'],
            'tilegiamgia' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        $detail = ChiTietKhuyenMai::create([
            'khuyenmai_id' => $id,
            'sanpham_id'   => $validated['sanpham_id'],
            'soluong'      => $validated['soluong'] ?? 0,
            'tilegiamgia'  => $validated['tilegiamgia'],
        ]);

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Thêm sản phẩm vào khuyến mãi thành công!', 'detail' => $detail->load('sanPham')], 201);
        }
        return back()->with('success', 'Thêm sản phẩm vào khuyến mãi thành công!');
    }

    /**
     * Remove a product from a promotion.
     * Mirrors: EmployeeActionController::handlePromotionDetailDelete()
     */
    public function removeDetail(Request $request, int $id, int $detailId)
    {
        $detail = ChiTietKhuyenMai::where('khuyenmai_id', $id)
            ->where('ctkm_id', $detailId)
            ->firstOrFail();

        $detail->delete();

        if ($request->expectsJson()) {
            return response()->json(['message' => 'Xóa sản phẩm khỏi khuyến mãi thành công!']);
        }
        return back()->with('success', 'Xóa sản phẩm khỏi khuyến mãi thành công!');
    }

    private function fail(Request $request, string $msg, int $code = 400)
    {
        if ($request->expectsJson()) return response()->json(['message' => $msg], $code);
        return back()->with('error', $msg);
    }
}
