<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class BumpI18nVersion extends Command
{
    protected $signature = 'i18n:bump';
    protected $description = 'Bump i18n assets version for cache busting';

    public function handle()
    {
        $path = storage_path('app/i18n_version');
        File::put($path, (string) now()->timestamp);
        $this->info('i18n version bumped.');
        return self::SUCCESS;
    }
}
