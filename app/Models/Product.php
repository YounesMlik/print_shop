<?php

namespace App\Models;

use CyrildeWit\EloquentViewable\Contracts\Viewable;
use CyrildeWit\EloquentViewable\InteractsWithViews;
use CyrildeWit\EloquentViewable\Support\Period;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
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

    public function registerMediaCollections(): void{
        $this->addMediaCollection('product_images')
        ->useDisk('s3_media'); 
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(150)
            ->height(150)
            ->sharpen(10);
    }

    /** Eager-load the same relations used in the controller */
    #[Scope]
    public function withCommonRelations(Builder $query)
    {
        return $query->with('tags', 'category', 'category.superCategory', 'media');
    }

    /** Filter by ALL selected tag IDs (AND semantics), identical to the foreach+whereHas chain */
    #[Scope]
    public function filterTags(Builder $query, ?array $tagIds)
    {
        if (empty($tagIds))
            return $query;

        foreach ($tagIds as $tagId) {
            $query->whereHas('tags', fn($q) => $q->where('tags.id', $tagId));
        }

        return $query;
    }

    /** Filter by direct category */
    #[Scope]
    public function filterCategory(Builder $query, $categoryId)
    {
        if (!$categoryId)
            return $query;

        return $query->where('category_id', $categoryId);
    }

    /** Filter by super category through the category relationship */
    #[Scope]
    public function filterSuperCategory(Builder $query, $superCategoryId)
    {
        if (!$superCategoryId)
            return $query;

        return $query->whereHas(
            'category',
            fn($q) =>
            $q->where('super_category_id', $superCategoryId)
        );
    }

    /** Apply sort exactly like the switch in the controller */
    #[Scope]
    public function applySort(Builder $query, string $sort, string $dir)
    {
        switch ($sort) {
            case 'alpha':
                // keep your existing reverseSortDir() behavior
                return $query->orderBy('name', reverseSortDir($dir));

            case 'date':
                return $query->orderBy('created_at', $dir);

            case 'popular':
            default:
                return $query->orderByUniqueViews($dir, Period::pastDays(7));
        }
    }
}


function reverseSortDir($direction)
{
    return $direction === 'asc' ? 'desc' : 'asc';
}