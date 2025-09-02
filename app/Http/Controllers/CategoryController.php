<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    function show(Request $request, Category $category)
    {
        $sort = $request->string('sort', 'popular');
        $dir = $request->string('dir', 'desc');

        $tagIds = $request->input('tags', []);


        $products = Product::query()
            ->withCommonRelations()
            ->filterTags($tagIds)
            ->filterCategory($category->id)
            ->applySort($sort, $dir)
            ->paginate(12)
            ->withQueryString(); // Keeps the query parameters (e.g., tags) in the pagination links

        return Inertia::render('Category/Show', [
            'products_collection' => $products->toResourceCollection(),
            'available_tags' => Tag::select('id', 'name')->get()->toResourceCollection(),
            'current_tags' => Tag::whereIn('id', $tagIds)->get()->toResourceCollection(),
            'category_resource' => $category->toResource(),
        ]);
    }
}
