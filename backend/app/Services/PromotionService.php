<?php

namespace App\Services;

use App\Models\KhuyenMai;
use App\Models\ChiTietKhuyenMai;
use Illuminate\Support\Facades\DB;

class PromotionService
{
    /**
     * Create a new promotion with details.
     */
    public function createPromotion(array $data): KhuyenMai
    {
        return DB::transaction(function () use ($data) {
            $promotion = KhuyenMai::create([
                'ten'         => $data['ten'],
                'ngaybatdau'  => $data['ngaybatdau'],
                'ngayketthuc' => $data['ngayketthuc'],
            ]);

            if (!empty($data['details'])) {
                foreach ($data['details'] as $detail) {
                    $promotion->chiTiet()->create([
                        'sanpham_id'   => $detail['sanpham_id'],
                        'soluong'      => $detail['soluong'] ?? 0,
                        'tilegiamgia'  => $detail['tilegiamgia'],
                    ]);
                }
            }

            return $promotion->load('chiTiet.sanPham');
        });
    }

    /**
     * Add a detail to existing promotion.
     */
    public function addDetail(int $promotionId, array $data): ChiTietKhuyenMai
    {
        return ChiTietKhuyenMai::create([
            'khuyenmai_id' => $promotionId,
            'sanpham_id'   => $data['sanpham_id'],
            'soluong'      => $data['soluong'] ?? 0,
            'tilegiamgia'  => $data['tilegiamgia'],
        ]);
    }

    /**
     * Delete a promotion and its details.
     */
    public function deletePromotion(int $id): void
    {
        DB::transaction(function () use ($id) {
            $promotion = KhuyenMai::findOrFail($id);
            $promotion->chiTiet()->delete();
            $promotion->delete();
        });
    }
}
