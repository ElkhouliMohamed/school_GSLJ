<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kpi extends Model
{
    protected $fillable = [
        'type',
        'path',
        'element_id',
        'ip_address',
        'user_agent',
        'country_code',
        'country_name',
    ];
}
