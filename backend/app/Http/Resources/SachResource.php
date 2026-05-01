<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SachResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->sach_id,
            'title' => $this->tenSach,
            'tenSach' => $this->tenSach,
            'publish_year' => $this->namXB,
            'publisher' => $this->nhaxuatban->ten ?? null,
            'author' => $this->tacgia ? trim("{$this->tacgia->ho} {$this->tacgia->tendem} {$this->tacgia->ten}") : null,
            'author_details' => $this->whenLoaded('tacgia'),
            'book_type_code' => $this->loaisach_code,
        ];
    }
}
