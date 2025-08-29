<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

if (app()->isProduction()) {
    Schedule::command('backup:run --only-db')->hourly();
    Schedule::command('backup:clean')->dailyAt('02:30');
    Schedule::command('backup:monitor')->dailyAt('03:00');
}
