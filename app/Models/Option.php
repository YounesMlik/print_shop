<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'product_id', 'price'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function optionAttributes()
    {
        return $this->belongsToMany(OptionAttribute::class)
            ->using(OptionOptionAttribute::class)
            ->withPivot('description')
            ->withPivot('value')
            ->withTimestamps();
    }

    public function optionAttributeLinks()
    {
        return $this->hasMany(OptionOptionAttribute::class);
    }

}
