<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KhuyenMaiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->khuyenmai_id,
            'name' => $this->ten,
            'start_date' => $this->ngaybatdau,
            'end_date' => $this->ngayketthuc,
            'is_active' => $this->is_active ?? (now()->between($this->ngaybatdau, $this->ngayketthuc)),
            'details' => ChiTietKhuyenMaiResource::collection($this->whenLoaded('chiTiet')),
        ];
    }
}
