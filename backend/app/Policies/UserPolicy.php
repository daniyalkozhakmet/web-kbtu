<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }
    // public function update(User $user, Post $post): bool
    // {
    //     return $user->id === $post->user_id;
    // }
}
