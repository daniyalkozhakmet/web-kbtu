<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function login(LoginUserRequest $request)
    {


        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::where('email', $request->email)->first();
        return new UserResource($user);
        // return $this->success([
        //     'user' => $user,
        //     'role' => $user->roles,
        //     'token' => $user->createToken('API Token')->plainTextToken
        // ]);
        //
    }
    public function register(StoreUserRequest $request)
    {
        $request->validated($request->only(['firstName','lastName', 'email', 'password']));

        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->roles()->attach(Role::where('name', 'USER')->first());
        return new UserResource($user);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You have succesfully been logged out and your token has been removed'
        ]);
        //
    }
    public function admin()
    {
        return 'Hello admin';
    }
}
