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

        $products = Product::with('tags', 'category', 'category.superCategory', 'media', )
            ->when(!empty($tagIds), function ($query) use ($tagIds) {
                foreach ($tagIds as $tagId) {
                    $query->whereHas('tags', fn($q) => $q->where('tags.id', $tagId));
                }
            })
            ->when(
                $categoryId,
                fn($query) =>
                $query->where('category_id', $categoryId)
            )
            ->when(
                $superCategoryId,
                fn($query) =>
                $query->whereHas(
                    'category',
                    fn($q) =>
                    $q->where('super_category_id', $superCategoryId)
                )
            )
            ->paginate(12) // You can change 12 to whatever per-page size you prefer
            ->withQueryString(); // Keeps the query parameters (e.g., tags) in the pagination links

        return Inertia::render('Products/Index', [
            'products_collection' => $products->toResourceCollection(),
            'availableTags' => Tag::select('id', 'name')->get()->toResourceCollection(),
            'filters' => [
                'category' => $category?->toResource(),
                'super_category' => $superCategory?->toResource(),
                'tags' => Tag::whereIn('id', $tagIds)->get(['id as value', 'name as label'])->toResourceCollection(),
            ],
            'category_filtering_level' => $category_filtering_level,
        ]);
    }




    public function show(Product $product)
    {
        $product->load(['options.optionAttributes', 'media', 'category', 'category.superCategory', 'tags']);

        return Inertia::render('Products/Show', [
            'product_resource' => $product->toResource(),
        ]);
    }
}
