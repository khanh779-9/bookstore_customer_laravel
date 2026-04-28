<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NhaXuatBan extends Model
{
    use HasFactory;

    protected $table = 'nhaxuatban';
    protected $primaryKey = 'nhaxuatban_id';
    public $timestamps = false;
    protected $fillable = ['ten', 'diachi', 'sdt', 'email'];
}
