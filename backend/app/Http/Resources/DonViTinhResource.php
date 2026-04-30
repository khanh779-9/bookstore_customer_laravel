<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DonViTinhResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->donvitinh_id,
            'name' => $this->ten,
        ];
    }
}
