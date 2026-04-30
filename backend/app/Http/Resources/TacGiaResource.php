<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TacGiaResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->tacgia_id,
            'ho' => $this->ho,
            'tendem' => $this->tendem,
            'ten' => $this->ten,
            'full_name' => trim("{$this->ho} {$this->tendem} {$this->ten}"),
            'email' => $this->email,
            'phone' => $this->sdt,
            'address' => $this->diachi,
        ];
    }
}
