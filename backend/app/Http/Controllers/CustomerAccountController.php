<?php

namespace App\Http\Controllers;

use App\Http\Resources\KhachHangResource;
use App\Models\KhachHang;
use App\Models\DiaChiGiaoHang;
use App\Services\AuthService;
use App\Services\PasswordResetService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class CustomerAccountController extends Controller
{
    // Authentication methods are handled by AuthController


    public function googleLogin(Request $request)
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            $email = strtolower(trim((string) $googleUser->getEmail()));

            if ($email === '') {
                return redirect('/login?error=google_email_missing');
            }

            $customer = KhachHang::where('email', $email)->first();
            if (!$customer) {
                $nameParts = preg_split('/\s+/', trim((string) $googleUser->getName())) ?: [];
                $ten = array_pop($nameParts) ?: 'User';
                $ho = implode(' ', $nameParts);

                $customer = KhachHang::create([
                    'ho' => $ho,
                    'tendem' => null,
                    'ten' => $ten,
                    'email' => $email,
                    'password' => Hash::make((string) str()->random(40)),
                    'ngaythamgia' => now(),
                ]);
            }

            $request->session()->put('customer_id', $customer->khachhang_id);
            $request->session()->put('customer.id', $customer->khachhang_id);
            $token = $customer->createToken($request->header('User-Agent') ?: 'web')->plainTextToken;
            $request->session()->put('customer_token', $token);

            return redirect('/');
        } catch (\Throwable $e) {
            Log::warning('Google login failed', ['error' => $e->getMessage()]);
            return redirect('/login?error=google_auth_failed');
        }
    }

    public function me(Request $request)
    {
        $customer = $request->user() ?: KhachHang::find(session('customer_id'));
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        return new KhachHangResource($customer);
    }

    public function account(Request $request)
    {
        return $this->me($request);
    }

    public function updateProfile(Request $request)
    {
        $customer = $request->user() ?: KhachHang::find(session('customer_id'));
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        
        $validated = $request->validate([
            'ho' => ['nullable', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'unique:khachhang,email,'.$customer->khachhang_id.',khachhang_id'],
            'sdt' => ['nullable', 'string', 'max:20'],
            'diachi' => ['nullable', 'string', 'max:500'],
            'ngaysinh' => ['nullable', 'date'],
        ]);

        $customer->update($validated);
        
        return (new KhachHangResource($customer))->additional(['message' => 'Cập nhật thành công']);
    }

    public function changePassword(Request $request)
    {
        $customer = $request->user() ?: KhachHang::find(session('customer_id'));
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);
        
        $request->validate([
            'old_password' => ['required'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if (!Hash::check($request->old_password, $customer->password)) {
            return response()->json(['message' => 'Mật khẩu cũ không đúng'], 400);
        }

        $customer->password = Hash::make($request->password);
        $customer->save();
        
        return response()->json(['message' => 'Đổi mật khẩu thành công']);
    }

    public function addresses(Request $request)
    {
        $customer = $request->user() ?: KhachHang::find(session('customer_id'));
        $addresses = DiaChiGiaoHang::where('khachhang_id', $customer->khachhang_id)->get();
        return response()->json($addresses);
    }

    public function addAddress(Request $request)
    {
        $customer = $request->user() ?: KhachHang::find(session('customer_id'));
        $validated = $request->validate(['diachi' => ['required', 'string', 'max:500']]);
        
        $address = DiaChiGiaoHang::create([
            'khachhang_id' => $customer->khachhang_id,
            'diachi' => $validated['diachi']
        ]);

        return response()->json(['message' => 'Thêm địa chỉ thành công', 'address' => $address]);
    }

    public function updateAddress(Request $request, int $id)
    {
        $customer = $request->user() ?: KhachHang::find(session('customer_id'));
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);

        $validated = $request->validate(['diachi' => ['required', 'string', 'max:500']]);
        $address = DiaChiGiaoHang::where('dcgh_id', $id)
            ->where('khachhang_id', $customer->khachhang_id)
            ->firstOrFail();

        $address->update($validated);

        return response()->json(['message' => 'Cập nhật địa chỉ thành công', 'address' => $address]);
    }

    public function deleteAddress(Request $request, int $id)
    {
        $customer = $request->user() ?: KhachHang::find(session('customer_id'));
        if (!$customer) return response()->json(['message' => 'Không tìm thấy khách hàng'], 404);

        $address = DiaChiGiaoHang::where('dcgh_id', $id)
            ->where('khachhang_id', $customer->khachhang_id)
            ->firstOrFail();

        $address->delete();

        return response()->json(['message' => 'Xóa địa chỉ thành công']);
    }


    public function logout(Request $request)
    {
        $request->session()->forget(['customer_id', 'customer.id']);
        if ($request->user()) {
            $request->user()->currentAccessToken()?->delete();
        }

        return response()->json(['message' => 'Đăng xuất thành công']);
    }
}
