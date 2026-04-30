<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HoaDonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->hoadon_id,
            'customer_id' => $this->khachhang_id,
            'customer_name' => $this->khachHang->ho_ten ?? null,
            'address_id' => $this->dcgh_id,
            'address' => $this->diaChi->diachi ?? null,
            'created_at' => $this->ngaytao,
            'total_amount' => (float) $this->tongtien,
            'status' => $this->trangthai,
            'payment_method' => $this->phuongthuc_thanhtoan,
            'note' => $this->ghichu,
            'items' => ChiTietHoaDonResource::collection($this->whenLoaded('chiTiet')),
        ];
    }
}
