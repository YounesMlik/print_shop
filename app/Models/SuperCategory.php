<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SuperCategory extends Model
{
    protected $fillable = ['name', 'description'];

    public function children()
    {
        return $this->hasMany(Category::class, );
    }

}
