#!/bin/bash
set -e

echo "──────────────────────────────────────────"
echo " 🚀  School App – Docker Entrypoint"
echo "──────────────────────────────────────────"

cd /var/www

# Clear any stale bootstrap cache from the build stage
echo "▶ Clearing stale cache..."
rm -f bootstrap/cache/*.php

# Wait for DB (extra safety beyond healthcheck)
echo "▶ Waiting for database connection..."
until php artisan db:show --json > /dev/null 2>&1; do
    echo "  ⏳ Database not ready yet, retrying in 3s..."
    sleep 3
done
echo "  ✅ Database connected!"

# Run migrations
echo "▶ Running migrations..."
php artisan migrate --force

# Seed only on first boot (flag stored in storage)
SEED_FLAG="/var/www/storage/app/.seeded"
if [ ! -f "$SEED_FLAG" ]; then
    echo "▶ Seeding database (first boot)..."
    php artisan db:seed --force
    touch "$SEED_FLAG"
    echo "  ✅ Seeding complete."
else
    echo "▶ Skipping seeders (already seeded on first boot)."
fi

# Clear & cache config for production
echo "▶ Optimizing Laravel..."
php artisan optimize

# Create storage symlink
echo "▶ Linking storage..."
php artisan storage:link || true

# Fix permissions
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

echo "──────────────────────────────────────────"
echo " ✅  Setup complete – starting supervisord"
echo "──────────────────────────────────────────"

exec /usr/bin/supervisord -c /etc/supervisord.conf
