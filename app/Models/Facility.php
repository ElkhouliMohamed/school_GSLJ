<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Facility extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
        'details',
        'images',
        'icon',
        'order',
        'is_active'
    ];

    public $translatable = ['name', 'description', 'details'];

    protected $casts = [
        'is_active' => 'boolean',
        'details' => 'array',
        'images' => 'array',
    ];
}
