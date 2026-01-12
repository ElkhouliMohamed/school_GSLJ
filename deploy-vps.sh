#!/bin/bash

# VPS Production Deployment Script
# This script helps deploy the application to a VPS

set -e

echo "========================================="
echo "School Website - Production Deployment"
echo "========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "Please run as root (use sudo)"
    exit 1
fi

# Variables (customize these)
DOMAIN="${DOMAIN:-yourdomain.com}"
EMAIL="${EMAIL:-admin@yourdomain.com}"
DB_PASSWORD="${DB_PASSWORD:-$(openssl rand -base64 32)}"
DB_ROOT_PASSWORD="${DB_ROOT_PASSWORD:-$(openssl rand -base64 32)}"

echo "Configuration:"
echo "Domain: $DOMAIN"
echo "Email: $EMAIL"
echo ""

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    systemctl enable docker
    systemctl start docker
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

echo "Docker and Docker Compose installed successfully!"
echo ""

# Create .env file for production
echo "Creating production environment file..."
cat > .env << EOF
# Database Configuration
MYSQL_DATABASE=school_db
MYSQL_USER=school_user
MYSQL_PASSWORD=${DB_PASSWORD}
MYSQL_ROOT_PASSWORD=${DB_ROOT_PASSWORD}

# Application Configuration
APP_ENV=production
APP_DEBUG=false
APP_URL=https://${DOMAIN}

# Migration Settings
DB_AUTO_MIGRATE=true
DB_AUTO_SEED=false
EOF

echo ".env file created with secure passwords"
echo ""

# Create SSL directory
mkdir -p docker/nginx/ssl

# Check if SSL certificates exist
if [ ! -f "docker/nginx/ssl/fullchain.pem" ]; then
    echo "SSL certificates not found!"
    echo ""
    echo "To obtain SSL certificates, you have two options:"
    echo ""
    echo "1. Use Certbot (recommended):"
    echo "   sudo apt-get install certbot"
    echo "   sudo certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --email $EMAIL"
    echo "   sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem docker/nginx/ssl/"
    echo "   sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem docker/nginx/ssl/"
    echo ""
    echo "2. Use self-signed certificates (for testing):"
    echo "   openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\"
    echo "     -keyout docker/nginx/ssl/privkey.pem \\"
    echo "     -out docker/nginx/ssl/fullchain.pem \\"
    echo "     -subj \"/CN=$DOMAIN\""
    echo ""
    read -p "Do you want to create self-signed certificates now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout docker/nginx/ssl/privkey.pem \
            -out docker/nginx/ssl/fullchain.pem \
            -subj "/CN=$DOMAIN"
        echo "Self-signed certificates created!"
    else
        echo "Please add SSL certificates manually before running the application."
        exit 1
    fi
fi

echo ""
echo "Updating nginx configuration with your domain..."
sed -i "s/yourdomain.com/$DOMAIN/g" docker/nginx/conf.d/app.production.conf

echo ""
echo "Building Docker images..."
docker-compose -f docker-compose.production.yml build

echo ""
echo "Starting containers..."
docker-compose -f docker-compose.production.yml up -d

echo ""
echo "========================================="
echo "Deployment Complete!"
echo "========================================="
echo ""
echo "Your application is now running at: https://$DOMAIN"
echo ""
echo "Database Credentials (save these securely):"
echo "Database: school_db"
echo "Username: school_user"
echo "Password: $DB_PASSWORD"
echo "Root Password: $DB_ROOT_PASSWORD"
echo ""
echo "Useful commands:"
echo "  - View logs: docker-compose -f docker-compose.production.yml logs -f"
echo "  - Stop: docker-compose -f docker-compose.production.yml down"
echo "  - Restart: docker-compose -f docker-compose.production.yml restart"
echo ""
