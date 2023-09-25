<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    public function getProducts(){
        $products=Product::paginate(10);
        return ProductResource::collection($products);
    }
}
