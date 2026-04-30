<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NhanVienResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->nhanvien_id,
            'ho' => $this->ho,
            'tendem' => $this->tendem,
            'ten' => $this->ten,
            'full_name' => trim("{$this->ho} {$this->tendem} {$this->ten}"),
            'email' => $this->email,
            'role' => $this->vaitro,
            'role_label' => employee_role_label($this->vaitro),
            'status' => $this->trangthai,
            'status_label' => employee_status_label($this->trangthai),
            'joined_at' => $this->ngayvaolam,
        ];
    }
}
