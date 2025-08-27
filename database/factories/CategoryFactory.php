<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\Category>
 */
final class CategoryFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = Category::class;

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
            'super_category_id' => \App\Models\SuperCategory::factory(),
            'name'        => ['fr' => $name, 'ar' => $name],
            'description' => $desc ? ['fr' => $desc, 'ar' => $desc] : null,
        ];
    }
}
