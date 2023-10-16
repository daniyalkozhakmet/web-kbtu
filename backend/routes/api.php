<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerificationController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/refresh', [AuthController::class, 'refresh']);

Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'getProducts']);
    Route::get('/{id}', [ProductController::class, 'getProductById']);
    Route::get('/comment/{product_id}', [CommentController::class, 'getCommentByProduct']);
});
Route::prefix('categories')->group(function () {
    Route::get('/{id}', [CategoryController::class, 'getProductsByCategory']);
    Route::get('/', [CategoryController::class, 'getCategories']);
});



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('email/resend', [VerificationController::class, 'resend'])->name('verification.resend');
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/comment/{product_id}', [CommentController::class, 'createComment']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
Route::post('/admin/create', [AdminController::class, 'create_product']);

Route::middleware(['auth:sanctum', 'abilities:server:admin'])->group(function () {
    Route::get('/admin/users', [UserController::class, 'get_users']);
    Route::post('/admin/create', [AdminController::class, 'create_product']);
});
