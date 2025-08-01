<?php

use App\Http\Controllers\ProductController;
use Inertia\Inertia;


Route::resource('/products', ProductController::class)
    ->only(["index", "show"]);

Route::get('/custom_order', function () {
    return Inertia::render('CustomOrder/Index', []);
});

Route::get('/form_builder', function () {
    return Inertia::render('CustomOrder/Edit', []);
});