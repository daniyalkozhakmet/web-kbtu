<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function get_users()
    {
        $users = User::paginate(10);
        return  UserResource::collection($users);
    }
}
