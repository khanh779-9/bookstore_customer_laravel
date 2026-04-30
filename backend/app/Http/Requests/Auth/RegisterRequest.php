<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'ho' => ['nullable', 'string', 'max:50'],
            'tendem' => ['nullable', 'string', 'max:50'],
            'ten' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'unique:khachhang,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
            'sdt' => ['nullable', 'string', 'max:20'],
            'diachi' => ['nullable', 'string', 'max:255'],
        ];
    }
}
