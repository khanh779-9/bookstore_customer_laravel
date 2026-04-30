<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountToken extends Model
{
    protected $table = 'accounttoken';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'user_type',
        'token',
        'device',
        'created_at',
        'expires_at',
    ];
}
