<?php

namespace App\Http\Controllers;

use App\Models\ThongBao;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the notifications for the current customer.
     */
    public function index(Request $request)
    {
        $customerId = $this->getCustomerId();

        $notifications = ThongBao::where('khachhang_id', $customerId)
            ->when($request->query('loai'), fn($q, $v) => $q->where('loai', $v))
            ->when($request->query('trang_thai'), fn($q, $v) => $q->where('trang_thai', $v))
            ->orderByDesc('thongbao_id')
            ->paginate(12);

        if ($request->expectsJson()) return response()->json($notifications);
        return view('customer.notifications', compact('notifications'));
    }

    /**
     * Mark all notifications as read for the current customer.
     */
    public function markAllRead(Request $request)
    {
        $customerId = $this->getCustomerId();

        ThongBao::where('khachhang_id', $customerId)
            ->where('trang_thai', notification_unread_code())
            ->update(['trang_thai' => notification_read_code()]);

        if ($request->expectsJson()) return response()->json(['message' => 'Đã đánh dấu tất cả là đã đọc.']);
        return back()->with('success', 'Đã đánh dấu tất cả là đã đọc.');
    }

    /**
     * Toggle the read status of a notification.
     */
    public function toggleRead(Request $request, int $id)
    {
        $customerId = $this->getCustomerId();
        $note = ThongBao::where('thongbao_id', $id)->where('khachhang_id', $customerId)->firstOrFail();

        $newStatus = $note->trang_thai === notification_unread_code() 
            ? notification_read_code() 
            : notification_unread_code();
            
        $note->update(['trang_thai' => $newStatus]);

        if ($request->expectsJson()) return response()->json(['message' => 'Đã cập nhật trạng thái.', 'trang_thai' => $newStatus]);
        return back()->with('success', 'Đã cập nhật trạng thái thông báo.');
    }

    /**
     * Archive a notification.
     */
    public function archive(Request $request, int $id)
    {
        $customerId = $this->getCustomerId();

        ThongBao::where('thongbao_id', $id)
            ->where('khachhang_id', $customerId)
            ->update(['trang_thai' => notification_archived_code()]);

        if ($request->expectsJson()) return response()->json(['message' => 'Đã lưu trữ thông báo.']);
        return back()->with('success', 'Đã lưu trữ thông báo.');
    }

    private function getCustomerId(): int
    {
        $user = auth()->user();
        if ($user) return (int) $user->khachhang_id;
        return (int) (session('customer.id') ?? 0);
    }
}
