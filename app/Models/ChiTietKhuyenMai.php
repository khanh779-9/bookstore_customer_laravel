<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChiTietKhuyenMai extends Model
{
    use HasFactory;

    protected $table = 'chitietkhuyenmai';
    protected $primaryKey = 'ctkm_id';
    public $timestamps = false;
}
