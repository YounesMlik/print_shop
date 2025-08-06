FROM phpdockerio/php:8.4-fpm

WORKDIR /application

# Update system and install dependencies for Node.js setup
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    gnupg \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

# Install PHP extensions and Node.js 20
RUN apt-get install -y --no-install-recommends \
    git \
    php8.4-mysql \
    php8.4-pgsql \
    php8.4-intl \
    php8.4-gd \
    php8.4-imagick \
    nodejs

# Clean up to reduce image size
RUN apt-get clean && rm -rf \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/* \
    /usr/share/doc/*
