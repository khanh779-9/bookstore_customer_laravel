<?php

namespace App\Services;

use App\Models\KhachHang;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class AuthService
{
    /**
     * Handle customer login.
     */
    public function login(array $credentials, string $userAgent): array
    {
        $email = strtolower(trim($credentials['email']));
        $customer = KhachHang::where('email', $email)->first();
        
        if (!$customer || !Hash::check($credentials['password'], $customer->password)) {
            throw new \Exception('Email hoặc mật khẩu không đúng.', 401);
        }

        $token = $customer->createToken($userAgent ?: 'web')->plainTextToken;
        
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
            'email' => strtolower(trim($data['email'])),
            'password' => Hash::make($data['password']),
            'sdt' => $data['sdt'] ?? null,
            'diachi' => $data['diachi'] ?? null,
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
