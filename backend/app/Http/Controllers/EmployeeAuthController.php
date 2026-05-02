<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\ThongBao;

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
           
        $agent = parse_user_agent($request->header('User-Agent'));
        $details = "Thiết bị: {$agent['device']}\n Hệ điều hành: {$agent['os']}\n Trình duyệt: {$agent['browser']}";
        $ip = $request->ip();
        if ($ip) $details .= "\n IP: {$ip}";

        ThongBao::create([
            'nhanvien_id' => $employee->nhanvien_id,
            'tieu_de' => 'Đăng nhập thành công!',
            'noi_dung' => "Bạn đã đăng nhập vào hệ thống.\n{$details}",
            'loai' => 'noi_bo',
            'ngay_tao' => now(),
            'trang_thai' => notification_unread_code(),
        ]);

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
