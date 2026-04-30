<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChiTietHoaDonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->cthd_id,
            'product_id' => $this->sanpham_id,
            'product_name' => $this->sanPham->ten_hien_thi ?? null,
            'quantity' => $this->soluong,
            'unit_price' => (float) $this->dongia,
            'subtotal' => (float) $this->thanhtien,
        ];
    }
}
