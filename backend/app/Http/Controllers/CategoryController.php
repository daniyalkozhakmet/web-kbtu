<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Category;

class CategoryController extends Controller
{
    //
    public function getCategories(){
        $categories=Category::paginate(10);
        return CategoryResource::collection($categories);
    }
    public function getProductsByCategory(string $id){
        $category=Category::where('id',$id)->first();     
        return ProductResource::collection($category->products);
    }
}
