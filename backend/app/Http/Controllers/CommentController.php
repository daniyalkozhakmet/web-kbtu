<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    public function getCommentByProduct(String $product_id)
    {
        $comments = Comment::where('product_id', $product_id)->paginate(1)->sortBy('created_at');
        return CommentResource::collection($comments);
    }
    public function createComment(CommentRequest $request, String $product_id)
    {
        $request->validated($request->only(['rating', 'body']));

        $comment = Comment::create([
            'rating' => $request->rating,
            'body' => $request->body,
            'user_id' => $request->user()->id,
            'product_id' => $product_id,
        ]);
        return new CommentResource($comment);
    }
}
