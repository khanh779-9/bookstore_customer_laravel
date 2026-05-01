<?php

use App\Http\Controllers\CustomerAccountController;
use App\Http\Controllers\EmployeeAccountController;
use App\Http\Controllers\EmployeeProductController;
use App\Http\Controllers\EmployeePublisherController;
use App\Http\Controllers\EmployeeProviderController;
use App\Http\Controllers\EmployeeCategoryController;
use App\Http\Controllers\EmployeeManagementController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\LoaiSachController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    // ── Public ───────────────────────────────────────────
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::get('/categories', [ProductController::class, 'categories']);
    Route::get('/publishers', [ProductController::class, 'publishers']);
    Route::get('/providers', [ProductController::class, 'providers']);
    Route::get('/authors', [AuthorController::class, 'index']);
    Route::get('/units', [UnitController::class, 'index']);
    Route::get('/loaisach', [LoaiSachController::class, 'index']);

    // ── Search & General API ─────────────────────────────
    Route::get('/search', [ProductController::class, 'search']);
  
    // ── Auth (Customer) ──────────────────────────────────
    Route::post('/auth/login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('/auth/register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::post('/auth/forgot-password', [\App\Http\Controllers\AuthController::class, 'forgot']);
    Route::post('/auth/reset-password', [\App\Http\Controllers\AuthController::class, 'reset']);
    Route::post('/auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);

    // ── Customer (auth required) ─────────────────────────
    Route::middleware('auth:sanctum')->group(function () {
        // Cart
        Route::get('/cart', [CartController::class, 'index']);
        Route::post('/cart', [CartController::class, 'add']);
        Route::patch('/cart/{id}', [CartController::class, 'update']);
        Route::delete('/cart/{id}', [CartController::class, 'remove']);
        Route::post('/cart/merge', [CartController::class, 'merge']);
        Route::post('/auth/logout', [CustomerAccountController::class, 'logout']);
        Route::get('/auth/me', [CustomerAccountController::class, 'me']);

        // Account
        Route::get('/account', [CustomerAccountController::class, 'account']);
        Route::put('/account/profile', [CustomerAccountController::class, 'updateProfile']);
        Route::put('/account/password', [CustomerAccountController::class, 'changePassword']);

        // Addresses
        Route::get('/addresses', [CustomerAccountController::class, 'addresses']);
        Route::post('/addresses', [CustomerAccountController::class, 'addAddress']);
        Route::put('/addresses/{id}', [CustomerAccountController::class, 'updateAddress']);
        Route::delete('/addresses/{id}', [CustomerAccountController::class, 'deleteAddress']);

        // Orders
        Route::get('/orders', [OrderController::class, 'index']);
        Route::get('/orders/{id}', [OrderController::class, 'show']);
        Route::post('/orders', [OrderController::class, 'store']);
        Route::post('/orders/{id}/confirm', [OrderController::class, 'confirm']);

        // Wishlist
        Route::get('/wishlist', [ProductController::class, 'wishlist']);
        Route::post('/wishlist/toggle', [ProductController::class, 'toggleWishlist']);

        // Reviews
        Route::post('/products/{id}/reviews', [ProductController::class, 'submitReview']);

        // Notifications
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::post('/notifications/mark-all', [NotificationController::class, 'markAllRead']);
        Route::post('/notifications/{id}/toggle', [NotificationController::class, 'toggleRead']);
        Route::post('/notifications/{id}/archive', [NotificationController::class, 'archive']);
    });

    // ── Employee ─────────────────────────────────────────
    Route::prefix('employee')->group(function () {
        Route::post('/login', [\App\Http\Controllers\EmployeeAuthController::class, 'login']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', [\App\Http\Controllers\EmployeeAuthController::class, 'logout']);
            Route::get('/dashboard', [EmployeeAccountController::class, 'dashboard']);
            Route::get('/profile', [EmployeeAccountController::class, 'profile']);
            Route::put('/profile', [EmployeeManagementController::class, 'updateProfile']);

            // ── Products CRUD ────────────────────────────
            Route::get('/products', [EmployeeAccountController::class, 'products']);
            Route::post('/products', [EmployeeProductController::class, 'store']);
            Route::put('/products/{id}', [EmployeeProductController::class, 'update']);
            Route::delete('/products/{id}', [EmployeeProductController::class, 'destroy']);
            Route::post('/products/{id}/image', [EmployeeProductController::class, 'uploadImage']);

            // ── Orders ───────────────────────────────────
            Route::get('/orders', [OrderController::class, 'employeeOrders']);
            Route::post('/orders', [OrderController::class, 'employeeCreateOrder']);
            Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);

            // ── Customers ────────────────────────────────
            Route::get('/customers', [EmployeeAccountController::class, 'customers']);

            // ── Employees (admin only for create/delete) ─
            Route::get('/employees', [EmployeeAccountController::class, 'employees']);
            Route::post('/employees', [EmployeeManagementController::class, 'store']);
            Route::put('/employees/{id}', [EmployeeManagementController::class, 'update']);
            Route::delete('/employees/{id}', [EmployeeManagementController::class, 'destroy']);

            // ── Publishers CRUD ──────────────────────────
            Route::get('/publishers', [EmployeeAccountController::class, 'publishers']);
            Route::post('/publishers', [EmployeePublisherController::class, 'store']);
            Route::put('/publishers/{id}', [EmployeePublisherController::class, 'update']);
            Route::delete('/publishers/{id}', [EmployeePublisherController::class, 'destroy']);

            // ── Providers CRUD ───────────────────────────
            Route::get('/providers', [EmployeeAccountController::class, 'providers']);
            Route::post('/providers', [EmployeeProviderController::class, 'store']);
            Route::put('/providers/{id}', [EmployeeProviderController::class, 'update']);
            Route::delete('/providers/{id}', [EmployeeProviderController::class, 'destroy']);

            // ── Categories CRUD ──────────────────────────
            Route::get('/categories', [EmployeeAccountController::class, 'categories']);
            Route::post('/categories', [EmployeeCategoryController::class, 'store']);
            Route::put('/categories/{id}', [EmployeeCategoryController::class, 'update']);
            Route::delete('/categories/{id}', [EmployeeCategoryController::class, 'destroy']);

            // ── Promotions CRUD ──────────────────────────
            Route::get('/promotions', [PromotionController::class, 'index']);
            Route::get('/promotions/{id}', [PromotionController::class, 'show']);
            Route::post('/promotions', [PromotionController::class, 'store']);
            Route::put('/promotions/{id}', [PromotionController::class, 'update']);
            Route::delete('/promotions/{id}', [PromotionController::class, 'destroy']);
            Route::post('/promotions/{id}/details', [PromotionController::class, 'addDetail']);
            Route::delete('/promotions/{id}/details/{detailId}', [PromotionController::class, 'removeDetail']);

            // ── Authors CRUD ─────────────────────────────
            Route::get('/authors', [AuthorController::class, 'index']);
            Route::post('/authors', [AuthorController::class, 'store']);
            Route::put('/authors/{id}', [AuthorController::class, 'update']);
            Route::delete('/authors/{id}', [AuthorController::class, 'destroy']);

            // ── Reports ──────────────────────────────────
            Route::get('/reports', [EmployeeAccountController::class, 'reports']);
        });
    });
});
