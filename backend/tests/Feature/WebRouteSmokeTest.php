<?php

namespace Tests\Feature;

use Tests\TestCase;

class WebRouteSmokeTest extends TestCase
{
    public function test_customer_web_entry_routes_resolve_to_frontend_paths(): void
    {
        $this->get('/customer/login')->assertRedirect('/login');
        $this->get('/customer/register')->assertRedirect('/register');
        $this->get('/customer/contact')->assertRedirect('/contact');
    }

    public function test_employee_web_login_route_resolves_to_frontend_path(): void
    {
        $this->get('/employee/login')->assertRedirect('/internal/login');
    }
}
