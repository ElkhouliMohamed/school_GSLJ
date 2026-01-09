#!/bin/bash

# Exit on fail
set -e

# Check if .env exists, if not copy from .env.docker or .env.example
if [ ! -f .env ]; then
    if [ -f .env.docker ]; then
        echo "Creating .env from .env.docker..."
        cp .env.docker .env
    elif [ -f .env.example ]; then
        echo "Creating .env from .env.example..."
        cp .env.example .env
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

# Run migrations
echo "Running migrations..."
php artisan migrate --seed --force
 

# Clear cache
echo "Clearing cache..."
php artisan optimize:clear


# Build frontend assets
echo "Building frontend assets..."
if [ -f "package.json" ]; then
    npm install
    npm run build
fi

# Fix permissions for storage
echo "Fixing permissions..."
chmod -R 777 storage bootstrap/cache

# Fix permissions for Pages (resolves potential "Page not found" in Docker)
if [ -d "resources/js/Pages" ]; then
    echo "Fixing permissions for Pages..."
    find resources/js/Pages -type d -exec chmod 755 {} \;
    find resources/js/Pages -type f -exec chmod 644 {} \;
fi

# Start the main process
echo "Starting PHP-FPM..."
exec "$@"
