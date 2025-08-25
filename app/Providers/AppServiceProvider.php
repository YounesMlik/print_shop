<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use App\Models\SuperCategory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share('navigation.superCategories', function () {
            return SuperCategory::with('children:id,name,super_category_id')->get(['id', 'name']);
        });

        Inertia::share('i18n', function () {
            $cfg = config('locales');
            $locale = app()->getLocale();

            return [
                'locale' => $locale,
                'isRtl' => in_array($locale, $cfg['rtl'], true),
                'available' => $cfg['available'],
                'fallback' => $cfg['fallback'],
                'rtlLocales' => $cfg['rtl'],

                // client fetch config (optional but handy)
                'assetsBase' => asset('locales'),
                'assetsVersion' => config('app.asset_version') ?? null, // or filemtime on a version file
                'defaultNS' => 'common',
                'namespaces' => ['common'],
            ];
        });
    }
}
