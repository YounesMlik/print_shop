<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Option;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Option>
 */
final class OptionFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = Option::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'product_id' => \App\Models\Product::factory(),
            'name'        => fakeLocalize(fake()->unique()->words(2, true)),
            'description' => fakeLocalize(fake()->optional()->sentence()),
            'price'       => fake()->randomFloat(2, 10, 100),
        ];
    }
}
