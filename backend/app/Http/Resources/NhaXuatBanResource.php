<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NhaXuatBanResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'nhaxuatban_id' => $this->nhaxuatban_id,
            'id' => $this->nhaxuatban_id,
            'ten' => $this->ten,
            'name' => $this->ten,
            'diachi' => $this->diachi,
            'address' => $this->diachi,
            'sdt' => $this->sdt,
            'phone' => $this->sdt,
            'email' => $this->email,
        ];
    }
}
