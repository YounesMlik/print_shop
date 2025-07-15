<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class OptionOptionAttribute extends Pivot
{
    protected $table = 'option_option_attribute';

    protected $fillable = [
        'option_id',
        'option_attribute_id',
        'description',
    ];
}
