<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\KhachHangResource;
use App\Services\AuthService;
use App\Services\PasswordResetService;
use Illuminate\Http\Request;

class AuthController extends Controller
{   
    protected $authService;
    // protected $cartService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    /**
     * Đăng nhập khách hàng
     */
    public function login(LoginRequest $request)
    {
        try {
            $result = $this->authService->login($request->validated(), $request->header('User-Agent'), $request->ip());

            return (new KhachHangResource($result['customer']))->additional([
                'message' => 'Đăng nhập thành công!',
                'token' => $result['token']
            ]);
        } catch (\Exception $e) {
            $code = $e->getCode();
            $status = (is_int($code) && $code >= 100 && $code < 600) ? $code : 401;
            return response()->json(['message' => $e->getMessage()], $status);
        }
    }

    public function register(RegisterRequest $request)
    {
        try {
            $result = $this->authService->register($request->validated(), $request->header('User-Agent'), $request->ip());

            return (new KhachHangResource($result['customer']))->additional([
                'message' => 'Đăng ký thành công!',
                'token' => $result['token']
            ]);
        } catch (\Exception $e) {
            $code = $e->getCode();
            $status = (is_int($code) && $code >= 100 && $code < 600) ? $code : 400;
            return response()->json(['message' => $e->getMessage()], $status);
        }
    }

    public function forgot(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $result = app(PasswordResetService::class)->sendCode($validated['email']);

        return response()->json([
            'message' => 'Nếu email tồn tại, mã xác minh đã được gửi.',
            'code' => $result['code'],
        ]);
    }

    public function reset(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', 'digits:6'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $ok = app(PasswordResetService::class)->resetPassword(
            $validated['email'],
            $validated['code'],
            $validated['password']
        );

        if (!$ok) {
            return response()->json(['message' => 'Mã xác minh không hợp lệ hoặc đã hết hạn.'], 422);
        }

        return response()->json(['message' => 'Đổi mật khẩu thành công.']);
    }

    /**
     * Đăng xuất khách hàng
     */
    public function logout(Request $request)
    {
        $this->authService->logout($request->user());
        return response()->json(['message' => 'Đăng xuất thành công!']);
    }
}
