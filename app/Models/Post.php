<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Post extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'type',
        'title',
        'content',
        'slug',
        'image',
        'is_published',
        'published_at',
        'start_date',
        'end_date',
        'location',
        'organizer',
        'gallery'
    ];

    public $translatable = ['title', 'content'];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'gallery' => 'array',
    ];
}
