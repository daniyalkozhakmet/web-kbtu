<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Role;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessToken;

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
        // event(new Registered($user));
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
        $request->validated($request->only(['firstName', 'lastName', 'email', 'password']));

        $user = User::create([
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ])->sendEmailVerificationNotification();
        $user->roles()->attach(Role::where('name', 'USER')->first());
        event(new Registered($user));
        return new UserResource($user);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function logout(Request $request)
    {

        $request->user()->tokens()->delete();

        return $this->success([
            'message' => 'You have succesfully been logged out and your token has been removed'
        ]);
        //
    }
    public function admin()
    {
        return 'Hello admin';
    }

    public function refresh(Request $request)
    {
        if (empty($token = $request->header('Authorization'))) {
            return response()->json(['message' => 'Token is invalid'], 422);
        }

        $token = explode('Bearer ', $token);

        if (empty($token[1]) || empty($token = PersonalAccessToken::findToken($token[1]))) {
            return response()->json(['message' => 'Token is invalid'], 422);
        }
        if (!$token->tokenable instanceof User) {
            return response()->json(['message' => 'Token is invalid'], 422);
        }
        // $token->tokenable->delete();
        $data = response()->json([
            'status' => 'success',
            'data' => ['token' => $token->tokenable->createToken('access')->plainTextToken]
        ]);
        return $data;
    }
}
