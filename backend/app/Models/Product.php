<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    use HasFactory;
    protected $table = 'products';
    protected $appends = ['rating'];
    protected $guarded = [];


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
        return $this->comments()->exists() ? $this->comments()->get()->sum('rating') / $this->comments()->get()->count() : 5;
    }
}
