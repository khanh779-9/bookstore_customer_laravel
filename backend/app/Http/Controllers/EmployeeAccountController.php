<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use Illuminate\Http\Request;

class EmployeeAccountController extends Controller
{
    public function dashboard(Request $request)
    {
        // TODO: Trả về dữ liệu dashboard cho nhân viên
        return response()->json(['message' => 'Dashboard data']);
    }

    public function profile(Request $request)
    {
        $employee = $request->user();
        if (!$employee) return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);
        return response()->json($employee);
    }

    public function products(Request $request)
    {
        // TODO: Trả về danh sách sản phẩm cho nhân viên
        return response()->json([]);
    }

    public function customers(Request $request)
    {
        // TODO: Trả về danh sách khách hàng cho nhân viên
        return response()->json([]);
    }

    public function employees(Request $request)
    {
        // TODO: Trả về danh sách nhân viên cho admin
        return response()->json([]);
    }

    public function publishers(Request $request)
    {
        // TODO: Trả về danh sách nhà xuất bản
        return response()->json([]);
    }

    public function providers(Request $request)
    {
        // TODO: Trả về danh sách nhà cung cấp
        return response()->json([]);
    }

    public function categories(Request $request)
    {
        // TODO: Trả về danh sách danh mục
        return response()->json([]);
    }

    public function reports(Request $request)
    {
        // TODO: Trả về báo cáo cho nhân viên
        return response()->json(['message' => 'Báo cáo']);
    }
}
