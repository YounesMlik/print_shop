FROM phpdockerio/php:8.4-fpm

WORKDIR /application

# NodeSource repo for Node 22
RUN apt-get update && apt-get install -y --no-install-recommends curl gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

# Install tools & PHP extensions
# - postgresql-client gives you pg_dump / pg_restore
# - php8.4-zip is needed by spatie/laravel-backup (ZipArchive)
RUN apt-get install -y --no-install-recommends \
    git \
    nodejs \
    php8.4-pgsql \
    php8.4-intl \
    php8.4-gd \
    php8.4-zip \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

# (optional) sanity checks at build
# RUN pg_dump --version && pg_restore --version && php -m | grep -i zip && node --version
