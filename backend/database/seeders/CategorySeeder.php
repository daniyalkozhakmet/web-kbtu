<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Category::create([
            'name' => 'Smartphones',
            'image'=>'storage/categories/smartphone.webp'
        ]);
        Category::create([
            'name' => 'Laptops',
            'image'=>'storage/categories/notebook.webp'
        ]);
        Category::create([
            'name' => 'Smartwatches',
            'image'=>'storage/categories/watch.webp'
        ]);
        Category::create([
            'name' => 'Tablets',
            'image'=>'storage/categories/pad.webp'
        ]);
        Category::create([
            'name' => 'Headphones',
            'image'=>'storage/categories/headphones.webp'
        ]);
        Category::create([
            'name' => 'Appliances',
            'image'=>'storage/categories/tech.webp'
        ]);
    }
}
