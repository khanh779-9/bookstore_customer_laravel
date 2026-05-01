<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\KhachHangResource;
use App\Services\AuthService;
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

    /**
     * Đăng xuất khách hàng
     */
    public function logout(Request $request)
    {
        $this->authService->logout($request->user());
        return response()->json(['message' => 'Đăng xuất thành công!']);
    }
}
