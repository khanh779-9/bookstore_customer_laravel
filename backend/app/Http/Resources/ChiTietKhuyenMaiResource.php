<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChiTietKhuyenMaiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->ctkm_id,
            'promotion_id' => $this->khuyenmai_id,
            'product_id' => $this->sanpham_id,
            'product_name' => $this->sanPham->ten_hien_thi ?? null,
            'quantity_limit' => $this->soluong,
            'discount_rate' => (float) $this->tilegiamgia,
        ];
    }
}
