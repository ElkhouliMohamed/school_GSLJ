#!/bin/bash
# deploy.sh
# Production deployment script for Laravel application

# Exit on error
set -e

echo "Starting deployment..."

# 1. Pull latest code (if using Git)
# git pull origin main

# 2. Install/update Composer dependencies (no dev dependencies)
echo "Installing Composer dependencies..."
composer install --optimize-autoloader --no-dev

# 3. Install/update NPM dependencies and build assets (if doing it on server)
# echo "Building frontend assets..."
# npm ci
# npm run build
# Note: Since assets are built locally and uploaded, we can skip this step on the server.

# 4. Clear and rebuild Laravel caches
echo "Optimizing Laravel performance..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# 5. Run database migrations (safely runs new migrations without deleting existing data)
echo "Running database migrations..."
php artisan migrate --force

# 6. Ensure storage directory is linked (Exposes storage/app/public to the web)
echo "Linking storage directory..."
php artisan storage:link || true # Ignore error if it already exists

# 7. Set correct permissions (adjust user/group as needed for your server, e.g., www-data)
# chown -R www-data:www-data storage bootstrap/cache
# chmod -R 775 storage bootstrap/cache

# 8. Restart queue workers (if using queues)
# echo "Restarting queue workers..."
# php artisan queue:restart

# 9. Reload PHP-FPM or web server (if applicable)
# sudo systemctl reload php8.2-fpm

echo "Deployment finished successfully!"
