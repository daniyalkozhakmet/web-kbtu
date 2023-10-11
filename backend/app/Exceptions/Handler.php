<?php

namespace App\Exceptions;

use Error;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof Error) {
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        }
        return parent::render($request, $exception);
    }
    public function register(): void
    {
        $this->renderable(function (Throwable $e, $request) {
            // if ($request->is('api/*')) {
            //     return response()->json([
            //         'error' => $e->getMessage(),
            //         'code' => $e->getCode(),
            //     ], 404);
            // }
        });
    }
}
