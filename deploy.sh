#!/bin/bash
set -e


docker compose -f 'docker-compose.yml' up -d --build

./dex.sh npm install
./dex.sh composer install --no-interaction

./dex.sh php artisan optimize:clear
./dex.sh php artisan optimize:safe

./dex.sh ./work.sh

./dex.sh frankenphp reload
