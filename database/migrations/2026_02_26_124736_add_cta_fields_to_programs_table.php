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
        Schema::table('programs', function (Blueprint $table) {
            $table->json('cta_title')->nullable()->after('gallery_images');
            $table->json('cta_description')->nullable()->after('cta_title');
            $table->string('cta_image')->nullable()->after('cta_description');
            $table->string('cta_file')->nullable()->after('cta_image');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('programs', function (Blueprint $table) {
            $table->dropColumn(['cta_title', 'cta_description', 'cta_image', 'cta_file']);
        });
    }
};
