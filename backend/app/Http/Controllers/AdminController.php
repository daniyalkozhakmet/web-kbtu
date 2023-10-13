<?php

namespace App\Http\Controllers;

use App\Http\Requests\adminRequests\ProductCreateRequest;
use App\Http\Resources\ProductWithCommentResource;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    //
    public function create_product(ProductCreateRequest $request)
    {
        $request->validated($request->all());
        $path = Storage::put('public/products', $request->file('image'));
        $path = str_replace("public/", "", $path);
        $product = Product::create([
            "name" => $request->name,
            "price" => $request->price,
            "description" => $request->description,
            "image" => 'storage/' . $path,
        ]);
        $product->categories()->attach(
            $request->categories
        );
        $product->save();

        return new ProductWithCommentResource($product);
    }
}
