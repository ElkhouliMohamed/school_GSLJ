<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('facilities', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // e.g., {"en": "Transportation", "fr": "Transport"}
            $table->string('slug')->unique();
            $table->string('type'); // transport, catering, uniform, lab, infrastructure, regulations
            $table->json('description')->nullable();
            $table->json('details')->nullable(); // JSON array of detail items
            $table->json('images')->nullable(); // JSON array of image paths
            $table->string('icon')->nullable(); // Icon class or path
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facilities');
    }
};
