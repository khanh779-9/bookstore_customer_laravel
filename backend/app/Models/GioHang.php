<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function khachHang()
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

    public function getTotalAttribute(): float
    {
        return (float) $this->chiTiet()->sum('thanhtien');
    }

    public function addItem(int $productId, int $quantity, float $price): void
    {
        $item = $this->chiTiet()->where('sanpham_id', $productId)->first();
        if ($item) {
            $newQty = $item->soluong + $quantity;
            $item->update([
                'soluong' => $newQty,
                'thanhtien' => $newQty * $item->dongia,
            ]);
        } else {
            $this->chiTiet()->create([
                'sanpham_id' => $productId,
                'soluong' => $quantity,
                'dongia' => $price,
                'thanhtien' => $quantity * $price,
            ]);
        }
        $this->refreshCount();
    }

    public function updateItem(int $productId, int $quantity): void
    {
        if ($quantity <= 0) {
            $this->chiTiet()->where('sanpham_id', $productId)->delete();
        } else {
            $item = $this->chiTiet()->where('sanpham_id', $productId)->first();
            if ($item) {
                $item->update([
                    'soluong' => $quantity,
                    'thanhtien' => $quantity * $item->dongia,
                ]);
            }
        }
        $this->refreshCount();
    }

    public function clear(): void
    {
        $this->chiTiet()->delete();
        $this->refreshCount();
    }
}
