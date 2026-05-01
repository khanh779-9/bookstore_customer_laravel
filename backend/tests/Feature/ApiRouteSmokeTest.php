<?php

namespace Tests\Feature;

use App\Models\NhanVien;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ApiRouteSmokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_auth_endpoints_return_validation_errors_not_server_errors(): void
    {
        $this->postJson('/api/v1/auth/login', [])->assertStatus(422);
        $this->postJson('/api/v1/auth/register', [])->assertStatus(422);
        $this->postJson('/api/v1/auth/forgot-password', [])->assertStatus(422);
        $this->postJson('/api/v1/auth/reset-password', [])->assertStatus(422);
    }

    public function test_protected_customer_and_employee_endpoints_require_authentication(): void
    {
        $this->getJson('/api/v1/cart')->assertStatus(401);
        $this->postJson('/api/v1/employee/products', [])->assertStatus(401);
        $this->postJson('/api/v1/employee/orders', [])->assertStatus(401);
    }

    public function test_authenticated_employee_crud_routes_validate_payloads(): void
    {
        $employee = NhanVien::query()->create([
            'ho' => 'Test',
            'ten' => 'Employee',
            'email' => 'employee.test.' . uniqid() . '@example.com',
            'password' => Hash::make('secret123'),
            'role' => 'admin',
            'trangthai' => 'dang_lam',
            'ngayvaolam' => now()->toDateString(),
        ]);

        Sanctum::actingAs($employee);

        $this->postJson('/api/v1/employee/products', [])->assertStatus(422);
        $this->postJson('/api/v1/employee/categories', [])->assertStatus(422);
        $this->postJson('/api/v1/employee/providers', [])->assertStatus(422);
        $this->postJson('/api/v1/employee/publishers', [])->assertStatus(422);
        $this->postJson('/api/v1/employee/employees', [])->assertStatus(422);
    }
}
