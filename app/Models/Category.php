<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description'];

    public function parent()
    {
        return $this->belongsTo(SuperCategory::class);
    }

    public function products()
    {
        return $this->hasMany(OptionAttribute::class, );
    }

}
