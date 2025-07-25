<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Option;
use App\Models\OptionAttribute;
use App\Models\Product;
use App\Models\SuperCategory;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SuperCategory::factory(3)->create()->each(function ($superCategory) {
            Category::factory(rand(2, 4))->create([
                'super_category_id' => $superCategory->id,
            ])->each(function ($category) {
                Product::factory(rand(2, 4))->create([
                    'category_id' => $category->id,
                ])->each(function ($product) {
                    $tags = Tag::inRandomOrder()->take(2)->pluck('id');
                    $product->tags()->attach($tags);

                    Option::factory(rand(2, 3))->create([
                        'product_id' => $product->id,
                    ])->each(function ($option) {
                        $attributes = OptionAttribute::inRandomOrder()->take(3)->get();

                        foreach ($attributes as $attribute) {
                            $option->optionAttributes()->attach($attribute->id, [
                                'description' => fake()->sentence(),
                            ]);
                        }
                    });
                });
            });
        });

        Tag::factory(10)->create();
        OptionAttribute::factory(10)->create();
    }
}
