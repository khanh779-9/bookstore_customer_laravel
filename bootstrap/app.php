<?php

use App\Http\Middleware\EnsureCustomerAuthenticated;
use App\Http\Middleware\EnsureEmployeeAuthenticated;
use App\Http\Middleware\EnsureEmployeeRole;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->alias([
            'customer.auth' => EnsureCustomerAuthenticated::class,
            'employee.auth' => EnsureEmployeeAuthenticated::class,
            'employee.role' => EnsureEmployeeRole::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
