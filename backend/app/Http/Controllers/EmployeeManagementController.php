<?php

namespace App\Http\Controllers;

use App\Http\Resources\NhanVienResource;
use App\Models\NhanVien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeManagementController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ho' => ['required', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'unique:nhanvien,email'],
            'password' => ['required', 'string', 'min:6'],
            'role' => ['nullable', 'string', 'in:admin,quanly,nhanvien'],
            'vaitro' => ['nullable', 'string', 'in:admin,quanly,nhanvien'],
        ]);

        $validated['role'] = $validated['role'] ?? $validated['vaitro'] ?? 'nhanvien';
        unset($validated['vaitro']);
        $validated['password'] = Hash::make($validated['password']);
        $validated['ngayvaolam'] = now();
        $validated['trangthai'] = 'dang_lam';

        $employee = NhanVien::create($validated);

        return (new NhanVienResource($employee))->additional(['message' => 'Thêm nhân viên thành công!']);
    }

    public function update(Request $request, int $id)
    {
        $employee = NhanVien::findOrFail($id);
        
        $validated = $request->validate([
            'ho' => ['sometimes', 'required', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten' => ['sometimes', 'required', 'string', 'max:50'],
            'email' => ['sometimes', 'required', 'email', 'unique:nhanvien,email,'.$id.',nhanvien_id'],
            'role' => ['sometimes', 'required', 'string', 'in:admin,quanly,nhanvien'],
            'vaitro' => ['sometimes', 'required', 'string', 'in:admin,quanly,nhanvien'],
            'trangthai' => ['sometimes', 'required', 'string', 'in:dang_lam,nghi_viec,tam_nghi'],
        ]);

        if (array_key_exists('vaitro', $validated) && !array_key_exists('role', $validated)) {
            $validated['role'] = $validated['vaitro'];
        }
        unset($validated['vaitro']);

        if ($request->has('password')) {
            $validated['password'] = Hash::make($request->password);
        }

        $employee->update($validated);

        return (new NhanVienResource($employee))->additional(['message' => 'Cập nhật nhân viên thành công!']);
    }

    public function destroy(int $id)
    {
        $employee = NhanVien::findOrFail($id);
        $employee->delete();

        return response()->json(['message' => 'Xóa nhân viên thành công!']);
    }

    public function updateProfile(Request $request)
    {
        $employee = $request->user();
        if (!$employee) return response()->json(['message' => 'Không tìm thấy nhân viên'], 404);

        $validated = $request->validate([
            'ho' => ['sometimes', 'required', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten' => ['sometimes', 'required', 'string', 'max:50'],
            'email' => ['sometimes', 'required', 'email', 'unique:nhanvien,email,'.$employee->nhanvien_id.',nhanvien_id'],
        ]);

        $employee->update($validated);

        return (new NhanVienResource($employee))->additional(['message' => 'Cập nhật thông tin cá nhân thành công!']);
    }
}
