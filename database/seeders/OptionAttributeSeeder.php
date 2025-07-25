<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\OptionAttribute;

class OptionAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        OptionAttribute::factory()
            ->count(15)
            ->create([
                'description' => fn() => fake()->sentence(),
            ]);
    }
}
