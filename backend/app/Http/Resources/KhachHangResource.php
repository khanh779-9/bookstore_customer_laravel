<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KhachHangResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->khachhang_id,
            'ho' => $this->ho,
            'tendem' => $this->tendem,
            'ten' => $this->ten,
            'full_name' => $this->ho_ten,
            'display_name' => $this->ten_hien_thi,
            'email' => $this->email,
            'phone' => $this->sdt,
            'address' => $this->diachi,
            'birthday' => $this->ngaysinh,
            'gender' => $this->gioitinh,
            'joined_at' => $this->ngaythamgia,
            'type' => 'customer',
        ];
    }
}
