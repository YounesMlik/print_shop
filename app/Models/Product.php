<?php

namespace App\Models;

use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Translatable\HasTranslations;

class Product extends Model implements HasMedia, Viewable
{
    use HasFactory;
    use HasTranslations;
    use InteractsWithMedia;
    use InteractsWithViews;

    protected $fillable = ['name', 'description', 'category_id'];
    public array $translatable = ['name', 'description'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function images()
    {
        return $this->morphToMany(
            Media::class,
            'model',
            'model_has_media', // Or customize as needed
            'model_id',
            'media_id'
        );
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(150)
            ->height(150)
            ->sharpen(10);
    }
}
