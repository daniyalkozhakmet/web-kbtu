<?php

namespace App\Exceptions;

use Error;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Laravel\Sanctum\Exceptions\MissingAbilityException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof Error) {
            return response()->json([
                'message' => 'Data not found'
            ], 404);
        }
        if ($exception instanceof MissingAbilityException) {
            return response()->json([
                'message' => 'You do not have permission'
            ], 400);
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
