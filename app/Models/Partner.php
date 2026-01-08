<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Partner extends Model
{
    use HasTranslations;

    protected $fillable = ['name', 'logo', 'url', 'order', 'is_active'];

    public $translatable = ['name'];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope to get only active partners
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope to order partners by order field
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }
}
