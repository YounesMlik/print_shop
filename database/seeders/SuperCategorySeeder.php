<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SuperCategory;
use App\Models\Category;

class SuperCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SuperCategory::all()->each(function ($sc) {
            Category::factory()->count(rand(3, 5))->create([
                'super_category_id' => $sc->id,
            ]);
        });
    }
}
