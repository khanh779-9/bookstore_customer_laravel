<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'q' => ['nullable', 'string', 'max:100'],
            'danhmucSP_id' => ['nullable', 'integer', 'exists:danhmucsanpham,danhmucSP_id'],
            'provider_id' => ['nullable', 'integer', 'exists:nhacungcap,nhacungcap_id'],
            'publisher_id' => ['nullable', 'integer', 'exists:nhaxuatban,nhaxuatban_id'],
            'min' => ['nullable', 'numeric', 'min:0'],
            'max' => ['nullable', 'numeric', 'min:0'],
            'sort_by' => ['nullable', 'string', 'in:newest,price_asc,price_desc,best_selling'],
            'promoted_only' => ['nullable'],
            'loaisach_code' => ['nullable', 'string', 'exists:loaisach,loaisach_code'],
            'limit' => ['nullable', 'integer', 'min:1', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
            'attr' => ['nullable', 'array'],
        ];
    }
}
