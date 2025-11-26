<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Middleware\HandleCors;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {

        $middleware->web([
            StartSession::class, // tambahkan ini
        ]);

        $middleware->statefulApi()
            ->append(EnsureFrontendRequestsAreStateful::class)
            ->append(HandleCors::class)
            ->append(StartSession::class);  // wajib untuk Sanctum session
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
