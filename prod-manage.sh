#!/bin/bash

# Helper script for production operations

COMPOSE_FILE="docker-compose.production.yml"

case "$1" in
    start)
        echo "Starting production containers..."
        docker-compose -f $COMPOSE_FILE up -d
        ;;
    stop)
        echo "Stopping production containers..."
        docker-compose -f $COMPOSE_FILE down
        ;;
    restart)
        echo "Restarting production containers..."
        docker-compose -f $COMPOSE_FILE restart
        ;;
    logs)
        docker-compose -f $COMPOSE_FILE logs -f "${2:-app}"
        ;;
    status)
        docker-compose -f $COMPOSE_FILE ps
        ;;
    rebuild)
        echo "Rebuilding production images..."
        docker-compose -f $COMPOSE_FILE build --no-cache
        docker-compose -f $COMPOSE_FILE up -d
        ;;
    backup)
        echo "Creating backup..."
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        mkdir -p backups

        # Backup database
        docker exec school-db-prod mysqldump -u root -p${MYSQL_ROOT_PASSWORD} school_db > backups/db_$TIMESTAMP.sql

        # Backup storage
        tar -czf backups/storage_$TIMESTAMP.tar.gz storage/app/public

        echo "Backup created: backups/db_$TIMESTAMP.sql and backups/storage_$TIMESTAMP.tar.gz"
        ;;
    migrate)
        echo "Running migrations..."
        docker exec school-app-prod php artisan migrate --force
        ;;
    cache)
        echo "Clearing and optimizing cache..."
        docker exec school-app-prod php artisan config:cache
        docker exec school-app-prod php artisan route:cache
        docker exec school-app-prod php artisan view:cache
        ;;
    shell)
        docker exec -it school-app-prod bash
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|logs|status|rebuild|backup|migrate|cache|shell}"
        echo ""
        echo "Commands:"
        echo "  start    - Start all containers"
        echo "  stop     - Stop all containers"
        echo "  restart  - Restart all containers"
        echo "  logs     - View logs (optional: specify service name)"
        echo "  status   - Show container status"
        echo "  rebuild  - Rebuild images and restart"
        echo "  backup   - Backup database and storage"
        echo "  migrate  - Run database migrations"
        echo "  cache    - Clear and optimize cache"
        echo "  shell    - Access app container shell"
        exit 1
        ;;
esac
