<?php

namespace App\Http\Controllers;

use App\Models\ChiTietHoaDon;
use App\Models\DiaChiGiaoHang;
use App\Models\HoaDon;
use App\Models\KhachHang;
use App\Models\SanPham;
use App\Models\ThongBao;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerPortalController extends Controller
{
    public function account()
    {
        $customerId = (int) (session('customer.id') ?? 0);
        $customerRecord = KhachHang::where('khachhang_id', $customerId)->first();
        $addresses = DiaChiGiaoHang::where('khachhang_id', $customerId)->orderByDesc('dcgh_id')->get();

        return view('customer.account', [
            'customer' => session('customer'),
            'customerRecord' => $customerRecord,
            'addresses' => $addresses,
        ]);
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);
        $customer = KhachHang::where('khachhang_id', $customerId)->firstOrFail();

        $validated = $request->validate([
            'ho' => ['required', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten' => ['required', 'string', 'max:50'],
            'sdt' => ['nullable', 'string', 'max:15'],
            'ngaysinh' => ['nullable', 'date'],
        ]);

        $customer->ho = $validated['ho'];
        $customer->tendem = $validated['tendem'] ?? null;
        $customer->ten = $validated['ten'];
        $customer->sdt = $validated['sdt'] ?? null;
        $customer->ngaysinh = $validated['ngaysinh'] ?? null;
        $customer->save();

        session()->put('customer', [
            'id' => (int) $customer->khachhang_id,
            'name' => trim(($customer->ho ?? '') . ' ' . ($customer->tendem ?? '') . ' ' . ($customer->ten ?? '')),
            'email' => (string) $customer->email,
        ]);

        return redirect()->route('customer.account')->with('success', 'Cập nhật thông tin cá nhân thành công.');
    }

    public function changePassword(Request $request): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);
        $customer = KhachHang::where('khachhang_id', $customerId)->firstOrFail();

        $validated = $request->validate([
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $stored = (string) ($customer->password ?? '');
        $isCurrentValid = false;

        if ($stored !== '') {
            $isCurrentValid = Hash::check($validated['current_password'], $stored)
                || hash_equals($stored, $validated['current_password']);
        }

        if (! $isCurrentValid) {
            return back()->with('error', 'Mật khẩu hiện tại không đúng.');
        }

        $customer->password = Hash::make($validated['new_password']);
        $customer->save();

        return redirect()->route('customer.account')->with('success', 'Đổi mật khẩu thành công.');
    }

    public function addAddress(Request $request): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);

        $validated = $request->validate([
            'diachi' => ['required', 'string', 'max:500'],
        ]);

        $address = new DiaChiGiaoHang();
        $address->khachhang_id = $customerId;
        $address->diachi = $validated['diachi'];
        $address->save();

        return redirect()->route('customer.account')->with('success', 'Đã thêm địa chỉ giao hàng.');
    }

    public function updateAddress(Request $request, int $id): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);

        $validated = $request->validate([
            'diachi' => ['required', 'string', 'max:500'],
        ]);

        $address = DiaChiGiaoHang::where('dcgh_id', $id)
            ->where('khachhang_id', $customerId)
            ->firstOrFail();

        $address->diachi = $validated['diachi'];
        $address->save();

        return redirect()->route('customer.account')->with('success', 'Đã cập nhật địa chỉ giao hàng.');
    }

    public function deleteAddress(int $id): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);

        DiaChiGiaoHang::where('dcgh_id', $id)
            ->where('khachhang_id', $customerId)
            ->delete();

        return redirect()->route('customer.account')->with('success', 'Đã xóa địa chỉ giao hàng.');
    }

    public function orders()
    {
        $customerId = (int) (session('customer.id') ?? 0);

        $orders = HoaDon::where('khachhang_id', $customerId)
            ->orderByDesc('hoadon_id')
            ->paginate(10);

        return view('customer.orders', [
            'orders' => $orders,
        ]);
    }

    public function orderDetail(int $id)
    {
        $customerId = (int) (session('customer.id') ?? 0);

        $order = HoaDon::where('hoadon_id', $id)
            ->where('khachhang_id', $customerId)
            ->firstOrFail();

        $items = ChiTietHoaDon::query()
            ->where('hoadon_id', $order->hoadon_id)
            ->get();

        $deliveryAddress = null;
        if (! empty($order->dcgh_id)) {
            $deliveryAddress = DiaChiGiaoHang::where('dcgh_id', (int) $order->dcgh_id)
                ->where('khachhang_id', $customerId)
                ->first();
        }

        $productIds = $items->pluck('sanpham_id')->all();
        $products = SanPham::with(['sach', 'vanPhongPham'])
            ->whereIn('sanpham_id', $productIds)
            ->get()
            ->keyBy('sanpham_id');

        return view('customer.order-detail', [
            'order' => $order,
            'items' => $items,
            'products' => $products,
            'deliveryAddress' => $deliveryAddress,
        ]);
    }

    public function notifications(Request $request)
    {
        $customerId = (int) (session('customer.id') ?? 0);
        $type = (string) $request->query('loai', '');
        $status = (string) $request->query('trang_thai', '');

        $validTypes = notification_type_codes();
        $validStatuses = array_values(notification_status_codes());

        $notifications = ThongBao::query()
            ->where('khachhang_id', $customerId)
            ->when($type !== '' && in_array($type, $validTypes, true), function (Builder $query) use ($type) {
                $query->where('loai', $type);
            })
            ->when($status !== '' && in_array($status, $validStatuses, true), function (Builder $query) use ($status) {
                $query->where('trang_thai', $status);
            })
            ->orderByDesc('thongbao_id')
            ->paginate(12);

        return view('customer.notifications', [
            'notifications' => $notifications,
            'selectedType' => $type,
            'selectedStatus' => $status,
        ]);
    }

    public function markAllNotificationsRead(): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);

        ThongBao::where('khachhang_id', $customerId)
            ->where('trang_thai', notification_unread_code())
            ->update(['trang_thai' => notification_read_code()]);

        return back()->with('success', 'Đã đánh dấu tất cả thông báo là đã đọc.');
    }

    public function toggleNotificationRead(int $id): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);

        $notification = ThongBao::where('thongbao_id', $id)
            ->where('khachhang_id', $customerId)
            ->firstOrFail();

        $notification->trang_thai = $notification->trang_thai === notification_unread_code()
            ? notification_read_code()
            : notification_unread_code();
        $notification->save();

        return back()->with('success', 'Đã cập nhật trạng thái thông báo.');
    }

    public function archiveNotification(int $id): RedirectResponse
    {
        $customerId = (int) (session('customer.id') ?? 0);

        $notification = ThongBao::where('thongbao_id', $id)
            ->where('khachhang_id', $customerId)
            ->firstOrFail();

        $notification->trang_thai = notification_archived_code();
        $notification->save();

        return back()->with('success', 'Đã lưu trữ thông báo.');
    }
}
