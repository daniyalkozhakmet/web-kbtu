<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {       
                $role_admin = Role::where('name', 'ADMIN')->first();
                $role_user = Role::where('name', 'USER')->first();
                $user_admin = User::create([
                    'firstName' => 'Daniyal',
                    'lastName' => 'Kozhakmetov',
                    'email' => 'admin@gmail.com',
                    "password" => Hash::make('12345678'),
                ]);
                $user_admin->roles()->attach($role_admin);
                $user_user = User::create([
                    'firstName' => 'Jhon',
                    'lastName' => 'Doe',
                    'email' => 'jhon@gmail.com',
                    "password" => Hash::make('12345678'),
                ]);
                $user_user->roles()->attach($role_user);
    }
}
