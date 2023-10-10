<?php

namespace Tests\Feature;

use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CommentTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_create_comment(): void
    {
        $product = Product::create(Product::factory()->make()->getAttributes());
        Sanctum::actingAs(
            $user = User::create(User::factory()->make()->getAttributes()),
            ['*']
        );
        $payload = [
            'body' => 'body',
            'rating'  => 5,
            'user_id'      => 1,
            'product_id'      => 1
        ];
        $this->post("api/comment/$product->id", $payload)->assertExactJson([
            'data' => [
                'id' => 1,
                'body' => $payload['body'],
                'rating' => $payload['rating'],
                'user' => $user->firstName . ' ' . $user->lastName,
            ]
        ]);
    }
}
