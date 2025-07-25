<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{
    SuperCategory,
    Category,
    Product,
    Tag,
    Option,
    OptionAttribute
};

class LocalSeeder extends Seeder
{
    public function run(): void
    {
        // Step 1: Independent Tables
        Tag::factory(10)->create();
        OptionAttribute::factory(10)->create();

        // Step 2: SuperCategory → Category
        SuperCategory::factory(3)->create()->each(function ($superCategory) {
            Category::factory(rand(2, 4))->create([
                'super_category_id' => $superCategory->id,
            ])->each(function ($category) {
                // Step 3: Category → Products
                Product::factory(rand(3, 6))->create([
                    'category_id' => $category->id,
                ])->each(function ($product) {
                    // Attach 1–3 Tags
                    $product->tags()->attach(
                        Tag::inRandomOrder()->take(rand(1, 3))->pluck('id')
                    );

                    // Step 4: Product → Options
                    Option::factory(rand(2, 4))->create([
                        'product_id' => $product->id,
                    ])->each(function ($option) {
                        // Attach OptionAttributes with pivot descriptions
                        OptionAttribute::inRandomOrder()
                            ->take(rand(1, 3))
                            ->each(function ($attribute) use ($option) {
                                $value = match ($attribute->name) {
                                    'Size' => fake()->randomElement(['S', 'M', 'L']),
                                    'Color' => fake()->safeColorName(),
                                    'Pages' => fake()->numberBetween(1, 200),
                                    default => fake()->word(),
                                };

                                $option->optionAttributes()->attach($attribute->id, [
                                    'description' => fake()->boolean(50)
                                        ? 'Override: ' . fake()->sentence()
                                        : $attribute->description,
                                    'value' => $value,
                                ]);
                            });
                    });
                });
            });
        });
    }
}
