<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Program extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'name',
        'slug',
        'level',
        'description',
        'objectives',
        'curriculum',
        'image',
        'order',
        'is_active'
    ];

    public $translatable = ['name', 'description', 'objectives', 'curriculum'];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
