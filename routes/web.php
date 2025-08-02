<?php

use App\Http\Controllers\FormSchemaController;
use App\Http\Controllers\ProductController;
use Inertia\Inertia;
use Filament\Http\Middleware\Authenticate as FilamentAuthenticate;


Route::resource('/products', ProductController::class)
    ->only(["index", "show"]);

Route::get('/custom_order', [FormSchemaController::class, 'index']);

Route::middleware([FilamentAuthenticate::class])
    ->group(function () {

        Route::name('admin.form-builder')
            ->get('/admin/form-builder', [FormSchemaController::class, 'edit']);

    });