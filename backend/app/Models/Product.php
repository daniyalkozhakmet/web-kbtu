<?php

namespace App\Models;

use App\Events\ProductCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $dispatchesEvent=[
        'created'=>ProductCreated::class
    ];
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_product','category_id','product_id');
    }
}
