<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ThongBao extends Model
{
    use HasFactory;

    protected $table = 'thongbao';
    protected $primaryKey = 'thongbao_id';
    public $timestamps = false;

    protected $fillable = [
        'khachhang_id', 'nhanvien_id', 'tieu_de', 'noi_dung', 'ngay_tao', 'loai', 'trang_thai',
    ];

    public function khachHang()
    {
        return $this->belongsTo(KhachHang::class, 'khachhang_id', 'khachhang_id');
    }

    public function nhanVien()
    {
        return $this->belongsTo(NhanVien::class, 'nhanvien_id', 'nhanvien_id');
    }

    public static function send(?int $userId, string $title, string $content, string $type = 'he_thong', bool $isEmployee = false): self
    {
        return self::create([
            $isEmployee ? 'nhanvien_id' : 'khachhang_id' => $userId,
            'tieu_de' => $title,
            'noi_dung' => $content,
            'ngay_tao' => now(),
            'loai' => $type,
            'trang_thai' => notification_unread_code(),
        ]);
    }
}
