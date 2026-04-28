<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DonViTinh extends Model
{
    use HasFactory;
    protected $table = 'donvitinh';
    protected $primaryKey = 'donvitinh_id';
    public $timestamps = false;
    protected $fillable = ['ten'];

    public function sanPhams()
    {
        return $this->hasMany(SanPham::class, 'donvitinh_id', 'donvitinh_id');
    }
}
