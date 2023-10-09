<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Response;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_get_products(): void
    {
        $this->withoutExceptionHandling();
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
        $product = Product::create(Product::factory()->make()->getAttributes());
        $category = Category::create([
            'name' => 'Smartphones',
            'image' => 'storage/categories/smartphone.webp'
        ]);
        $product->categories()->attach(
            $category->pluck('id')->toArray()
        );

        $this->get("api/products/$product->id")
            ->assertExactJson(
                [
                    'data' =>  [
                        'id' => $product->id,
                        'name' => $product->name,
                        'image' => $product->image,
                        'price' => $product->price,
                        'rating' => $product->rating,
                        'description' => $product->description,
                        'categories' => [
                            [
                                "id" => $product->categories[0]->id,
                                "name" => $product->categories[0]->name,
                                "image" => $product->categories[0]->image,
                            ]
                        ],
                        "comments" => [],
                        "meta" => [
                            "current_page" => 1,
                            "per_page" => 2,
                            "total_page" => 0
                        ]
                    ]

                ]
            );
    }
}
