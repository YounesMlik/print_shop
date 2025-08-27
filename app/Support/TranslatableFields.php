<?php

namespace App\Support;

use Illuminate\Support\Str;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Database\Eloquent\Builder;

final class TranslatableFields
{
    /**
     * Tabs with per-locale inputs for the given attributes.
     *
     * Example:
     *   TranslatableFields::tabs([
     *     ['text', 'name'],
     *     ['textarea', 'description', ['rows' => 3]],
     *   ])
     */
    public static function tabs(array $attributes, string $label = 'Translations', string $prefix = ''): Tabs
    {
        $locales = config('locales.available', ['en']);
        $fallback = config('locales.fallback', 'en');

        return Tabs::make($label)->tabs(
            collect($locales)->map(function (string $locale) use ($attributes, $fallback, $prefix) {
                return Tabs\Tab::make(strtoupper($locale))->schema(
                    array_map(function (array|string $def) use ($locale, $fallback, $prefix) {
                        // normalize definition
                        if (is_string($def))
                            $def = ['text', $def];
                        [$type, $name, $opts] = $def + [null, null, []];

                        $full = ltrim($prefix . $name, '.') . ".{$locale}";
                        $label = Str::title(str_replace('_', ' ', $name));
                        $isRequired = ($locale === $fallback);

                        return match ($type) {
                            'textarea' => Textarea::make($full)->label($label)->rows($opts['rows'] ?? 4),
                            default => TextInput::make($full)->label($label)->required($opts['required'] ?? $isRequired),
                        };
                    }, $attributes)
                );
            })->toArray()
        );
    }

    /**
     * Text column that reads the current-locale key (and can self-handle search on JSONB).
     */
    public static function tTextColumn(string $attr, ?string $label = null, bool $searchable = true): TextColumn
    {
        $locale = app()->getLocale();
        $label = $label ?: Str::title(str_replace('_', ' ', $attr));

        $col = TextColumn::make("{$attr}->{$locale}")->label($label);

        if ($searchable) {
            $col = $col->searchable(
                query: function (Builder $query, string $search) use ($attr, $locale) {
                    // Postgres case-insensitive JSONB lookup
                    return $query->orWhereRaw("({$attr}->>?) ILIKE ?", [$locale, "%{$search}%"]);
                }
            );
        }

        return $col;
    }

    /**
     * Minimal mode: edit only the current locale (no tabs).
     * Usage: TranslatableFields::currentLocaleInputs(['name' => 'text', 'description' => 'textarea'])
     */
    public static function currentLocaleInputs(array $fields, string $prefix = '')
    {
        $locale = app()->getLocale();

        return collect($fields)->map(function ($type, $name) use ($locale, $prefix) {
            $full = ltrim($prefix . $name, '.') . ".{$locale}";
            $label = Str::title(str_replace('_', ' ', $name));
            return $type === 'textarea'
                ? Textarea::make($full)->label($label)->rows(4)
                : TextInput::make($full)->label($label)->required();
        })->all();
    }
}
