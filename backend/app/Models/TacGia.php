<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TacGia extends Model
{
    use HasFactory;
    protected $table = 'tacgia';
    protected $primaryKey = 'tacgia_id';
    public $timestamps = false;
    protected $fillable = ['ho', 'tendem', 'ten', 'diachi', 'sdt', 'email'];

    public function sach()
    {
        return $this->hasMany(Sach::class, 'tacgia_id', 'tacgia_id');
    }
}
