<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\OptionOptionAttribute;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<\App\Models\OptionOptionAttribute>
 */
final class OptionOptionAttributeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = OptionOptionAttribute::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        $generators = [
            fn() => fake()->word(),
            fn() => (string) fake()->numberBetween(1, 200),
            fn() => fake()->randomElement(['S', 'M', 'L', 'XL']),
            fn() => fake()->safeColorName(),
        ];
        $value = $generators[array_rand($generators)]();

        return [
            'id' => fake()->randomNumber(),
            'option_id' => \App\Models\Option::factory(),
            'option_attribute_id' => \App\Models\OptionAttribute::factory(),
            'description' => fakeLocalize(fake()->optional()->sentence()),
            'value' => fakeLocalize($value),
        ];
    }
}
