<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class CustomerAccountController extends Controller
{
    public function account(Request $request)
    {
        $customerId = session('customer_id');
        $customer = KhachHang::find($customerId);
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        return response()->json($customer);
    }

    public function updateProfile(Request $request)
    {
        $customerId = session('customer_id');
        $customer = KhachHang::find($customerId);
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        $validated = $request->validate([
            'ten' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email'],
        ]);
        $customer->update($validated);
        return response()->json(['message' => 'Cập nhật thành công', 'customer' => $customer]);
    }

    public function changePassword(Request $request)
    {
        $customerId = session('customer_id');
        $customer = KhachHang::find($customerId);
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        $request->validate([
            'old_password' => ['required'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
        if (!Hash::check($request->old_password, $customer->password)) {
            return response()->json(['message' => 'Mật khẩu cũ không đúng'], 400);
        }
        $customer->password = Hash::make($request->password);
        $customer->save();
        return response()->json(['message' => 'Đổi mật khẩu thành công']);
    }

    public function addresses(Request $request)
    {
        // TODO: Trả về danh sách địa chỉ giao hàng của khách hàng
        return response()->json([]);
    }

    public function addAddress(Request $request)
    {
        // TODO: Thêm địa chỉ giao hàng mới
        return response()->json(['message' => 'Chưa triển khai']);
    }

    public function updateAddress(Request $request, $id)
    {
        // TODO: Cập nhật địa chỉ giao hàng
        return response()->json(['message' => 'Chưa triển khai']);
    }

    public function deleteAddress(Request $request, $id)
    {
        // TODO: Xóa địa chỉ giao hàng
        return response()->json(['message' => 'Chưa triển khai']);
    }

    public function me(Request $request)
    {
        $customerId = session('customer_id');
        $customer = KhachHang::find($customerId);
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        return response()->json($customer);
    }

    public function logout(Request $request)
    {
        $request->session()->forget('customer_id');
        return response()->json(['message' => 'Đăng xuất thành công']);
    }
}
