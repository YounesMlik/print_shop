#!/bin/bash
set -e

source ".env"


if [ "$APP_ENV" = "local" ]; then
    php artisan queue:work &
    php artisan schedule:work &
    npm run dev &
    wait
elif [ "$APP_ENV" = "production" ]; then
    php artisan queue:work &
    php artisan schedule:work &
    wait
else
    echo "$APP_ENV is not recognized as a valid APP_ENV value"
fi
