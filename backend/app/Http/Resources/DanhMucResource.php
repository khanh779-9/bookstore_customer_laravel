<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DanhMucResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'danhmucSP_id' => $this->danhmucSP_id,
            'id' => $this->danhmucSP_id,
            'tenDanhMuc' => $this->tenDanhMuc,
            'name' => $this->tenDanhMuc,
            'mo_ta' => $this->mo_ta,
            'description' => $this->mo_ta,
        ];
    }
}
