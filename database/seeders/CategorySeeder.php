<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\SuperCategory;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superCategories = SuperCategory::all();

        foreach ($superCategories as $sc) {
            Category::factory()->count(5)->create([
                'super_category_id' => $sc->id,
            ]);
        }
    }
}
