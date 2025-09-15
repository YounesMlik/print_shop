# Caddy + PHP (FrankenPHP) in one image
FROM dunglas/frankenphp:latest

WORKDIR /app

# Install Node 22 + Postgres client tools
RUN apt-get update && apt-get install -y --no-install-recommends curl gnupg ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions similar to your current stack
# intl, gd, zip, and pdo_pgsql (PostgreSQL)
RUN install-php-extensions intl gd zip pdo_pgsql

# Optional sanity checks:
# RUN php -v && php -m && node -v && pg_dump --version && pg_restore --version

EXPOSE 80 443
# The base image starts FrankenPHP/Caddy by default
