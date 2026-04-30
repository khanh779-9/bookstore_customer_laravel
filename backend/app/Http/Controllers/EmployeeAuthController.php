<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeAuthController extends Controller
{
    // Đăng nhập nhân viên
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'ma_nhan_vien' => ['required', 'string'],
            'password' => ['required', 'string'],
        ]);
        $employee = NhanVien::where('nhanvien_id', $credentials['ma_nhan_vien'])->first();
        if (!$employee || !\Illuminate\Support\Facades\Hash::check($credentials['password'], $employee->password)) {
            return response()->json(['message' => 'Mã nhân viên hoặc mật khẩu không đúng.'], 401);
        }
        if ($employee->trangthai !== 'dang_lam') {
            return response()->json(['message' => 'Tài khoản của bạn không hoạt động.'], 403);
        }
        $token = $employee->createToken($request->header('User-Agent') ?: 'web')->plainTextToken;
        
        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'token' => $token,
            'data'=>[ 
                'id' => $employee->nhanvien_id,
                'ten' => $employee->ten,
                'email' => $employee->email,
                'ho_ten' => $employee->ho_ten,
                'type' => 'employee',
            ]
        ]);
    }

    // Đăng xuất nhân viên
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Đăng xuất thành công!']);
    }
}
