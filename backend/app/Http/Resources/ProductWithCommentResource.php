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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'image' => $this->image,
            'price' => $this->price,
            'rating' => $this->comments()->exists() ? $this->comments()->get()->sum('rating')/$this->comments()->get()->count() : 5,
            'description' => $this->description,
            'categories' => CategoryResource::collection($this->categories),
            'comments' => CommentResource::collection($this->comments)
        ];
    }
}
