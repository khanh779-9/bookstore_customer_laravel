<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CheckoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'dcgh_id' => ['nullable', 'integer', 'exists:diachi_giaohang,dcgh_id'],
            'phuongthuc_thanhtoan' => ['required', Rule::in(['tien_mat', 'chuyen_khoan', 'vi_dien_tu'])],
            'ghichu' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
