<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class SuperCategory extends Model
{
    use HasFactory;
    use HasTranslations;

    protected $fillable = ['name', 'description'];
    public array $translatable = ['name', 'description'];

    public function children()
    {
        return $this->hasMany(Category::class, );
    }

}
