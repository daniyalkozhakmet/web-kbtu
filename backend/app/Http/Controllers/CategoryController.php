<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryController extends Controller
{
    //
    public function getCategories()
    {
        $categories = Category::paginate(10);
        return CategoryResource::collection($categories);
    }
    public function getProductsByCategory(string $id)
    {
        // if (Cache::has('productsByCategory'.request('page',1))) {
        //     $products = Cache::get('productsByCategory'.request('page',1));
        //     return ProductResource::collection($products);
        // }
        // $products=Cache::remember('products'.request('page',1),60*3,function(){
        //     return Product::paginate(10);
        // });
        $category = Category::where('id', $id)->first();
        // $product=Category::find('id', $id)->products();
        return ProductResource::collection($category->products()->paginate(10));
    }
}
