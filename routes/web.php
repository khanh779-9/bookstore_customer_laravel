<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CustomerAuthController;
use App\Http\Controllers\CustomerPortalController;
use App\Http\Controllers\EmployeeAuthController;
use App\Http\Controllers\EmployeePortalController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/customer')->name('home');

Route::prefix('customer')->name('customer.')->group(function () {
	Route::get('/', [HomeController::class, 'index'])->name('home');

	Route::get('/login', [CustomerAuthController::class, 'showLogin'])->name('login');
	Route::post('/login', [CustomerAuthController::class, 'login'])->name('login.submit');
	Route::get('/login/google', [CustomerAuthController::class, 'googleLogin'])->name('login.google');
	Route::get('/login/google/callback', [CustomerAuthController::class, 'googleCallback'])->name('login.google.callback');
	Route::get('/forgot-password', [CustomerAuthController::class, 'showForgotPassword'])->name('password.forgot');
	Route::post('/forgot-password/send-code', [CustomerAuthController::class, 'sendResetCode'])->name('password.send-code');
	Route::post('/forgot-password/verify-code', [CustomerAuthController::class, 'verifyResetCode'])->name('password.verify-code');
	Route::post('/forgot-password/reset', [CustomerAuthController::class, 'resetPassword'])->name('password.reset');
	Route::get('/register', [CustomerAuthController::class, 'showRegister'])->name('register');
	Route::post('/register', [CustomerAuthController::class, 'register'])->name('register.submit');
	Route::post('/logout', [CustomerAuthController::class, 'logout'])->name('logout');
	Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
	Route::get('/about', [HomeController::class, 'about'])->name('about');
	Route::get('/privacy-policy', [HomeController::class, 'privacyPolicy'])->name('privacy-policy');
	Route::get('/return-policy', [HomeController::class, 'returnPolicy'])->name('return-policy');
	Route::get('/warranty-policy', [HomeController::class, 'warrantyPolicy'])->name('warranty-policy');
	Route::get('/shipping-delivery', [HomeController::class, 'shippingDelivery'])->name('shipping-delivery');

	Route::get('/products', [ProductController::class, 'index'])->name('products.index');
	Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
	Route::post('/products/{id}/reviews', [ProductController::class, 'submitReview'])->name('products.reviews.submit');

	Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
	Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
	Route::patch('/cart/{id}', [CartController::class, 'update'])->name('cart.update');
	Route::delete('/cart/{id}', [CartController::class, 'remove'])->name('cart.remove');
	Route::post('/wishlist/toggle', [ProductController::class, 'toggleWishlist'])->name('wishlist.toggle');
	Route::get('/wishlist', [ProductController::class, 'wishlist'])->name('wishlist.index');

	Route::middleware('customer.auth')->group(function () {
		Route::get('/checkout', [OrderController::class, 'create'])->name('checkout.create');
		Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');
		Route::post('/checkout/confirm', [OrderController::class, 'confirm'])->name('checkout.confirm');
		Route::get('/checkout/success', [OrderController::class, 'success'])->name('checkout.success');

		Route::get('/account', [CustomerPortalController::class, 'account'])->name('account');
		Route::post('/account/profile', [CustomerPortalController::class, 'updateProfile'])->name('account.profile');
		Route::post('/account/password', [CustomerPortalController::class, 'changePassword'])->name('account.password');
		Route::post('/account/addresses', [CustomerPortalController::class, 'addAddress'])->name('account.addresses.add');
		Route::put('/account/addresses/{id}', [CustomerPortalController::class, 'updateAddress'])->name('account.addresses.update');
		Route::delete('/account/addresses/{id}', [CustomerPortalController::class, 'deleteAddress'])->name('account.addresses.delete');

		Route::get('/orders', [CustomerPortalController::class, 'orders'])->name('orders');
		Route::get('/orders/{id}', [CustomerPortalController::class, 'orderDetail'])->name('orders.detail');

		Route::get('/notifications', [CustomerPortalController::class, 'notifications'])->name('notifications');
		Route::post('/notifications/mark-all', [CustomerPortalController::class, 'markAllNotificationsRead'])->name('notifications.mark-all');
		Route::post('/notifications/{id}/toggle', [CustomerPortalController::class, 'toggleNotificationRead'])->name('notifications.toggle');
		Route::post('/notifications/{id}/archive', [CustomerPortalController::class, 'archiveNotification'])->name('notifications.archive');
	});
});

Route::prefix('employee')->name('employee.')->group(function () {
	Route::get('/login', [EmployeeAuthController::class, 'showLogin'])->name('login');
	Route::post('/login', [EmployeeAuthController::class, 'login'])->name('login.submit');
	Route::post('/logout', [EmployeeAuthController::class, 'logout'])->name('logout');

	Route::middleware('employee.auth')->group(function () {
		Route::get('/', [EmployeePortalController::class, 'dashboard'])->name('dashboard');
		Route::get('/dashboard', [EmployeePortalController::class, 'dashboard'])->name('dashboard.alt');
		Route::get('/products', [EmployeePortalController::class, 'products'])->name('products');
		Route::get('/orders', [EmployeePortalController::class, 'orders'])->name('orders');
		Route::patch('/orders/{id}/status', [EmployeePortalController::class, 'updateOrderStatus'])->name('orders.status');
		Route::get('/customers', [EmployeePortalController::class, 'customers'])->name('customers');
		Route::get('/profile', [EmployeePortalController::class, 'profile'])->name('profile');

		Route::middleware('employee.role:admin,quanly')->group(function () {
			Route::get('/publishers', [EmployeePortalController::class, 'publishers'])->name('publishers');
			Route::get('/providers', [EmployeePortalController::class, 'providers'])->name('providers');
			Route::get('/categories', [EmployeePortalController::class, 'categories'])->name('categories');
			Route::get('/promotions', [EmployeePortalController::class, 'promotions'])->name('promotions');
			Route::get('/reports', [EmployeePortalController::class, 'reports'])->name('reports');
		});

		Route::middleware('employee.role:admin')->group(function () {
			Route::get('/employees', [EmployeePortalController::class, 'employees'])->name('employees');
			Route::get('/settings', [EmployeePortalController::class, 'settings'])->name('settings');
		});
	});
});
