<?php

namespace App\Services;

use App\Models\KhachHang;
use App\Models\ThongBao;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthService
{
    /**
     * Handle customer login.
     */
    public function login(array $credentials, string $userAgent, ?string $ip = null): array
    {
        $email = strtolower(trim($credentials['email']));
        $customer = KhachHang::where('email', $email)->first();
        
        if (!$customer || !Hash::check($credentials['password'], $customer->password)) {
            throw new \Exception('Email hoặc mật khẩu không đúng.', 401);
        }

        $token = $customer->createToken($userAgent ?: 'web')->plainTextToken;
        
        $agent = parse_user_agent($userAgent);
        $details = "Thiết bị: {$agent['device']}\n Hệ điều hành: {$agent['os']}\n Trình duyệt: {$agent['browser']}";
        if ($ip) $details .= "\n IP: {$ip}";

        ThongBao::send(
            $customer->khachhang_id,
            'Đăng nhập thành công',
            "Chào mừng bạn quay trở lại! Bạn vừa đăng nhập vào hệ thống. \n {$details}",
            'he_thong'
        );
        
        return [
            'customer' => $customer,
            'token' => $token
        ];
    }

    /**
     * Handle customer registration.
     */
    public function register(array $data, string $userAgent, ?string $ip = null): array
    {
        $customer = KhachHang::create([
            'ho' => $data['ho'] ?? '',
            'tendem' => $data['tendem'] ?? '',
            'ten' => $data['ten'],
            'email' => strtolower(trim($data['email'])),
            'password' => Hash::make($data['password']),
            'sdt' => $data['sdt'] ?? null,
            'diachi' => $data['diachi'] ?? null,
            'ngaythamgia' => now(),
        ]);

        $token = $customer->createToken($userAgent ?: 'web')->plainTextToken;

        $agent = parse_user_agent($userAgent);
        $details = "Thiết bị: {$agent['device']}\nHệ điều hành: {$agent['os']}\nTrình duyệt: {$agent['browser']}";
        if ($ip) $details .= "\nIP: {$ip}";
        
        ThongBao::send(
            $customer->khachhang_id,
            'Đăng ký tài khoản thành công',
            "Chào mừng bạn đến với BookZone! Tài khoản của bạn đã được khởi tạo thành công. ({$details})",
            'he_thong'
        );

        return [
            'customer' => $customer,
            'token' => $token
        ];
    }

    /**
     * Handle logout.
     */
    public function logout($user): void
    {
        Session::forget(['customer_id', 'customer.id']);
        if ($user) {
            $user->currentAccessToken()->delete();
        }
    }
}
