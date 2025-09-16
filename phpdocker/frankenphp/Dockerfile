# Caddy + PHP (FrankenPHP) in one image
FROM dunglas/frankenphp:latest

WORKDIR /app

# Install Node 22 (optional) + sqlite3 CLI (useful for debugging)
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl gnupg ca-certificates sqlite3 \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions: intl, gd, zip, and pdo_sqlite (SQLite)
RUN install-php-extensions intl gd zip pdo_sqlite

# (Optional) create an empty SQLite DB inside the image so permissions are correct.
# If you bind-mount your app at runtime, this may be overwritten—no problem.
RUN mkdir -p /app/database \
    && chown -R www-data:www-data /app/database

EXPOSE 80 443
# The base image starts FrankenPHP/Caddy by default
