<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class TeamMember extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = [
        'name',
        'slug',
        'position',
        'department',
        'bio',
        'email',
        'phone',
        'photo',
        'qualifications',
        'specialties',
        'order',
        'is_active'
    ];

    public $translatable = ['name', 'position', 'bio', 'qualifications', 'specialties'];

    protected $casts = [
        'is_active' => 'boolean',
        'qualifications' => 'array',
        'specialties' => 'array',
    ];
}
