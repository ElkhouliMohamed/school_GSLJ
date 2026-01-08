<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->json('name'); // Translatable: {en: '', fr: ''}
            $table->string('logo'); // Path to logo image
            $table->string('url')->nullable(); // Partner website URL
            $table->integer('order')->default(0); // Display order
            $table->boolean('is_active')->default(true); // Visibility toggle
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};
