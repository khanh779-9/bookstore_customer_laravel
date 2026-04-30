<?php

namespace App\Services;

use App\Models\KhachHang;
use App\Models\AccountToken;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthService
{
    /**
     * Handle customer login.
     */
    public function login(array $credentials, string $userAgent): array
    {
        $customer = KhachHang::where('email', $credentials['email'])->first();
        
        if (!$customer || !Hash::check($credentials['password'], $customer->password)) {
            throw new \Exception('Email hoặc mật khẩu không đúng.', 401);
        }

        $token = $customer->createToken($userAgent ?: 'web')->plainTextToken;
        
        AccountToken::create([
            'user_id' => $customer->khachhang_id,
            'user_type' => 'customer',
            'token' => $token,
            'device' => $userAgent ?: 'web',
            'created_at' => now(),
            'expires_at' => now()->addDays(7),
        ]);

        return [
            'customer' => $customer,
            'token' => $token
        ];
    }

    /**
     * Handle customer registration.
     */
    public function register(array $data, string $userAgent): array
    {
        $customer = KhachHang::create([
            'ho' => $data['ho'] ?? '',
            'tendem' => $data['tendem'] ?? '',
            'ten' => $data['ten'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'ngaythamgia' => now(),
        ]);

        $token = $customer->createToken($userAgent ?: 'web')->plainTextToken;

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
