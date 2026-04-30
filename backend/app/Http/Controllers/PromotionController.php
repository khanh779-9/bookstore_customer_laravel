<?php

namespace App\Http\Controllers;

use App\Http\Resources\KhuyenMaiResource;
use App\Http\Resources\ChiTietKhuyenMaiResource;
use App\Models\KhuyenMai;
use App\Services\PromotionService;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    protected $promotionService;

    public function __construct(PromotionService $promotionService)
    {
        $this->promotionService = $promotionService;
    }

    /**
     * List all promotions.
     */
    public function index(Request $request)
    {
        $promotions = KhuyenMai::with('chiTiet.sanPham')
            ->orderByDesc('khuyenmai_id')
            ->paginate(15);

        if ($request->expectsJson()) return KhuyenMaiResource::collection($promotions);
        return view('employee.promotions', compact('promotions'));
    }

    /**
     * Show a single promotion with details.
     */
    public function show(Request $request, int $id)
    {
        $promotion = KhuyenMai::with('chiTiet.sanPham')->findOrFail($id);

        if ($request->expectsJson()) return new KhuyenMaiResource($promotion);
        return view('employee.promotions.show', compact('promotion'));
    }

    /**
     * Store a new promotion.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ten'          => ['required', 'string', 'max:255'],
            'ngaybatdau'   => ['required', 'date'],
            'ngayketthuc'  => ['required', 'date', 'after_or_equal:ngaybatdau'],
            'details'               => ['nullable', 'array'],
            'details.*.sanpham_id'  => ['required_with:details', 'integer', 'exists:sanpham,sanpham_id'],
            'details.*.soluong'     => ['nullable', 'integer', 'min:0'],
            'details.*.tilegiamgia' => ['required_with:details', 'numeric', 'min:0', 'max:100'],
        ]);

        try {
            $promotion = $this->promotionService->createPromotion($validated);

            if ($request->expectsJson()) {
                return (new KhuyenMaiResource($promotion))->additional(['message' => 'Thêm khuyến mãi thành công!']);
            }
            return back()->with('success', 'Thêm khuyến mãi thành công!');
        } catch (\Exception $e) {
            return $this->handleFailure($request, 'Thêm khuyến mãi thất bại: ' . $e->getMessage());
        }
    }

    /**
     * Update an existing promotion.
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
            return (new KhuyenMaiResource($promotion))->additional(['message' => 'Cập nhật khuyến mãi thành công!']);
        }
        return back()->with('success', 'Cập nhật khuyến mãi thành công!');
    }

    /**
     * Delete a promotion.
     */
    public function destroy(Request $request, int $id)
    {
        try {
            $this->promotionService->deletePromotion($id);

            if ($request->expectsJson()) return response()->json(['message' => 'Xóa khuyến mãi thành công!']);
            return back()->with('success', 'Xóa khuyến mãi thành công!');
        } catch (\Exception $e) {
            return $this->handleFailure($request, $e->getMessage());
        }
    }

    /**
     * Add a product to a promotion.
     */
    public function addDetail(Request $request, int $id)
    {
        $validated = $request->validate([
            'sanpham_id'  => ['required', 'integer', 'exists:sanpham,sanpham_id'],
            'soluong'     => ['nullable', 'integer', 'min:0'],
            'tilegiamgia' => ['required', 'numeric', 'min:0', 'max:100'],
        ]);

        $detail = $this->promotionService->addDetail($id, $validated);

        if ($request->expectsJson()) {
            return (new ChiTietKhuyenMaiResource($detail->load('sanPham')))->additional(['message' => 'Thêm sản phẩm thành công!']);
        }
        return back()->with('success', 'Thêm sản phẩm thành công!');
    }

    private function handleFailure(Request $request, string $msg, int $code = 400)
    {
        if ($request->expectsJson()) return response()->json(['message' => $msg], $code);
        return back()->with('error', $msg);
    }
}
