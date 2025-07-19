<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('tags', 'category')->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product)
    {
        $product->load('options.optionAttributes');

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
}
