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
    protected $comment;
    public function __construct(CommentController $comment)
    {
        $this->comment = $comment;
    }
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

        $product = Product::where('id', $id)->first();
        // $product->comments = $this->comment->getCommentByProduct($product->id);
        return new ProductWithCommentResource($product);
    }
    public function createProduct()
    {
    }
    public function error_handler($message = 'Server error', $status = 500)
    {
        return response()->json(['message' => $message], $status);
    }
}
