<?php



if (!function_exists('fakeLocalize')) {
    function fakeLocalize(?string $value)
    {
        $locales = collect(config('locales.available', ['en']));
        return $locales->mapWithKeys(
            fn($lang) => [$lang => $value ? "$value $lang" : $value]
        )->all();
    }
}