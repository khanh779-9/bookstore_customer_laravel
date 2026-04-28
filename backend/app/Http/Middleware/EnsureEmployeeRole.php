<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureEmployeeRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $employee = session('employee');
        $role = $employee['role'] ?? null;

        if (! $employee || ! $role || ! in_array($role, $roles, true)) {
            return redirect()->route('employee.orders')->with('error', 'Bạn không có quyền truy cập chức năng này.');
        }

        return $next($request);
    }
}
