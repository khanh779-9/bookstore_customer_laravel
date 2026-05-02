<?php

namespace App\Http\Controllers;

abstract class Controller
{
    /**
     * Get the current authenticated customer ID.
     */
    protected function getCustomerId(): int
    {
        $user = auth()->user() ?? request()->user();
        if ($user && isset($user->khachhang_id)) {
            return (int) $user->khachhang_id;
        }

        // Fallback for session-based auth if active
        if (request()->hasSession()) {
            return (int) (session('customer_id') ?? session('customer.id') ?? 0);
        }

        return 0;
    }

    /**
     * Get the current authenticated employee ID.
     */
    protected function getEmployeeId(): int
    {
        $user = auth()->user() ?? request()->user();
        if ($user && isset($user->nhanvien_id)) {
            return (int) $user->nhanvien_id;
        }

        return 0;
    }

    /**
     * Handle request failures consistently.
     */
    protected function handleFailure(\Illuminate\Http\Request $request, string $message, int $code = 400)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            return response()->json(['message' => $message], $code);
        }

        return back()->with('error', $message)->withInput();
    }

    /**
     * Handle success responses consistently.
     */
    protected function handleSuccess(\Illuminate\Http\Request $request, string $message, $data = null, string $redirect = null)
    {
        if ($request->expectsJson() || $request->is('api/*')) {
            $response = ['message' => $message];
            if ($data) $response['data'] = $data;
            return response()->json($response);
        }

        $redir = $redirect ? redirect($redirect) : back();
        return $redir->with('success', $message);
    }
}
