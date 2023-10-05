<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categories = Category::all();
        foreach (Product::all() as $product) {
            $imageNames = ['sample1', 'sample2', 'sample3', 'sample4'];
            $product->image = 'storage/products/' . $imageNames[array_rand($imageNames)] . '.webp';
            // $product->rating = $product->comments()->get()->sum('rating');
            $product->categories()->attach(
                $categories->random(rand(1, count($categories)))->pluck('id')->toArray()
            );
            $product->save();
        }
    }
}
