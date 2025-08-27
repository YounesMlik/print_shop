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
        $name = fake()->unique()->words(2, true);
        $desc = fake()->optional()->sentence();

        return [
            'product_id' => \App\Models\Product::factory(),
            'name'        => ['fr' => $name, 'ar' => $name],
            'description' => $desc ? ['fr' => $desc, 'ar' => $desc] : null,
            'price'       => fake()->randomFloat(2, 10, 100),
        ];
    }
}
