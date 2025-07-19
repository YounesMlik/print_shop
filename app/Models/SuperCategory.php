<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SuperCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function children()
    {
        return $this->hasMany(Category::class, );
    }

}
