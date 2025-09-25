<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('option_option_attribute', function (Blueprint $table) {
            $table->id();
            $table->foreignId('option_id')->constrained()->cascadeOnDelete();
            $table->foreignId('option_attribute_id')->constrained()->cascadeOnDelete();
            $table->jsonb('description')->nullable();
            $table->jsonb("value");
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('option_option_attribute');
    }
};
