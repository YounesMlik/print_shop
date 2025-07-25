<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Tag;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = Tag::all();

        Category::all()->each(function ($category) use ($tags) {
            Product::factory()
                ->count(5)
                ->create(['category_id' => $category->id])
                ->each(function ($product) use ($tags) {
                    // Attach a variety of tags
                    $product->tags()->attach($tags->random(rand(1, 3))->pluck('id'));
                });
        });
    }
}
