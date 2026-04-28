<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KhuyenMai extends Model
{
    use HasFactory;

    protected $table = 'khuyenmai';
    protected $primaryKey = 'khuyenmai_id';
    protected $fillable = [
        'ten', 'ngaybatdau', 'ngayketthuc',
    ];

    public function chiTiet()
    {
        return $this->hasMany(ChiTietKhuyenMai::class, 'khuyenmai_id', 'khuyenmai_id');
    }

    public function scopeActive($query)
    {
        return $query->whereDate('ngaybatdau', '<=', now())
            ->whereDate('ngayketthuc', '>=', now());
    }
}
