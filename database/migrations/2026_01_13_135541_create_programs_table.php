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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // e.g., {"en": "Preschool", "fr": "Préscolaire"}
            $table->string('slug')->unique();
            $table->string('level'); // preschool, elementary, middle, secondary
            $table->json('description')->nullable();
            $table->json('objectives')->nullable(); // JSON array of objectives
            $table->json('curriculum')->nullable(); // JSON array of curriculum items
            $table->string('image')->nullable();
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
        Schema::dropIfExists('programs');
    }
};
