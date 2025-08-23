#!/bin/bash
set -e

source ".env"

php_fpm() {
    docker compose exec -T php-fpm "$@"
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

if [ "$APP_ENV" = "local" ]; then
    echo "deploying local"
    docker compose up -d
    wait_for_service postgres
    wait_for_service webserver
    wait_for_postgres
    wait_for_service php-fpm
    php_fpm php artisan migrate --seed
    php_fpm php artisan db:seed LocalSeeder
    php_fpm php artisan queue:work &
    php_fpm npm run dev &
    wait
    echo "deployment successful"

elif [ "$APP_ENV" = "production" ]; then
    echo "deploying production"
    docker compose up -d
    wait_for_service postgres
    wait_for_service webserver
    wait_for_postgres
    wait_for_service php-fpm
    php_fpm php artisan migrate --seed
    php_fpm php artisan queue:work &
    php_fpm npm run build &
    wait
    echo "deployment successful"

else
    echo "$APP_ENV is not recognized as a valid APP_ENV value"
fi
