<?php



if (!function_exists('fakeLocalize')) {
    function fakeLocalize(?string $value)
    {
        $locales = collect(config('locales.available', ['en']));
        return $locales->map(fn($lang) => $value ? "$value $lang" : $value);
    }
}