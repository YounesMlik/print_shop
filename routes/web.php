<?php

use App\Http\Controllers\ProductController;
use Inertia\Inertia;
use Filament\Http\Middleware\Authenticate as FilamentAuthenticate;


Route::resource('/products', ProductController::class)
    ->only(["index", "show"]);

Route::get('/custom_order', function () {
    return Inertia::render('CustomOrder/Index', []);
});

Route::prefix('admin')
    ->name('admin.')
    ->middleware([FilamentAuthenticate::class])
    ->group(function () {
        Route::name('form-builder')
            ->get('/form-builder', function () {
                return Inertia::render('CustomOrder/Edit', []);
            });
    });;