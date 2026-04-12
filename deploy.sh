#!/bin/bash
set -e


docker compose -f 'docker-compose.yml' up -d --build
./dex.sh npm install
./dex.sh composer install --no-interaction
./dex.sh php artisan storage:link

if [ "$1" = "local" ]; then
    echo "deploying local"
    ./dex.sh cp .env.local .env
    ./dex.sh php artisan migrate
    # ./dex.sh php artisan db:seed LocalSeeder
    ./dex.sh npm run build

elif [ "$1" = "production" ]; then
    echo "deploying production"
    ./dex.sh cp .env.production .env
    # ./dex.sh php artisan backup:restore --backup=latest --connection=pgsql --reset --no-interaction
    ./dex.sh php artisan migrate --force
    ./dex.sh npm run build
    rm public/hot

else
    echo "$1 is not recognized as a valid APP_ENV value"
    exit
fi

./dex.sh php artisan db:seed --force
./dex.sh php artisan i18n:bump
./dex.sh php artisan config:clear
./dex.sh php artisan key:generate
./dex.sh php artisan config:cache
./dex.sh php artisan optimize:clear
./dex.sh php artisan optimize:safe
./dex.sh frankenphp reload

./dex.sh ./work.sh &
wait

echo "deployment successful"
