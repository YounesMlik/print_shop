<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Option;
use App\Models\Product;
use App\Models\OptionAttribute;

class OptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $attributes = OptionAttribute::all();

        Product::all()->each(function ($product) use ($attributes) {
            Option::factory()
                ->count(rand(2, 4)) // More variety
                ->create(['product_id' => $product->id])
                ->each(function ($option) use ($attributes) {
                    $attributes->random(3)->each(function ($attribute) use ($option) {
                        $option->optionAttributes()->attach($attribute->id, [
                            'description' => fake()->boolean(70)
                                ? 'Override: ' . fake()->sentence()
                                : $attribute->description,
                        ]);
                    });
                });
        });
    }
}
