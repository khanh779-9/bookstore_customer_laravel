<?php

namespace App\Http\Controllers;

use App\Models\KhachHang;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class CustomerAuthController extends Controller
{
    public function showForgotPassword()
    {
        return view('auth.customer-forgot-password', [
            'state' => session('password_reset_state', 'request'),
            'email' => session('password_reset.email'),
        ]);
    }

    public function showLogin()
    {
        return view('auth.customer-login');
    }

    public function googleLogin(): RedirectResponse
    {
        $clientId = (string) config('services.google.client_id', '');
        $clientSecret = (string) config('services.google.client_secret', '');
        $redirectUrl = (string) config('services.google.redirect', '');

        if ($clientId === '' || $clientSecret === '' || $redirectUrl === '') {
            return redirect()->route('customer.login')->with('error', 'Thiếu cấu hình Google OAuth. Vui lòng thêm GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET và GOOGLE_REDIRECT_URI trong .env.');
        }

        try {
            return Socialite::driver('google')
                ->scopes(['openid', 'profile', 'email'])
                ->redirect();
        } catch (Throwable) {
            return redirect()->route('customer.login')->with('error', 'Không thể kết nối Google OAuth lúc này. Vui lòng thử lại sau.');
        }
    }

    public function googleCallback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $email = trim((string) ($googleUser->getEmail() ?? ''));
            if ($email === '') {
                return redirect()->route('customer.login')->with('error', 'Tài khoản Google không cung cấp email hợp lệ.');
            }

            $customer = KhachHang::where('email', $email)->first();
            if (! $customer) {
                [$ho, $tendem, $ten] = $this->splitFullName((string) ($googleUser->getName() ?? 'Google User'));

                $customer = KhachHang::create([
                    'ho' => $ho,
                    'tendem' => $tendem,
                    'ten' => $ten,
                    'email' => $email,
                    'password' => Hash::make(Str::random(32)),
                ]);
            }

            session()->put('customer', [
                'id' => (int) $customer->khachhang_id,
                'name' => trim(($customer->ho ?? '') . ' ' . ($customer->tendem ?? '') . ' ' . ($customer->ten ?? '')),
                'email' => (string) $customer->email,
            ]);

            return redirect()->route('customer.home')->with('success', 'Đăng nhập Google thành công.');
        } catch (Throwable) {
            return redirect()->route('customer.login')->with('error', 'Đăng nhập Google thất bại hoặc đã bị hủy.');
        }
    }

    private function splitFullName(string $fullName): array
    {
        $normalized = trim(preg_replace('/\s+/', ' ', $fullName) ?? '');
        if ($normalized === '') {
            return ['Google', null, 'User'];
        }

        $parts = explode(' ', $normalized);
        if (count($parts) === 1) {
            return [$parts[0], null, 'User'];
        }

        $ho = array_shift($parts) ?: 'Google';
        $ten = array_pop($parts) ?: 'User';
        $tendem = ! empty($parts) ? implode(' ', $parts) : null;

        return [$ho, $tendem, $ten];
    }

    public function sendResetCode(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $customer = KhachHang::where('email', $validated['email'])->first();
        if (! $customer) {
            return back()->with('error', 'Email không tồn tại trong hệ thống.');
        }

        $code = str_pad((string) random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        session()->put('password_reset', [
            'email' => $validated['email'],
            'code' => $code,
            'verified' => false,
            'expires_at' => time() + (15 * 60),
        ]);
        session()->put('password_reset_state', 'verify');

        Mail::raw('Mã xác nhận đặt lại mật khẩu của bạn là: ' . $code . '. Mã có hiệu lực trong 15 phút.', function ($message) use ($validated) {
            $message->to($validated['email'])
                ->subject('Mã xác nhận đặt lại mật khẩu - BookStore');
        });

        return redirect()->route('customer.password.forgot')->with('success', 'Đã gửi mã xác nhận qua email.');
    }

    public function verifyResetCode(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'code' => ['required', 'digits:6'],
        ]);

        $reset = session('password_reset');
        if (! $reset || empty($reset['email']) || ($reset['expires_at'] ?? 0) < time()) {
            session()->forget(['password_reset', 'password_reset_state']);

            return redirect()->route('customer.password.forgot')->with('error', 'Yêu cầu đặt lại mật khẩu đã hết hạn.');
        }

        if (! hash_equals((string) $reset['code'], (string) $validated['code'])) {
            return back()->with('error', 'Mã xác nhận không đúng.');
        }

        $reset['verified'] = true;
        session()->put('password_reset', $reset);
        session()->put('password_reset_state', 'reset');

        return redirect()->route('customer.password.forgot')->with('success', 'Xác thực mã thành công, vui lòng nhập mật khẩu mới.');
    }

    public function resetPassword(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        $reset = session('password_reset');
        if (! $reset || empty($reset['email']) || empty($reset['verified']) || ($reset['expires_at'] ?? 0) < time()) {
            session()->forget(['password_reset', 'password_reset_state']);

            return redirect()->route('customer.password.forgot')->with('error', 'Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.');
        }

        $customer = KhachHang::where('email', $reset['email'])->first();
        if (! $customer) {
            session()->forget(['password_reset', 'password_reset_state']);

            return redirect()->route('customer.password.forgot')->with('error', 'Tài khoản không tồn tại.');
        }

        $customer->password = Hash::make($validated['password']);
        $customer->save();

        session()->forget(['password_reset', 'password_reset_state']);

        return redirect()->route('customer.login')->with('success', 'Đặt lại mật khẩu thành công. Vui lòng đăng nhập.');
    }

    public function login(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $customer = KhachHang::where('email', $validated['email'])->first();
        if (! $customer) {
            return back()->withInput()->with('error', 'Email hoặc mật khẩu không đúng.');
        }

        $stored = (string) ($customer->password ?? '');
        $isValid = false;

        if ($stored !== '') {
            $isValid = Hash::check($validated['password'], $stored) || hash_equals($stored, $validated['password']);
        }

        if (! $isValid) {
            return back()->withInput()->with('error', 'Email hoặc mật khẩu không đúng.');
        }

        session()->put('customer', [
            'id' => (int) $customer->khachhang_id,
            'name' => trim(($customer->ho ?? '') . ' ' . ($customer->tendem ?? '') . ' ' . ($customer->ten ?? '')),
            'email' => (string) $customer->email,
        ]);

        return redirect()->route('customer.home')->with('success', 'Đăng nhập thành công.');
    }

    public function showRegister()
    {
        return view('auth.customer-register');
    }

    public function register(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ho' => ['required', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:100', 'unique:khachhang,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'sdt' => ['nullable', 'string', 'max:15'],
        ]);

        $customer = KhachHang::create([
            'ho' => $validated['ho'],
            'tendem' => $validated['tendem'] ?? null,
            'ten' => $validated['ten'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'sdt' => $validated['sdt'] ?? null,
        ]);

        session()->put('customer', [
            'id' => (int) $customer->khachhang_id,
            'name' => trim(($customer->ho ?? '') . ' ' . ($customer->tendem ?? '') . ' ' . ($customer->ten ?? '')),
            'email' => (string) $customer->email,
        ]);

        return redirect()->route('customer.home')->with('success', 'Đăng ký và đăng nhập thành công.');
    }

    public function logout(): RedirectResponse
    {
        session()->forget('customer');

        return redirect()->route('customer.home')->with('success', 'Đã đăng xuất tài khoản khách hàng.');
    }
}
