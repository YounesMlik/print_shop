<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            SuperCategorySeeder::class,
            CategorySeeder::class,
            TagSeeder::class,
            OptionAttributeSeeder::class,
            ProductSeeder::class,
            OptionSeeder::class,
        ]);
    }
}
