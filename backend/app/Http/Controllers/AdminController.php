<?php

namespace App\Http\Controllers;

use App\Http\Requests\adminRequests\ProductCreateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminController extends Controller
{
    //
    public function create_product(ProductCreateRequest $request)
    {
        $request->validated($request->all());
        Storage::put('public/products', $request->image);
        // $request->file('image')->storePublicly('products', ['disk' => 'public']);
        
        return $request->file('image');
    }
}
