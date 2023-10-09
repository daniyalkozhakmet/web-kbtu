<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessEmailVerification;
use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    //

    public function resend(Request $request)
    {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(["msg" => "Email already verified."], 400);
        }

        ProcessEmailVerification::dispatch(auth()->user());

        // auth()->user()->sendEmailVerificationNotification();

        return response()->json(["msg" => "Email verification link sent on your email " . auth()->user()->email." Verify it and login with that email"]);
    }
}
