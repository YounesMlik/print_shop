<?php

use Illuminate\Support\Str;


return [
    'default' => env('APP_LOCALE', 'fr'),
    'fallback' => env('APP_FALLBACK_LOCALE', 'fr'),
    // Comma-separated lists in .env → arrays here
    'available' => Str::of(env('APP_AVAILABLE_LOCALES', 'fr,ar'))
        ->explode(',')
        ->map(fn($v) => trim($v))
        ->filter()
        ->values()
        ->unique()
        ->all(),
    'rtl' => Str::of(env('APP_RTL_LOCALES', 'ar'))
        ->explode(',')
        ->map(fn($v) => trim($v))
        ->filter()
        ->values()
        ->unique()
        ->all(),
];
