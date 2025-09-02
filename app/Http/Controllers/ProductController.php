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
        $categoryId = $request->input('category');
        $superCategoryId = $request->input('super_category');

        if ($categoryId) {
            $category = Category::with('superCategory')->find($categoryId);
            $superCategory = $category->superCategory;
            $category_filtering_level = 2;
        } elseif ($superCategoryId) {
            $category = null;
            $superCategory = SuperCategory::find($superCategoryId);
            $category_filtering_level = 1;
        } else {
            $category = null;
            $superCategory = null;
            $category_filtering_level = 0;
        }


        $products = Product::query()
            ->withCommonRelations()
            ->filterTags($tagIds)
            ->filterCategory($categoryId)
            ->filterSuperCategory($superCategoryId)
            ->applySort($sort, $dir)
            ->paginate(12)
            ->withQueryString(); // Keeps the query parameters (e.g., tags) in the pagination links

        return Inertia::render('Products/Index', [
            'products_collection' => $products->toResourceCollection(),
            'available_tags' => Tag::select('id', 'name')->get()->toResourceCollection(),
            'current_tags' => Tag::whereIn('id', $tagIds)->get(['id as value', 'name as label'])->toResourceCollection(),
            'category_filtering_level' => $category_filtering_level,
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
