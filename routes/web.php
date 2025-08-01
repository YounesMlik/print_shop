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
    ->middleware([FilamentAuthenticate::class])
    ->group(function () {
        Route::get('/form-builder', function () {
            return Inertia::render('CustomOrder/Edit', []);
        });
    });