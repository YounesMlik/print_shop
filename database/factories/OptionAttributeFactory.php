<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\OptionAttribute;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\OptionAttribute>
 */
final class OptionAttributeFactory extends Factory
{
    /**
    * The name of the factory's corresponding model.
    *
    * @var string
    */
    protected $model = OptionAttribute::class;

    /**
    * Define the model's default state.
    *
    * @return array
    */
    public function definition(): array
    {
        return [
            'name' => fake()->name,
            'description' => fake()->optional()->text,
        ];
    }
}
