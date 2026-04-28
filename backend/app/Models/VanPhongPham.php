<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VanPhongPham extends Model
{
    use HasFactory;

    protected $table = 'vanphongpham';
    protected $primaryKey = 'vpp_id';
    public $timestamps = false;

    protected $fillable = [
        'sanpham_id',
        'tenVPP',
    ];

    public function sanpham()
    {
        return $this->belongsTo(SanPham::class, 'sanpham_id', 'sanpham_id');
    }
}
