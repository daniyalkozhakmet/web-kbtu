<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserAdminResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //
    public function get_users()
    {
        $users = User::paginate(10);
        return  UserAdminResource::collection($users);
    }
    public function get_user_by_id(String $id)
    {
        $users = User::find($id);
        return new UserAdminResource($users);
    }
}
