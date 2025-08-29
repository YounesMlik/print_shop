<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Spatie\Translatable\HasTranslations;

class OptionOptionAttribute extends Pivot
{
    use HasFactory;
    use HasTranslations;

    protected $table = 'option_option_attribute';

    protected $fillable = [
        'option_id',
        'option_attribute_id',
        'value',
        'description',
    ];
    public array $translatable = ['description', 'value'];

    public function option()
    {
        return $this->belongsTo(Option::class);
    }

    public function option_attribute()
    {
        return $this->belongsTo(OptionAttribute::class);
    }
}
