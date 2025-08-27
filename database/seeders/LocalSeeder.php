<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;
use App\Models\Product;
use App\Models\Option;
use App\Models\Category;
use App\Models\SuperCategory;
use App\Models\OptionAttribute;

class LocalSeeder extends Seeder
{
    public function run(): void
    {
        // Step 1: Independent tables
        Tag::factory(10)->create();
        OptionAttribute::factory(10)->create();

        // Step 2: SuperCategory → Category
        SuperCategory::factory(3)->create()->each(function (SuperCategory $superCategory) {
            Category::factory(rand(2, 4))->create([
                'super_category_id' => $superCategory->id,
            ])->each(function (Category $category) {
                // Step 3: Category → Products
                Product::factory(rand(3, 6))->create([
                    'category_id' => $category->id,
                ])->each(function (Product $product) {
                    // Attach 1–3 tags
                    $product->tags()->attach(
                        Tag::inRandomOrder()->limit(rand(1, 3))->pluck('id')->all()
                    );

                    // Step 4: Product → Options
                    Option::factory(rand(2, 4))->create([
                        'product_id' => $product->id,
                    ])->each(function (Option $option) {
                        // Attach 1–3 option attributes with pivot data
                        OptionAttribute::inRandomOrder()
                            ->limit(rand(1, 3))
                            ->get()
                            ->each(function (OptionAttribute $attribute) use ($option) {
                                $value = ([
                                    fn() => fake()->word(),
                                    fn() => (string) fake()->numberBetween(1, 200),
                                    fn() => fake()->randomElement(['S', 'M', 'L', 'XL']),
                                    fn() => fake()->safeColorName(),
                                ])[array_rand([0, 1, 2, 3])]();

                                $desc = fake()->optional()->sentence();
                                $pivotDescription = $desc ? ['fr' => $desc, 'ar' => $desc] : null;
                                $pivotValue = $value ? ['fr' => $value, 'ar' => $value] : null;
                                $option->optionAttributes()->attach($attribute->id, [
                                    'description' => $pivotDescription, // jsonb
                                    'value' => $pivotValue,            // jsonb
                                ]);
                            });
                    });
                });
            });
        });
    }
}
