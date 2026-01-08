<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Gallery extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = ['title', 'type', 'path', 'thumbnail'];

    public $translatable = ['title'];
}
