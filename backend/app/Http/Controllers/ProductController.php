<?php

namespace App\Http\Controllers;

use App\Events\ProductCreated;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;

class ProductController extends Controller
{
    //
    public function getProducts(Request $request)
    {
        Event::dispatch(
            new ProductCreated($request)
        );
        $products = cache('products', function () {
            return Product::paginate(200);
        });
        // $products = Product::paginate(200);
        return ProductResource::collection($products);
    }
}
