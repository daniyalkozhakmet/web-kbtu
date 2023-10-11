<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $isAdmin = $this->roles->contains(function ($value, int $key) {
            return $value->name == 'ADMIN';
        });
        return [
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'email' => $this->email,
            'verified' => $this->email_verified_at != null ? true : false,
            'token' => $this->createToken('access', $isAdmin ? ['server:admin'] : ['server:user'])->plainTextToken
        ];
    }
}
