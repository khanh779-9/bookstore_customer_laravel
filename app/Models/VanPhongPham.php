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
}
