<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Tag;
use App\Models\Category;
use App\Models\SuperCategory;
use CyrildeWit\EloquentViewable\Support\Period;
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

        $query = Product::with('tags', 'category', 'category.superCategory', 'media', )
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
            );


        // Apply sort
        switch ($sort) {
            case 'alpha':
                // If name is translatable JSON, swap this for a JSON_EXTRACT orderByRaw on the current locale.
                $query->orderBy('name', reverseDir($dir));
                break;

            case 'date':
                $query->orderBy('created_at', $dir); // newest first
                break;

            case 'popular':
            default:
                // All-time if $days <= 0, else last X days
                // Scope provided by eloquent-viewable
                $query->orderByViews($dir, Period::pastDays(7));
                break;
        }

        $products = $query
            ->paginate(12)
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
        views($product)->record();

        return Inertia::render('Products/Show', [
            'product_resource' => $product->toResource(),
        ]);
    }
}


function reverseDir($direction)
{
    return $direction === 'asc' ? 'desc' : 'asc';
}