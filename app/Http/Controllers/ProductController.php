<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $tagIds = $request->input('tags', []);

        $products = Product::with('tags')
            ->when(
                !empty($tagIds),
                fn($query) =>
                $query->whereHas(
                    'tags',
                    fn($q) =>
                    $q->whereIn('tags.id', $tagIds)
                )
            )
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'availableTags' => Tag::select('id', 'name')->get(),
            'filters' => [
                'tags' => Tag::whereIn('id', $tagIds)->get(['id as value', 'name as label']),
            ],
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
