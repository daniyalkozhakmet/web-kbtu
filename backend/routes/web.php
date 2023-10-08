<?php

use App\Http\Controllers\ProfileController;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('verify-email/{id}/{hash}', function ($id, $hash) {

    $user = User::find($id);
    abort_if(!$user, 403);
    abort_if(!hash_equals($hash, sha1($user->getEmailForVerification())), 403);
    if (!$user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        event(new Verified($user));
    }
    return view('verified-account');
})->name('verification.verify');
