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
        $employee = NhanVien::where('ma_nhan_vien', $credentials['ma_nhan_vien'])->first();
        if (!$employee || !Hash::check($credentials['password'], $employee->password)) {
            return response()->json(['message' => 'Mã nhân viên hoặc mật khẩu không đúng.'], 401);
        }
        if ($employee->trangthai !== 'dang_lam') {
            return response()->json(['message' => 'Tài khoản của bạn không hoạt động.'], 403);
        }
        session(['employee_id' => $employee->nhanvien_id]);
        return response()->json(['message' => 'Đăng nhập thành công!', 'employee' => $employee]);
    }

    // Đăng xuất nhân viên
    public function logout(Request $request)
    {
        $request->session()->forget('employee_id');
        return response()->json(['message' => 'Đăng xuất thành công!']);
    }
}
