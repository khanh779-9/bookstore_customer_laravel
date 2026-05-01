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
            'hoadon_id' => $this->hoadon_id,
            'khachhang_id' => $this->khachhang_id,
            'customer_name' => $this->khachHang->ho_ten ?? null,
            'address_id' => $this->dcgh_id,
            'address' => $this->diaChi->diachi ?? null,
            'ngaytao' => $this->ngaytao,
            'tongtien' => (float) $this->tongtien,
            'trangthai' => $this->trangthai,
            'phuongthuc_thanhtoan' => $this->phuongthuc_thanhtoan,
            'ghichu' => $this->ghichu,
            'items' => ChiTietHoaDonResource::collection($this->whenLoaded('chiTiet')),
        ];
    }
}
