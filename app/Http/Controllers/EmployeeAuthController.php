<?php

namespace App\Http\Controllers;

use App\Models\NhanVien;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeAuthController extends Controller
{
    public function showLogin()
    {
        return view('auth.employee-login');
    }

    public function login(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nhanvien_id' => ['required', 'integer'],
            'password' => ['required', 'string'],
        ]);

        $employee = NhanVien::where('nhanvien_id', $validated['nhanvien_id'])->first();
        if (! $employee || $employee->trangthai !== 'dang_lam') {
            return back()->withInput()->with('error', 'Thông tin đăng nhập nhân viên không hợp lệ.');
        }

        $stored = (string) ($employee->password ?? '');
        $isValid = false;

        if ($stored !== '') {
            $isValid = Hash::check($validated['password'], $stored) || hash_equals($stored, $validated['password']);
        }

        if (! $isValid) {
            return back()->withInput()->with('error', 'Thông tin đăng nhập nhân viên không hợp lệ.');
        }

        $role = in_array($employee->role, ['admin', 'quanly', 'nhanvien'], true) ? $employee->role : 'nhanvien';

        session()->put('employee', [
            'id' => (int) $employee->nhanvien_id,
            'name' => trim(($employee->ho ?? '') . ' ' . ($employee->tendem ?? '') . ' ' . ($employee->ten ?? '')),
            'email' => (string) ($employee->email ?? ''),
            'role' => $role,
        ]);

        return redirect()->route($role === 'nhanvien' ? 'employee.orders' : 'employee.dashboard')
            ->with('success', 'Đăng nhập nhân viên thành công.');
    }

    public function logout(): RedirectResponse
    {
        session()->forget('employee');

        return redirect()->route('employee.login')->with('success', 'Đã đăng xuất tài khoản nhân viên.');
    }
}
