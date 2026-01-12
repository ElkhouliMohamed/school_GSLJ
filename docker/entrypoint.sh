#!/bin/bash

# Exit on fail
set -e

# Check if .env exists, if not copy from .env.production, .env.docker or .env.example
if [ ! -f .env ]; then
    if [ -f .env.production ]; then
        echo "Creating .env from .env.production..."
        cp .env.production .env
    elif [ -f .env.docker ]; then
        echo "Creating .env from .env.docker..."
        cp .env.docker .env
    elif [ -f .env.example ]; then
        echo "Creating .env from .env.example..."
        cp .env.example .env
    fi
fi

# Install composer dependencies if missing (dev mode only)
if [ ! -f "vendor/autoload.php" ]; then
    echo "Installing composer dependencies..."
    if [ "$APP_ENV" = "production" ]; then
        composer install --no-interaction --optimize-autoloader --no-dev
    else
        composer install --no-interaction --optimize-autoloader
    fi
fi

# Generate APP_KEY if it's missing or default
if grep -q "APP_KEY=$" .env || grep -q "APP_KEY=base64:..." .env; then
    echo "Generating APP_KEY..."
    php artisan key:generate
fi

# Link storage
if [ ! -d public/storage ]; then
    echo "Linking storage..."
    php artisan storage:link
fi

# Wait for MySQL
echo "Waiting for MySQL to be ready..."
until nc -z -v -w30 db 3306
do
  echo "Waiting for database connection..."
  sleep 5
done

# Run migrations only if DB_AUTO_MIGRATE is set to true
if [ "${DB_AUTO_MIGRATE:-false}" = "true" ]; then
    echo "Running migrations..."
    php artisan migrate --force

    # Run seeders only in development or if explicitly enabled
    if [ "$APP_ENV" != "production" ] || [ "${DB_AUTO_SEED:-false}" = "true" ]; then
        echo "Running seeders..."
        php artisan db:seed --force
    fi
else
    echo "Skipping migrations (set DB_AUTO_MIGRATE=true to enable)"
fi

# Clear and optimize cache for production
if [ "$APP_ENV" = "production" ]; then
    echo "Optimizing for production..."
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
else
    echo "Clearing cache for development..."
    php artisan optimize:clear
fi

# Build frontend assets (only in development mode)
if [ "$APP_ENV" != "production" ]; then
    echo "Building frontend assets..."
    if [ -f "package.json" ]; then
        if [ ! -d "node_modules" ]; then
            npm install
        fi
        npm run build
    fi
fi

# Set proper permissions
echo "Setting proper permissions..."
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Fix permissions for public storage
if [ -d "public/storage" ]; then
    chown -R www-data:www-data /var/www/public/storage
    chmod -R 775 /var/www/public/storage
fi

# Start the main process
echo "Starting PHP-FPM..."
exec "$@"
