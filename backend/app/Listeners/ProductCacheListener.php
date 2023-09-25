<?php

namespace App\Listeners;

use App\Models\Product;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Cache;

class ProductCacheListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        //
        $page = app('request')->get('page', 1);
        $limit = app('request')->get('limit', 10);

        // $users = Cache::remember('admin' . $page, 10, function () use ($limit) {
        //     return DB::table('users')->paginate($limit);
        // });

        Cache::forget('products');

        Cache::remember('products'.$page , 10, function () use ($limit) {
            return Product::paginate($limit);
        });
    }
}
