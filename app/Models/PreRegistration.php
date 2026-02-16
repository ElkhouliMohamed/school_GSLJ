<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PreRegistration extends Model
{
    protected $fillable = [
        'student_last_name',
        'student_first_name',
        'birth_date',
        'requested_class',
        'requested_class',
        'parent_name',
        'email',
        'phone',
        'phone',
        'message',
        'status',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];
}
