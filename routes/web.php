<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FormSchemaController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SuperCategoryController;
use Inertia\Inertia;
use Filament\Http\Middleware\Authenticate as FilamentAuthenticate;


Route::get('/locale/{locale}', function (string $locale) {
    session(['locale' => $locale]);
    return back();
})->name('locale.switch');

Route::get("/", function () {
    return Inertia::render("Home/Index");
})->name('home.index');

Route::resource('/products', ProductController::class)
    ->only(["index", "show"]);

Route::resource('/super-categories', SuperCategoryController::class)
    ->only(["show"]);

Route::resource('/categories', CategoryController::class)
    ->only(["show"]);

Route::get('/custom_order', [FormSchemaController::class, 'index'])
    ->name('custom_order.index');

Route::middleware([FilamentAuthenticate::class])
    ->group(function () {

        Route::name('admin.form-builder')
            ->get('/admin/form-builder', [FormSchemaController::class, 'edit']);

    });


// Route::get('/test', function () {
//     dd(1);
//     return 1;
// });