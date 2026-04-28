<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoaiSach extends Model
{
    use HasFactory;
    protected $table = 'loaisach';
    protected $primaryKey = 'loaisach_code';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = ['loaisach_code', 'tenLoaiSach'];

    public function sach()
    {
        return $this->hasMany(Sach::class, 'loaisach_code', 'loaisach_code');
    }
}
