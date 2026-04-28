<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmployeeAuthenticated
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! session()->has('employee')) {
            return redirect()->route('employee.login')->with('error', 'Vui lòng đăng nhập tài khoản nhân viên.');
        }

        return $next($request);
    }
}
