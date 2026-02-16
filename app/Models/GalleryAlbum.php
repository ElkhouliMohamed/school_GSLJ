<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class GalleryAlbum extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = ['title', 'slug', 'description', 'cover_image'];

    public $translatable = ['title', 'description'];

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }
}
