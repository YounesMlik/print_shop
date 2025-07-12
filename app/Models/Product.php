<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description'];

    public function options()
    {
        return $this->hasMany(OptionAttribute::class, );
    }

    public function tags()
    {
        return $this->belongsToMany(OptionAttribute::class, );
    }

}
