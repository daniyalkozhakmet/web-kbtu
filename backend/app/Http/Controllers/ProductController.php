<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    //
    public function getProducts(){
        if (Cache::has('products'.request('page',1))) {
            $products = Cache::get('products'.request('page',1));
            return ProductResource::collection($products);
        }
        $products=Cache::remember('products'.request('page',1),60*3,function(){
            return Product::paginate(10);
        });
        
        return ProductResource::collection($products);
    }
    public function createProduct(){

    }
}
