<?php

namespace App\Models;

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

    public function getEffectiveDescriptionAttribute(): ?string
    {
        // If it's loaded via an Option (many-to-many), use pivot description if set
        return $this->pivot->description ?? $this->description;
    }

    public function getValueAttribute()
    {
        return $this->pivot?->value;
    }

}
