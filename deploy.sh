#!/bin/bash
set -e

source ".env"

php_fpm() {
    docker compose exec -T php-fpm "$@"
}

fix_perms() {
  php_fpm bash -lc '
    mkdir -p storage/framework/{cache,sessions,views} bootstrap/cache &&
    chown -R www-data:www-data storage bootstrap/cache &&
    find storage bootstrap/cache -type d -exec chmod 775 {} \; &&
    find storage bootstrap/cache -type f -exec chmod 664 {} \;
  '
}

wait_for_service() {
    local service="$1"
    echo "Waiting for $service to be running..."
    until [ "$(docker compose ps -q "$service" | xargs docker inspect -f '{{.State.Status}}')" = "running" ]; do
        sleep 2
    done
    echo "$service is running."
}

wait_for_postgres() {
    echo "Waiting for Postgres to accept connections..."
    until docker compose exec -T postgres pg_isready -U postgres -d printing_shop_db > /dev/null 2>&1; do
        sleep 2
    done
    echo "Postgres is ready."
}

shared_init() {
    docker compose up -d
    wait_for_service postgres
    wait_for_service webserver
    wait_for_postgres
    wait_for_service php-fpm
    fix_perms
    php_fpm npm install --production
    php_fpm composer install --no-interaction
    php_fpm php artisan optimize:clear
}

if [ "$1" = "local" ]; then
    echo "deploying local"
    shared_init
    php_fpm cp .env.local .env
    php_fpm php artisan i18n:bump
    php_fpm php artisan key:generate
    php_fpm php artisan backup:restore --backup=latest --connection=pgsql --reset --no-interaction
    php_fpm php artisan migrate
    php_fpm php artisan db:seed LocalSeeder
    php_fpm php artisan config:cache
    php_fpm ./work.sh &
    wait
    echo "deployment successful"

elif [ "$1" = "production" ]; then
    echo "deploying production"
    shared_init
    php_fpm cp .env.production .env
    php_fpm php artisan optimize
    php_fpm php artisan i18n:bump
    php_fpm php artisan key:generate
    php_fpm php artisan backup:restore --backup=latest --connection=pgsql --reset --no-interaction
    php_fpm php artisan migrate --force
    php_fpm php artisan config:cache
    php_fpm npm run build
    php_fpm ./work.sh &
    wait
    echo "deployment successful"
else
    echo "$1 is not recognized as a valid APP_ENV value"
fi
