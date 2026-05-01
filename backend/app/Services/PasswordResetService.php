<?php

namespace App\Services;

use App\Models\KhachHang;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class PasswordResetService
{
    private const CACHE_PREFIX = 'pwd_reset:';
    private const EXPIRE_MINUTES = 10;

    public function sendCode(string $email): array
    {
        $normalizedEmail = strtolower(trim($email));
        $customer = KhachHang::where('email', $normalizedEmail)->first();

        if (!$customer) {
            return ['sent' => false, 'code' => null];
        }

        $code = (string) random_int(100000, 999999);
        $payload = ['code_hash' => Hash::make($code)];

        Cache::put($this->cacheKey($normalizedEmail), $payload, now()->addMinutes(self::EXPIRE_MINUTES));

        Mail::raw(
            "Ma xac minh dat lai mat khau cua ban la: {$code}. Ma co hieu luc trong " . self::EXPIRE_MINUTES . " phut.",
            function ($message) use ($normalizedEmail): void {
                $message->to($normalizedEmail)
                    ->subject('Bookstore - Ma xac minh dat lai mat khau');
            }
        );

        return [
            'sent' => true,
            'code' => app()->environment('local', 'testing') ? $code : null,
        ];
    }

    public function verifyCode(string $email, string $code): bool
    {
        $normalizedEmail = strtolower(trim($email));
        $payload = Cache::get($this->cacheKey($normalizedEmail));

        if (!$payload || !isset($payload['code_hash'])) {
            return false;
        }

        return Hash::check((string) $code, (string) $payload['code_hash']);
    }

    public function resetPassword(string $email, string $code, string $newPassword): bool
    {
        $normalizedEmail = strtolower(trim($email));
        if (!$this->verifyCode($normalizedEmail, $code)) {
            return false;
        }

        $customer = KhachHang::where('email', $normalizedEmail)->first();
        if (!$customer) {
            return false;
        }

        $customer->password = Hash::make($newPassword);
        $customer->save();
        $customer->tokens()->delete();

        Cache::forget($this->cacheKey($normalizedEmail));

        return true;
    }

    private function cacheKey(string $email): string
    {
        return self::CACHE_PREFIX . $email;
    }
}
