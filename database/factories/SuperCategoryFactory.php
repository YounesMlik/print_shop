<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\SuperCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\SuperCategory>
 */
final class SuperCategoryFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = SuperCategory::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'name'        => fakeLocalize(fake()->unique()->words(2, true)),
            'description' => fakeLocalize(fake()->optional()->sentence()),
        ];
    }
}
