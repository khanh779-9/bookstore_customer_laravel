<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ThongBaoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->thongbao_id,
            'title' => $this->tieu_de,
            'content' => $this->noi_dung,
            'created_at' => $this->ngay_tao,
            'type' => $this->loai,
            'type_label' => notification_type_label($this->loai),
            'status' => $this->trang_thai,
            'status_label' => notification_status_label($this->trang_thai),
            'is_read' => $this->trang_thai === notification_read_code(),
        ];
    }
}
