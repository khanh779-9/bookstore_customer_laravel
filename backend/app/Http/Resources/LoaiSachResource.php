<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoaiSachResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'code' => $this->loaisach_code,
            'name' => $this->tenLoaiSach,
        ];
    }
}
