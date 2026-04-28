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
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/customer')->name('home');

Route::prefix('customer')->name('customer.')->group(function () {
	Route::get('/', [ProductController::class, 'home'])->name('home');

	Route::get('/login', [CustomerAccountController::class, 'showLogin'])->name('login');
	Route::post('/login', [CustomerAccountController::class, 'login'])->name('login.submit');
	Route::get('/login/google', [CustomerAccountController::class, 'googleLogin'])->name('login.google');
	Route::get('/login/google/callback', [CustomerAccountController::class, 'googleCallback'])->name('login.google.callback');
	Route::get('/forgot-password', [CustomerAccountController::class, 'showForgotPassword'])->name('password.forgot');
	Route::post('/forgot-password/send-code', [CustomerAccountController::class, 'forgotPassword'])->name('password.send-code');
	Route::post('/forgot-password/verify-code', [CustomerAccountController::class, 'verifyCode'])->name('password.verify-code');
	Route::post('/forgot-password/reset', [CustomerAccountController::class, 'resetPassword'])->name('password.reset');
	Route::get('/register', [CustomerAccountController::class, 'showRegister'])->name('register');
	Route::post('/register', [CustomerAccountController::class, 'register'])->name('register.submit');
	Route::post('/logout', [CustomerAccountController::class, 'logout'])->name('logout');
	
	Route::get('/contact', [CustomerAccountController::class, 'contact'])->name('contact');
	Route::get('/about', [CustomerAccountController::class, 'about'])->name('about');
	Route::get('/privacy-policy', [CustomerAccountController::class, 'privacyPolicy'])->name('privacy-policy');
	Route::get('/return-policy', [CustomerAccountController::class, 'returnPolicy'])->name('return-policy');
	Route::get('/warranty-policy', [CustomerAccountController::class, 'warrantyPolicy'])->name('warranty-policy');
	Route::get('/shipping-delivery', [CustomerAccountController::class, 'shippingDelivery'])->name('shipping-delivery');

	Route::get('/products', [ProductController::class, 'index'])->name('products.index');
	Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
	Route::post('/products/{id}/reviews', [ProductController::class, 'submitReview'])->name('products.reviews.submit');
    Route::get('/authors/{id}', [AuthorController::class, 'show'])->name('authors.show');

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

		Route::get('/account', [CustomerAccountController::class, 'account'])->name('account');
		Route::post('/account/profile', [CustomerAccountController::class, 'updateProfile'])->name('account.profile');
		Route::post('/account/password', [CustomerAccountController::class, 'changePassword'])->name('account.password');
		Route::post('/account/addresses', [CustomerAccountController::class, 'addAddress'])->name('account.addresses.add');
		Route::put('/account/addresses/{id}', [CustomerAccountController::class, 'updateAddress'])->name('account.addresses.update');
		Route::delete('/account/addresses/{id}', [CustomerAccountController::class, 'deleteAddress'])->name('account.addresses.delete');

		Route::get('/orders', [OrderController::class, 'index'])->name('orders');
		Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.detail');

		Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications');
		Route::post('/notifications/mark-all', [NotificationController::class, 'markAllRead'])->name('notifications.mark-all');
		Route::post('/notifications/{id}/toggle', [NotificationController::class, 'toggleRead'])->name('notifications.toggle');
		Route::post('/notifications/{id}/archive', [NotificationController::class, 'archive'])->name('notifications.archive');
	});
});

Route::prefix('employee')->name('employee.')->group(function () {
	Route::get('/login', [EmployeeAccountController::class, 'showLogin'])->name('login');
	Route::post('/login', [EmployeeAccountController::class, 'login'])->name('login.submit');
	Route::post('/logout', [EmployeeAccountController::class, 'logout'])->name('logout');

	Route::middleware('employee.auth')->group(function () {
		Route::get('/', [EmployeeAccountController::class, 'dashboard'])->name('dashboard');
		Route::get('/dashboard', [EmployeeAccountController::class, 'dashboard'])->name('dashboard.alt');
		
		// Products CRUD
		Route::get('/products', [EmployeeAccountController::class, 'products'])->name('products');
		Route::post('/products', [EmployeeProductController::class, 'store'])->name('products.store');
		Route::put('/products/{id}', [EmployeeProductController::class, 'update'])->name('products.update');
		Route::delete('/products/{id}', [EmployeeProductController::class, 'destroy'])->name('products.destroy');
		Route::post('/products/{id}/image', [EmployeeProductController::class, 'uploadImage'])->name('products.image');

		// Orders
		Route::get('/orders', [OrderController::class, 'employeeOrders'])->name('orders');
		Route::post('/orders', [OrderController::class, 'employeeCreateOrder'])->name('orders.create');
		Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus'])->name('orders.status');
		
		// Customers
		Route::get('/customers', [EmployeeAccountController::class, 'customers'])->name('customers');
		
		// Profile
		Route::get('/profile', [EmployeeAccountController::class, 'profile'])->name('profile');
		Route::put('/profile', [EmployeeManagementController::class, 'updateProfile'])->name('profile.update');

		Route::middleware('employee.role:admin,quanly')->group(function () {
			// Publishers CRUD
			Route::get('/publishers', [EmployeeAccountController::class, 'publishers'])->name('publishers');
			Route::post('/publishers', [EmployeePublisherController::class, 'store'])->name('publishers.store');
			Route::put('/publishers/{id}', [EmployeePublisherController::class, 'update'])->name('publishers.update');
			Route::delete('/publishers/{id}', [EmployeePublisherController::class, 'destroy'])->name('publishers.destroy');

			// Providers CRUD
			Route::get('/providers', [EmployeeAccountController::class, 'providers'])->name('providers');
			Route::post('/providers', [EmployeeProviderController::class, 'store'])->name('providers.store');
			Route::put('/providers/{id}', [EmployeeProviderController::class, 'update'])->name('providers.update');
			Route::delete('/providers/{id}', [EmployeeProviderController::class, 'destroy'])->name('providers.destroy');

			// Categories CRUD
			Route::get('/categories', [EmployeeAccountController::class, 'categories'])->name('categories');
			Route::post('/categories', [EmployeeCategoryController::class, 'store'])->name('categories.store');
			Route::put('/categories/{id}', [EmployeeCategoryController::class, 'update'])->name('categories.update');
			Route::delete('/categories/{id}', [EmployeeCategoryController::class, 'destroy'])->name('categories.destroy');

			// Promotions CRUD
			Route::get('/promotions', [PromotionController::class, 'index'])->name('promotions');
			Route::post('/promotions', [PromotionController::class, 'store'])->name('promotions.store');
			Route::put('/promotions/{id}', [PromotionController::class, 'update'])->name('promotions.update');
			Route::delete('/promotions/{id}', [PromotionController::class, 'destroy'])->name('promotions.destroy');
			Route::post('/promotions/{id}/details', [PromotionController::class, 'addDetail'])->name('promotions.details.add');
			Route::delete('/promotions/{id}/details/{detailId}', [PromotionController::class, 'removeDetail'])->name('promotions.details.remove');

			// Authors CRUD
            Route::get('/authors', [AuthorController::class, 'index'])->name('authors');
			Route::post('/authors', [AuthorController::class, 'store'])->name('authors.store');
			Route::put('/authors/{id}', [AuthorController::class, 'update'])->name('authors.update');
			Route::delete('/authors/{id}', [AuthorController::class, 'destroy'])->name('authors.destroy');

			// Reports
			Route::get('/reports', [EmployeeAccountController::class, 'reports'])->name('reports');
		});

		Route::middleware('employee.role:admin')->group(function () {
			// Employees CRUD
			Route::get('/employees', [EmployeeAccountController::class, 'employees'])->name('employees');
			Route::post('/employees', [EmployeeManagementController::class, 'store'])->name('employees.store');
			Route::put('/employees/{id}', [EmployeeManagementController::class, 'update'])->name('employees.update');
			Route::delete('/employees/{id}', [EmployeeManagementController::class, 'destroy'])->name('employees.destroy');

			Route::get('/settings', [EmployeeAccountController::class, 'settings'])->name('settings');
		});
	});
});
