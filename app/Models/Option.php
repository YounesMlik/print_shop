<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = ['name', 'description'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function optionAttributes()
    {
        return $this->belongsToMany(OptionAttribute::class);
    }

}
