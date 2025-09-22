#!/bin/bash
set -e

docker_exec() {
    docker compose exec -T app "$@"
}



# docker_exec npm install
docker_exec composer install --no-interaction

docker_exec php artisan optimize:clear
docker_exec php artisan optimize:safe

docker_exec ./work.sh

docker_exec frankenphp reload
