<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductWithCommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $per_page = 2;
        $current_page = $request->query('page');
        $comments = $this->comments()->orderBy('created_at', 'desc')->paginate($per_page);
        $total_page = ceil($this->comments()->count() / $per_page);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->image,
            'price' => $this->price,
            'rating' => $this->rating,
            'description' => $this->description,
            'categories' => CategoryResource::collection($this->categories),
            'comments' => CommentResource::collection($comments),
            'meta' => [
                "current_page" => $current_page ?? 1,
                "total_page" => $total_page,
                "per_page" => $per_page,
            ],
        ];
    }
    // public function with($request)
    // {
    //     return [
    //         'meta' => [
    //             "current_page" => 1,
    //             "total_page" => $total_page,
    //         ],
    //     ];
    // }
}
