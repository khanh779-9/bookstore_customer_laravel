<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCustomerAuthenticated
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! session()->has('customer')) {
            return redirect()->route('customer.login')->with('error', 'Vui lòng đăng nhập tài khoản khách hàng.');
        }

        return $next($request);
    }
}
