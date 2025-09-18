<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SafeOptimize extends Command
{
    protected $signature = 'optimize:safe';
    protected $description = 'Run config:cache then optimize (fresh processes, like manual run)';

    public function handle(): int
    {
        $this->line('> php artisan config:cache');
        passthru(PHP_BINARY.' artisan config:cache', $code1);
        if ($code1 !== 0) {
            return $code1;
        }

        $this->line('> php artisan optimize');
        passthru(PHP_BINARY.' artisan optimize', $code2);

        return $code2;
    }
}