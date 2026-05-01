<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NhaCungCapResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'nhacungcap_id' => $this->nhacungcap_id,
            'id' => $this->nhacungcap_id,
            'ten' => $this->ten,
            'name' => $this->ten,
            'tenNhaCungCap' => $this->ten,
            'diachi' => $this->diachi,
            'address' => $this->diachi,
            'dia_chi' => $this->diachi,
            'sdt' => $this->sdt,
            'phone' => $this->sdt,
            'so_dien_thoai' => $this->sdt,
            'email' => $this->email,
        ];
    }
}
