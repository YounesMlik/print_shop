<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SafeOptimize extends Command
{
    protected $signature = 'optimize:safe';

    protected $description = 'Run config:cache first, then optimize';

    public function handle(): int
    {
        $this->call('config:cache');
        $this->call('optimize');

        return Command::SUCCESS;
    }
}
