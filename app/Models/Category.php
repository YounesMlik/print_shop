<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'super_category_id'];

    public function superCategory()
    {
        return $this->belongsTo(SuperCategory::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, );
    }

}
