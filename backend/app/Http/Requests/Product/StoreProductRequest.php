<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tenSP' => ['required', 'string', 'max:255'],
            'danhmucSP_id' => ['required', 'integer', 'exists:danhmucsanpham,danhmucSP_id'],
            'gia' => ['required', 'numeric', 'min:0'],
            'soluongton' => ['required', 'integer', 'min:0'],
            'donvitinh_id' => ['required', 'integer', 'exists:donvitinh,donvitinh_id'],
            'nhacungcap_id' => ['nullable', 'integer', 'exists:nhacungcap,nhacungcap_id'],
            'mo_ta' => ['nullable', 'string'],
            'type' => ['required', 'string', 'in:book,stationery'],
            
            // Book specific fields
            'tacgia_id' => ['required_if:type,book', 'integer', 'exists:tacgia,tacgia_id'],
            'nhaxuatban_id' => ['required_if:type,book', 'integer', 'exists:nhaxuatban,nhaxuatban_id'],
            'namXB' => ['required_if:type,book', 'integer', 'min:1900', 'max:' . (date('Y') + 1)],
            'loaisach_code' => ['required_if:type,book', 'string', 'exists:loaisach,loaisach_code'],
        ];
    }
}
