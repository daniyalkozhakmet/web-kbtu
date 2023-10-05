<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Comment;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();
        Product::factory(200)->create([
            'image' => 'image'
        ]);
        Comment::factory(500)->create();
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            ProductSeeder::class,
            CommentSeeder::class,
        ]);
        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
