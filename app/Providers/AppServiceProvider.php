<?php

namespace App\Providers;

use File;
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
        Inertia::share('navigation.super_categories', function () {
            return SuperCategory::with('children:id,name,super_category_id')
                ->get()
                ->toResourceCollection();
        });

        Inertia::share('i18n', function () {
            $cfg = config('locales');
            $locale = app()->getLocale();

            $vFile = storage_path('app/i18n_version');
            $version = File::exists($vFile) ? trim(File::get($vFile)) : (string) now()->timestamp;

            return [
                'locale' => $locale,
                'isRtl' => in_array($locale, $cfg['rtl'], true),
                'available' => $cfg['available'],
                'fallback' => $cfg['fallback'],
                'rtlLocales' => $cfg['rtl'],

                // client fetch config (optional but handy)
                'assetsBase' => asset('locales'),
                'assetsVersion' => $version, // or filemtime on a version file
                'defaultNS' => 'common',
                'namespaces' => ['common'],
            ];
        });
    }
}
