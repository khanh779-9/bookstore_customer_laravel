<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tenSP' => ['sometimes', 'required', 'string', 'max:255'],
            'danhmucSP_id' => ['sometimes', 'required', 'integer', 'exists:danhmucsanpham,danhmucSP_id'],
            'gia' => ['sometimes', 'required', 'numeric', 'min:0'],
            'soluongton' => ['sometimes', 'required', 'integer', 'min:0'],
            'donvitinh_id' => ['sometimes', 'required', 'integer', 'exists:donvitinh,donvitinh_id'],
            'nhacungcap_id' => ['nullable', 'integer', 'exists:nhacungcap,nhacungcap_id'],
            'mo_ta' => ['nullable', 'string'],
            
            // Book specific fields (optional update)
            'tacgia_id' => ['nullable', 'integer', 'exists:tacgia,tacgia_id'],
            'nhaxuatban_id' => ['nullable', 'integer', 'exists:nhaxuatban,nhaxuatban_id'],
            'namXB' => ['nullable', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'loaisach_code' => ['nullable', 'string', 'exists:loaisach,loaisach_code'],
        ];
    }
}
