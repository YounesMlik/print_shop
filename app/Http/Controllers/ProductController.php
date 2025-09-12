<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Tag;
use App\Models\Category;
use App\Models\SuperCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $sort = $request->string('sort', 'popular');
        $dir = $request->string('dir', 'desc');

        $tagIds = $request->input('tags', []);


        $products = Product::query()
            ->withCommonRelations()
            ->filterTags($tagIds)
            ->applySort($sort, $dir)
            ->paginate(12)
            ->withQueryString(); // Keeps the query parameters (e.g., tags) in the pagination links

        return Inertia::render('Products/Index', [
            'products_collection' => $products->toResourceCollection(),
            'available_tags' => Tag::select('id', 'name')->get()->toResourceCollection(),
            'current_tags' => Tag::whereIn('id', $tagIds)->get()->toResourceCollection(),
        ]);
    }




    public function show(Product $product)
    {
        $product->load(['options.optionAttributes', 'media', 'category', 'category.superCategory', 'tags']);
        views($product)->record();

        return Inertia::render('Products/Show', [
            'product_resource' => $product->toResource(),
        ]);
    }
}
