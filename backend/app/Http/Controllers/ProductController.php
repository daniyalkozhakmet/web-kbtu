<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductWithCommentResource;
use App\Models\Comment;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;
use Throwable;

class ProductController extends Controller
{
    //
    public function getProducts()
    {
        if (Cache::has('products' . request('page', 1))) {
            $products = Cache::get('products' . request('page', 1));
            return ProductResource::collection($products);
        }
        $products = Cache::remember('products' . request('page', 1), 60 * 3, function () {
            return Product::paginate(10);
        });

        return ProductResource::collection($products);
    }
    public function getProductById(String $id)
    {
        try {
            $product = Product::where('id', $id)->first();
            return new ProductWithCommentResource($product);
        } catch (Exception $e) {
            $this->error_handler('Product with that id does not exist', 400);
        }
    }
    public function createProduct()
    {
    }
    public function error_handler($message = 'Server error', $status = 500)
    {
        return response()->json(['message' => $message], $status);
    }
}
