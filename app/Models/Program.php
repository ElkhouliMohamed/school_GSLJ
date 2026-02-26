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
        'bg_image',
        'gallery_images',
        'cta_title',
        'cta_description',
        'cta_image',
        'cta_file',
        'order',
        'is_active'
    ];

    public $translatable = ['name', 'description', 'objectives', 'curriculum', 'cta_title', 'cta_description'];

    protected $casts = [
        'is_active' => 'boolean',
        'gallery_images' => 'array',
    ];
}
