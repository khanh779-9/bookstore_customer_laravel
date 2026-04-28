<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HoaDon extends Model
{
    use HasFactory;

    protected $table = 'hoadon';

    protected $primaryKey = 'hoadon_id';

    public $timestamps = false;

    protected $fillable = [
        'khachhang_id',
        'nhanvien_id',
        'dcgh_id',
        'ngaytao',
        'tongtien',
        'trangthai',
        'phuongthuc_thanhtoan',
        'ghichu',
    ];

    protected $casts = [
        'tongtien' => 'decimal:2',
    ];

    const STATUS_PENDING_PAYMENT = 'cho_thanh_toan';
    const STATUS_PENDING_CONFIRMATION = 'cho_xac_nhan';
    const STATUS_CONFIRMED = 'da_xac_nhan';
    const STATUS_SHIPPING = 'dang_giao_hang';
    const STATUS_DELIVERED = 'da_giao_hang';
    const STATUS_CANCELLED = 'da_huy';

    public function chiTiet(): HasMany
    {
        return $this->hasMany(ChiTietHoaDon::class, 'hoadon_id', 'hoadon_id');
    }

    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'khachhang_id', 'khachhang_id');
    }

    public function diaChi()
    {
        return $this->belongsTo(DiaChiGiaoHang::class, 'dcgh_id', 'dcgh_id');
    }

    public static function createWithItems(int $customerId, array $items, string $paymentMethod = 'tien_mat', ?int $addressId = null, string $status = self::STATUS_PENDING_CONFIRMATION): ?self
    {
        return \DB::transaction(function () use ($customerId, $items, $paymentMethod, $addressId, $status) {
            $total = 0;
            foreach ($items as $item) {
                $total += $item['soluong'] * $item['dongia'];
            }

            $order = self::create([
                'khachhang_id' => $customerId,
                'ngaytao' => now(),
                'tongtien' => $total,
                'phuongthuc_thanhtoan' => $paymentMethod,
                'trangthai' => $status,
                'dcgh_id' => $addressId,
            ]);

            foreach ($items as $item) {
                $order->chiTiet()->create([
                    'sanpham_id' => $item['sanpham_id'],
                    'soluong' => $item['soluong'],
                    'dongia' => $item['dongia'],
                    'thanhtien' => $item['soluong'] * $item['dongia'],
                ]);

                // Update stock
                $product = SanPham::lockForUpdate()->find($item['sanpham_id']);
                if ($product) {
                    $product->decrement('soluongton', $item['soluong']);
                    // Note: we don't increment soluongban here, 
                    // in backup it happens when status changes to 'da_giao_hang'
                }
            }

            return $order;
        });
    }

    public function updateStatus(string $newStatus, ?int $employeeId = null): bool
    {
        return \DB::transaction(function () use ($newStatus, $employeeId) {
            $oldStatus = $this->trangthai;
            
            $this->trangthai = $newStatus;
            if ($employeeId) {
                $this->nhanvien_id = $employeeId;
            }
            $this->save();

            // If changing to delivered, increment best selling count
            if ($newStatus === self::STATUS_DELIVERED && $oldStatus !== self::STATUS_DELIVERED) {
                foreach ($this->chiTiet as $item) {
                    $item->sanpham()->increment('soluongban', $item->soluong);
                }
            }

            return true;
        });
    }
}
