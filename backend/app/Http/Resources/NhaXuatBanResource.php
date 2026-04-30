<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NhaXuatBanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->nhaxuatban_id,
            'name' => $this->ten,
            'address' => $this->diachi,
            'phone' => $this->sdt,
            'email' => $this->email,
        ];
    }
}
