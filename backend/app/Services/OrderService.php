<?php

namespace App\Services;

use App\Models\HoaDon;
use App\Models\SanPham;
use App\Models\GioHang;
use App\Models\ThongBao;
use Illuminate\Support\Facades\DB;

class OrderService
{
    /**
     * Create a new order from items.
     */
    public function createOrder(int $customerId, array $items, array $data): HoaDon
    {
        return DB::transaction(function () use ($customerId, $items, $data) {
            $total = collect($items)->sum(fn($item) => $item['soluong'] * $item['price']);

            $order = HoaDon::create([
                'khachhang_id' => $customerId,
                'ngaytao' => now(),
                'tongtien' => $total,
                'phuongthuc_thanhtoan' => $data['phuongthuc_thanhtoan'],
                'trangthai' => HoaDon::STATUS_PENDING_CONFIRMATION,
                'dcgh_id' => $data['dcgh_id'] ?? null,
                'ghichu' => $data['ghichu'] ?? null,
            ]);

            foreach ($items as $item) {
                $order->chiTiet()->create([
                    'sanpham_id' => $item['sanpham_id'],
                    'soluong' => $item['soluong'],
                    'dongia' => $item['price'],
                    'thanhtien' => $item['soluong'] * $item['price'],
                ]);

                // Update stock
                $product = SanPham::lockForUpdate()->find($item['sanpham_id']);
                if ($product) {
                    $product->decrement('soluongton', $item['soluong']);
                }
            }

            // Clear database cart
            if ($customerId > 0) {
                GioHang::where('khachhang_id', $customerId)->delete();
            }

            // Send notification
            ThongBao::send($customerId, 'Đặt hàng thành công', "Đơn hàng #{$order->hoadon_id} của bạn đã được tiếp nhận.", 'don_hang');

            return $order;
        });
    }

    /**
     * Update order status and handle side effects.
     */
    public function updateStatus(int $orderId, string $status, ?int $employeeId = null): HoaDon
    {
        return DB::transaction(function () use ($orderId, $status, $employeeId) {
            $order = HoaDon::findOrFail($orderId);
            $oldStatus = $order->trangthai;
            
            $order->trangthai = $status;
            if ($employeeId) {
                $order->nhanvien_id = $employeeId;
            }
            $order->save();

            // Handle side effects
            if ($status === HoaDon::STATUS_DELIVERED && $oldStatus !== HoaDon::STATUS_DELIVERED) {
                foreach ($order->chiTiet as $item) {
                    $item->sanPham()->increment('soluongban', $item->soluong);
                }
            }

            // Notify customer
            $statusMap = [
                'da_xac_nhan' => 'đã được xác nhận',
                'dang_giao_hang' => 'đang được giao',
                'da_giao_hang' => 'đã giao thành công',
                'da_huy' => 'đã bị hủy',
            ];

            if (isset($statusMap[$status])) {
                ThongBao::send($order->khachhang_id, 'Cập nhật đơn hàng', "Đơn hàng #{$order->hoadon_id} {$statusMap[$status]}.", 'don_hang');
            }

            return $order;
        });
    }
}
