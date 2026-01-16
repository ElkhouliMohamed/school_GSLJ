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
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // e.g., {"en": "John Doe", "fr": "John Doe"}
            $table->string('slug')->unique();
            $table->json('position')->nullable(); // e.g., {"en": "Principal", "fr": "Directeur"}
            $table->string('department')->nullable(); // teaching, administration, support
            $table->json('bio')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('photo')->nullable();
            $table->json('qualifications')->nullable(); // JSON array of qualifications
            $table->json('specialties')->nullable(); // JSON array of specialty areas
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
        Schema::dropIfExists('team_members');
    }
};
