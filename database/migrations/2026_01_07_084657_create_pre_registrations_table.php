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
        Schema::create('pre_registrations', function (Blueprint $table) {
            $table->id();
            $table->string('student_last_name');
            $table->string('student_first_name');
            $table->date('birth_date');
            $table->string('requested_class');
            $table->string('parent_name');
            $table->string('phone');
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'contacted', 'enrolled', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_registrations');
    }
};
