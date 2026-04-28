<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    // Đăng nhập khách hàng
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $customer = KhachHang::where('email', $credentials['email'])->first();
        if (!$customer || !Hash::check($credentials['password'], $customer->password)) {
            return response()->json(['message' => 'Email hoặc mật khẩu không đúng.'], 401);
        }
        // Đăng nhập thành công, tạo session hoặc token tuỳ nhu cầu
        // Ở đây trả về thông tin cơ bản
        // Có thể dùng Laravel Sanctum/Passport nếu cần API token
        session(['customer_id' => $customer->khachhang_id]);
        return response()->json(['message' => 'Đăng nhập thành công!', 'customer' => $customer]);
    }

    // Đăng ký khách hàng
    public function register(Request $request)
    {
        $validated = $request->validate([
            'ten' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'unique:khachhang,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
        $customer = KhachHang::create([
            'ten' => $validated['ten'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);
        session(['customer_id' => $customer->khachhang_id]);
        return response()->json(['message' => 'Đăng ký thành công!', 'customer' => $customer]);
    }

    // Quên mật khẩu: gửi code xác thực qua email (giả lập)
    public function forgot(Request $request)
    {
        $request->validate(['email' => ['required', 'email']]);
        $customer = KhachHang::where('email', $request->email)->first();
        if (!$customer) {
            return response()->json(['message' => 'Email không tồn tại trong hệ thống.'], 404);
        }
        $code = str_pad((string)random_int(0, 999999), 6, '0', STR_PAD_LEFT);
        session(['password_reset' => [
            'email' => $customer->email,
            'code' => $code,
            'expires' => time() + 15 * 60,
            'sent_at' => time()
        ]]);
        // TODO: Gửi email thực tế ở đây. Hiện tại trả về code để test nhanh.
        return response()->json(['message' => 'Đã gửi mã xác thực qua email!', 'code' => $code]);
    }

    // Xác thực code quên mật khẩu
    public function verifyCode(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', 'string', 'size:6'],
        ]);
        $reset = session('password_reset');
        if (!$reset || $reset['email'] !== $request->email || $reset['code'] !== $request->code) {
            return response()->json(['message' => 'Mã xác thực không đúng!'], 400);
        }
        if ($reset['expires'] < time()) {
            return response()->json(['message' => 'Mã xác thực đã hết hạn!'], 400);
        }
        session(['password_reset_verified' => true]);
        return response()->json(['message' => 'Xác thực thành công!']);
    }

    // Đặt lại mật khẩu sau khi xác thực code
    public function reset(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
        $reset = session('password_reset');
        $verified = session('password_reset_verified', false);
        if (!$reset || !$verified || $reset['email'] !== $request->email) {
            return response()->json(['message' => 'Bạn chưa xác thực mã hoặc thông tin không hợp lệ!'], 400);
        }
        $customer = KhachHang::where('email', $request->email)->first();
        if (!$customer) {
            return response()->json(['message' => 'Email không tồn tại.'], 404);
        }
        $customer->password = Hash::make($request->password);
        $customer->save();
        session()->forget(['password_reset', 'password_reset_verified']);
        return response()->json(['message' => 'Đặt lại mật khẩu thành công!']);
    }

    // Đăng xuất khách hàng
    public function logout(Request $request)
    {
        $request->session()->forget('customer_id');
        return response()->json(['message' => 'Đăng xuất thành công!']);
    }
}
