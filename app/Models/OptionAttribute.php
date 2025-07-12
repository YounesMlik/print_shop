<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OptionAttribute extends Model
{
    protected $fillable = ['name', 'description'];

    public function options()
    {
        return $this->belongsToMany(Option::class);
    }

}
