<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Gallery extends Model
{
    use HasFactory, HasTranslations;

    protected $fillable = ['title', 'type', 'path', 'thumbnail', 'gallery_album_id'];

    public $translatable = ['title'];

    public function album()
    {
        return $this->belongsTo(GalleryAlbum::class, 'gallery_album_id');
    }
}
