<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $available = config('locales.available');
        $fallback = config('locales.fallback');

        $locale = $request->route('locale')
            ?? $request->session()->get('locale')
            ?? $request->getPreferredLanguage($available)
            ?? $fallback;

        if (!in_array($locale, $available, true))
            $locale = $fallback;

        app()->setLocale($locale);
        $request->session()->put('locale', $locale);

        return $next($request);
    }
}
