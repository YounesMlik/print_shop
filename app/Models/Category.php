<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class Category extends Model
{
    use HasFactory;
    use HasTranslations;

    protected $fillable = ['name', 'description', 'super_category_id'];
    public array $translatable = ['name', 'description'];

    public function superCategory()
    {
        return $this->belongsTo(SuperCategory::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class, );
    }

}
