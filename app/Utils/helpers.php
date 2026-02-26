<?php

if (! function_exists('order_status_labels')) {
    function order_status_labels(): array
    {
        return [
            'cho_thanh_toan' => 'Chờ thanh toán',
            'cho_xac_nhan' => 'Chờ xác nhận',
            'da_xac_nhan' => 'Đã xác nhận',
            'dang_giao_hang' => 'Đang giao hàng',
            'da_giao_hang' => 'Đã giao hàng',
            'da_huy' => 'Đã hủy',
        ];
    }
}

if (! function_exists('order_status_db_codes')) {
    function order_status_db_codes(): array
    {
        return ['cho_thanh_toan', 'cho_xac_nhan', 'da_xac_nhan', 'dang_giao_hang', 'da_giao_hang', 'da_huy'];
    }
}

if (! function_exists('order_status_label')) {
    function order_status_label(?string $value): string
    {
        $labels = order_status_labels();

        return $labels[$value ?? ''] ?? ($value ?: 'Không xác định');
    }
}

if (! function_exists('order_status_badge_class')) {
    function order_status_badge_class(?string $value): string
    {
        return match ($value) {
            'cho_thanh_toan', 'cho_xac_nhan' => 'bg-warning text-dark',
            'da_xac_nhan' => 'bg-primary',
            'dang_giao_hang' => 'bg-info text-dark',
            'da_giao_hang' => 'bg-success',
            'da_huy' => 'bg-danger',
            default => 'bg-secondary',
        };
    }
}

if (! function_exists('payment_method_labels')) {
    function payment_method_labels(): array
    {
        return [
            'tien_mat' => 'Tiền mặt',
            'chuyen_khoan' => 'Chuyển khoản',
            'vi_dien_tu' => 'Ví điện tử',
            'momo' => 'MoMo',
            'zalopay' => 'ZaloPay',
        ];
    }
}

if (! function_exists('payment_method_db_codes')) {
    function payment_method_db_codes(): array
    {
        return ['tien_mat', 'chuyen_khoan', 'vi_dien_tu'];
    }
}

if (! function_exists('payment_method_options_for_checkout')) {
    function payment_method_options_for_checkout(): array
    {
        $labels = payment_method_labels();

        return collect(payment_method_db_codes())
            ->mapWithKeys(fn (string $code) => [$code => ($labels[$code] ?? $code)])
            ->all();
    }
}

if (! function_exists('payment_method_label')) {
    function payment_method_label(?string $value): string
    {
        $labels = payment_method_labels();

        return $labels[$value ?? ''] ?? ($value ?: 'Không xác định');
    }
}

if (! function_exists('notification_type_label')) {
    function notification_type_label(?string $value): string
    {
        return match ($value) {
            'khuyen_mai' => 'Khuyến mãi',
            'khach_hang' => 'Khách hàng',
            'don_hang' => 'Đơn hàng',
            'he_thong' => 'Hệ thống',
            default => $value ?: 'Khác',
        };
    }
}

if (! function_exists('notification_type_codes')) {
    function notification_type_codes(): array
    {
        return ['khuyen_mai', 'khach_hang', 'don_hang', 'he_thong'];
    }
}

if (! function_exists('notification_type_options')) {
    function notification_type_options(): array
    {
        return collect(notification_type_codes())
            ->mapWithKeys(fn (string $code) => [$code => notification_type_label($code)])
            ->all();
    }
}

if (! function_exists('notification_status_label')) {
    function notification_status_label(?string $value): string
    {
        return match ($value) {
            'chua_doc' => 'Chưa đọc',
            'da_doc' => 'Đã đọc',
            'luu_tru' => 'Lưu trữ',
            default => $value ?: 'Không xác định',
        };
    }
}

if (! function_exists('notification_status_codes')) {
    function notification_status_codes(): array
    {
        return [
            'unread' => 'chua_doc',
            'read' => 'da_doc',
            'archived' => 'luu_tru',
        ];
    }
}

if (! function_exists('notification_status_filter_options')) {
    function notification_status_filter_options(): array
    {
        return collect(notification_status_codes())
            ->mapWithKeys(fn (string $code) => [$code => notification_status_label($code)])
            ->all();
    }
}

if (! function_exists('notification_unread_code')) {
    function notification_unread_code(): string
    {
        return notification_status_codes()['unread'];
    }
}

if (! function_exists('notification_read_code')) {
    function notification_read_code(): string
    {
        return notification_status_codes()['read'];
    }
}

if (! function_exists('notification_archived_code')) {
    function notification_archived_code(): string
    {
        return notification_status_codes()['archived'];
    }
}

if (! function_exists('notification_status_badge_class')) {
    function notification_status_badge_class(?string $value): string
    {
        return match ($value) {
            'chua_doc' => 'bg-warning text-dark',
            'da_doc' => 'bg-success',
            'luu_tru' => 'bg-secondary',
            default => 'bg-secondary',
        };
    }
}

if (! function_exists('notification_toggle_read_text')) {
    function notification_toggle_read_text(?string $value): string
    {
        return $value === notification_unread_code() ? 'Đánh dấu đã đọc' : 'Đánh dấu chưa đọc';
    }
}

if (! function_exists('employee_role_label')) {
    function employee_role_label(?string $value): string
    {
        return match ($value) {
            'admin' => 'Quản trị viên',
            'quanly' => 'Quản lý',
            'nhanvien' => 'Nhân viên',
            default => $value ?: 'Không xác định',
        };
    }
}

if (! function_exists('employee_status_label')) {
    function employee_status_label(?string $value): string
    {
        return match ($value) {
            'dang_lam' => 'Đang làm',
            'nghi_viec' => 'Nghỉ việc',
            'tam_nghi' => 'Tạm nghỉ',
            default => $value ?: 'Không xác định',
        };
    }
}
