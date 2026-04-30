<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GioHang extends Model
{
    use HasFactory;

    protected $table = 'giohang';
    protected $primaryKey = 'giohang_id';
    public $timestamps = false;

    protected $fillable = [
        'khachhang_id',
        'ngaytao',
        'soluong',
    ];

    public function chiTiet(): HasMany
    {
        return $this->hasMany(ChiTietGioHang::class, 'giohang_id', 'giohang_id');
    }

    public function khachHang(): BelongsTo
    {
        return $this->belongsTo(KhachHang::class, 'khachhang_id', 'khachhang_id');
    }

    public static function getOrCreateForCustomer(int $customerId): self
    {
        $cart = self::where('khachhang_id', $customerId)->first();
        if (!$cart) {
            $cart = self::create([
                'khachhang_id' => $customerId,
                'ngaytao' => now(),
                'soluong' => 0,
            ]);
        }
        return $cart;
    }

    public function refreshCount(): void
    {
        $count = $this->chiTiet()->sum('soluong');
        $this->update(['soluong' => $count]);
    }
}
