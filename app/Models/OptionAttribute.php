<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionAttribute extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];
    protected $appends = ['effective_description', 'value'];

    public function options()
    {
        return $this->belongsToMany(Option::class)
            ->using(OptionOptionAttribute::class)
            ->withPivot('description')
            ->withTimestamps();
    }

    public function effectiveDescription(): Attribute
    {
        // If it's loaded via an Option (many-to-many), use pivot description if set
        return Attribute::make(
            get: fn($v) => $this->pivot->description ?? $this->description
        );
    }

    protected function value(): Attribute
    {
        return Attribute::make(
            get: fn($v) => $this->pivot?->value
        );
    }

}
