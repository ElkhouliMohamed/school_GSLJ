# VPS Deployment Guide

## Prerequisites

Before deploying to your VPS, ensure you have:

1. A VPS with at least 2GB RAM and 20GB storage
2. Ubuntu 20.04+ or Debian 11+ installed
3. Root or sudo access
4. A domain name pointed to your VPS IP address
5. Ports 80, 443, and 22 open in your firewall

## Quick Deployment

### 1. Upload Your Project

```bash
# On your local machine, create a zip of the project
tar -czf school-website.tar.gz .

# Upload to VPS
scp school-website.tar.gz root@your-vps-ip:/root/

# SSH into your VPS
ssh root@your-vps-ip

# Extract the project
mkdir -p /var/www/school
tar -xzf school-website.tar.gz -C /var/www/school
cd /var/www/school
```

### 2. Run Deployment Script

```bash
# Make the script executable
chmod +x deploy-vps.sh

# Set your domain and email
export DOMAIN="yourdomain.com"
export EMAIL="admin@yourdomain.com"

# Run the deployment script
sudo ./deploy-vps.sh
```

The script will:
- Install Docker and Docker Compose
- Generate secure database passwords
- Set up SSL certificates
- Build and start all containers
- Run database migrations

## Manual Deployment

If you prefer manual control:

### 1. Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl enable docker
sudo systemctl start docker
```

### 2. Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 3. Configure Environment

```bash
# Create .env file
cat > .env << EOF
MYSQL_DATABASE=school_db
MYSQL_USER=school_user
MYSQL_PASSWORD=YOUR_SECURE_PASSWORD_HERE
MYSQL_ROOT_PASSWORD=YOUR_ROOT_PASSWORD_HERE
DB_AUTO_MIGRATE=true
DB_AUTO_SEED=false
EOF
```

### 4. Set Up SSL Certificates

**Option A: Using Let's Encrypt (Recommended)**

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install -y certbot

# Stop nginx if running
sudo systemctl stop nginx

# Obtain certificates
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates
sudo mkdir -p docker/nginx/ssl
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem docker/nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem docker/nginx/ssl/
```

**Option B: Self-Signed Certificates (Testing Only)**

```bash
mkdir -p docker/nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout docker/nginx/ssl/privkey.pem \
  -out docker/nginx/ssl/fullchain.pem \
  -subj "/CN=yourdomain.com"
```

### 5. Update Configuration

```bash
# Update nginx configuration with your domain
sed -i 's/yourdomain.com/YOURDOMAIN.com/g' docker/nginx/conf.d/app.production.conf

# Update .env.production
sed -i 's/yourdomain.com/YOURDOMAIN.com/g' .env.production
```

### 6. Build and Deploy

```bash
# Build the production image
docker-compose -f docker-compose.production.yml build

# Start containers
docker-compose -f docker-compose.production.yml up -d

# Check logs
docker-compose -f docker-compose.production.yml logs -f
```

## Post-Deployment

### 1. Create Admin User

```bash
# Access the app container
docker exec -it school-app-prod bash

# Run artisan command to create admin
php artisan tinker

# In tinker, run:
# User::create(['name' => 'Admin', 'email' => 'admin@yourdomain.com', 'password' => bcrypt('your-password')]);
```

### 2. Set Up Automatic SSL Renewal

```bash
# Add cron job for Let's Encrypt renewal
echo "0 0 * * * certbot renew --quiet && cp /etc/letsencrypt/live/yourdomain.com/*.pem /var/www/school/docker/nginx/ssl/ && docker-compose -f /var/www/school/docker-compose.production.yml restart webserver" | sudo crontab -
```

### 3. Set Up Backups

```bash
# Create backup script
cat > /root/backup-school.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup database
docker exec school-db-prod mysqldump -u root -p${MYSQL_ROOT_PASSWORD} school_db > $BACKUP_DIR/db_$DATE.sql

# Backup uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz -C /var/www/school storage/app/public

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
EOF

chmod +x /root/backup-school.sh

# Add to cron (daily at 2 AM)
echo "0 2 * * * /root/backup-school.sh" | crontab -
```

## Useful Commands

### Container Management

```bash
# View all containers
docker-compose -f docker-compose.production.yml ps

# View logs
docker-compose -f docker-compose.production.yml logs -f

# Restart a specific service
docker-compose -f docker-compose.production.yml restart app

# Stop all containers
docker-compose -f docker-compose.production.yml down

# Start containers
docker-compose -f docker-compose.production.yml up -d
```

### Application Commands

```bash
# Access app container
docker exec -it school-app-prod bash

# Run migrations
docker exec school-app-prod php artisan migrate

# Clear cache
docker exec school-app-prod php artisan cache:clear

# View Laravel logs
docker exec school-app-prod tail -f storage/logs/laravel.log
```

### Database Management

```bash
# Access MySQL
docker exec -it school-db-prod mysql -u root -p

# Backup database
docker exec school-db-prod mysqldump -u root -p school_db > backup.sql

# Restore database
docker exec -i school-db-prod mysql -u root -p school_db < backup.sql
```

## Monitoring

### Check Resource Usage

```bash
# Container resource usage
docker stats

# Disk usage
df -h

# Memory usage
free -h
```

### Check Logs

```bash
# Application logs
docker-compose -f docker-compose.production.yml logs -f app

# Nginx logs
docker-compose -f docker-compose.production.yml logs -f webserver

# Database logs
docker-compose -f docker-compose.production.yml logs -f db
```

## Troubleshooting

### Container won't start

```bash
# Check container status
docker-compose -f docker-compose.production.yml ps

# View logs for errors
docker-compose -f docker-compose.production.yml logs

# Rebuild images
docker-compose -f docker-compose.production.yml build --no-cache
docker-compose -f docker-compose.production.yml up -d
```

### Database connection issues

```bash
# Check if database is ready
docker exec school-db-prod mysqladmin ping -h localhost

# Verify credentials in .env
cat .env
```

### Permission issues

```bash
# Fix storage permissions
docker exec school-app-prod chown -R www-data:www-data /var/www/storage
docker exec school-app-prod chmod -R 775 /var/www/storage
```

### SSL certificate issues

```bash
# Verify certificates exist
ls -la docker/nginx/ssl/

# Test SSL configuration
openssl s_client -connect yourdomain.com:443
```

## Security Recommendations

1. **Change default passwords**: Update database passwords in `.env`
2. **Enable firewall**: Only allow ports 80, 443, and 22
3. **Regular updates**: Keep Docker and system packages updated
4. **Monitor logs**: Regularly check application and access logs
5. **Backup regularly**: Set up automated backups
6. **Use strong passwords**: For admin accounts and database
7. **Enable fail2ban**: Protect against brute force attacks

## Performance Tuning

### Adjust Resource Limits

Edit `docker-compose.production.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: '4'  # Increase for more CPU
      memory: 4096M  # Increase for more RAM
```

### Enable OPcache

Already configured in Dockerfile for production builds.

### Database Optimization

Edit `docker/mysql/my.cnf` to tune based on your VPS resources.

## Support

For issues or questions:
1. Check logs: `docker-compose -f docker-compose.production.yml logs`
2. Verify configuration files
3. Ensure all prerequisites are met
4. Check firewall and DNS settings
