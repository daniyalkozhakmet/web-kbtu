<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imageNames=['sample1','sample2','sample3','sample4'];
        return [
            'name' => fake()->name(),
            'price' => fake()->biasedNumberBetween($min = 10, $max = 200, $function = 'sqrt'),
            // 'rating' => fake()->biasedNumberBetween($min = 1, $max = 5, $function = 'sqrt'),
            'description' => fake()->paragraph(),
            'image'=>'image'
        ];
    }
}
