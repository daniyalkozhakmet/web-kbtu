<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $appends = ['rating'];
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'category_product');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function getRatingAttribute()
    {
    return 5;
    }
}
