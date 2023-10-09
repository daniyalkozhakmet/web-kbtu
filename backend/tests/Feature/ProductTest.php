<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Http\Response;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_get_products(): void
    {
        $this->get('api/products')
            ->assertJsonStructure(
                [
                    'data' => [
                        '*' => [
                            'id',
                            'name',
                            'image',
                            'price',
                            'rating',
                            'description',
                            'categories' => [
                                '*' => [
                                    "id",
                                    "name",
                                    "image",
                                ]
                            ]
                        ]
                    ]
                ]
            );
    }
    public function test_get_product_by_id(): void
    {
        $product = Product::create(Product::factory()->make());
        $this->get('api/products/' . $product->id)
            ->assertJsonStructure(
                [
                    'data' =>  [
                        'id',
                        'name',
                        'image',
                        'price',
                        'rating',
                        'description',
                        'categories' => [
                            '*' => [
                                "id",
                                "name",
                                "image",
                            ]
                        ]
                    ]

                ]
            );
    }
}
