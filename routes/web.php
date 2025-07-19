<?php

use App\Http\Controllers\ProductController;


Route::get('/', [ProductController::class, 'index'])
    ->name('products.index');

Route::get('/products/{product}', [ProductController::class, 'show'])
    ->name('products.show');
