# 🐳 Docker Deployment Guide
## Groupe Scolaire Privé Bilingue Les Jumelles

---

## 📁 Docker Files Overview

```
Dockerfile                # Multi-stage build (Node → PHP-FPM + Nginx)
docker-compose.yml        # Services: app + MySQL database
.env.docker               # Environment variables for Docker
.dockerignore             # Files excluded from Docker build context
docker/
  entrypoint.sh           # Startup script (migrate, seed, optimize)
  nginx.conf              # Nginx virtual host configuration
  supervisord.conf        # Process manager (nginx + php-fpm + queue)
```

---

## ⚙️ Architecture

```
┌─────────────────────────────────────┐
│           Docker Network            │
│                                     │
│  ┌──────────────┐  ┌─────────────┐  │
│  │   school_app │  │  school_db  │  │
│  │              │  │             │  │
│  │  Nginx :80   │  │  MySQL 8.0  │  │
│  │  PHP-FPM     │→ │  Port 3306  │  │
│  │  Queue Worker│  │             │  │
│  └──────────────┘  └─────────────┘  │
│        ↕ :8080                      │
└─────────────────────────────────────┘
```

The app container runs **three processes** via Supervisor:
- `nginx` — serves HTTP traffic on port 80
- `php-fpm` — processes PHP requests
- `queue:work` — handles background jobs (emails, etc.)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repo-url>
cd school
```

### 2. Configure environment
Edit `.env.docker` and set your values:
```env
APP_URL=http://your-domain.com
DB_PASSWORD=your_secure_password
MAIL_HOST=your.smtp.host
MAIL_USERNAME=your@email.com
MAIL_PASSWORD=your_mail_password
MAIL_FROM_ADDRESS=noreply@lesjumelles.sn
```

### 3. Start everything
```bash
docker compose up --build -d
```

**On first boot this automatically:**
- ✅ Creates the MySQL database
- ✅ Runs all database migrations
- ✅ Seeds with default data (admin user, settings, programs…)
- ✅ Generates `APP_KEY`
- ✅ Links public storage
- ✅ Caches config, routes, and views

### 4. Access the site
| URL | Description |
|-----|-------------|
| `http://localhost:8080` | Public website |
| `http://localhost:8080/admin` | Admin panel |

**Default admin credentials** (from seeder):
- Email: `admin@lesjumelles.sn`
- Password: `password`

> ⚠️ **Change the admin password immediately after first login!**

---

## 🛠️ Common Commands

### View live logs
```bash
docker compose logs -f app       # App logs
docker compose logs -f db        # Database logs
docker compose logs -f           # All logs
```

### Run Artisan commands inside the container
```bash
docker compose exec app php artisan <command>

# Examples:
docker compose exec app php artisan route:list
docker compose exec app php artisan tinker
docker compose exec app php artisan cache:clear
```

### Stop the project
```bash
docker compose down              # Stop containers (keeps data)
docker compose down -v           # Stop + delete all volumes (WIPES DATABASE)
```

### Restart without rebuilding
```bash
docker compose restart app
```

### Force re-seed (useful after `down -v`)
```bash
# The .seeded flag prevents re-seeding on restart.
# After wiping volumes with `down -v`, the flag is gone — seeds run automatically on next up.
docker compose up -d
```

---

## 🔄 Updating / Redeploying

When you have code changes to deploy:

```bash
# Pull latest code
git pull

# Rebuild and restart (zero-downtime isn't guaranteed but container restarts are fast)
docker compose up --build -d
```

Migrations run **automatically** on every startup — new migrations are applied safely.

---

## 🔐 Production Checklist

Before deploying to production, make sure to:

- [ ] Set `APP_ENV=production` and `APP_DEBUG=false` in `.env.docker`
- [ ] Set a strong `DB_PASSWORD` and `DB_ROOT_PASSWORD`
- [ ] Configure real SMTP mail settings
- [ ] Set `APP_URL` to your actual domain (e.g. `https://lesjumelles.sn`)
- [ ] Change the default admin password after first login
- [ ] Set up SSL/TLS with a reverse proxy (Nginx/Traefik) in front of the container
- [ ] Set up regular database backups

### Example backup command
```bash
docker compose exec db mysqldump -u root -p school > backup_$(date +%F).sql
```

---

## 🗂️ Data Persistence

| Volume | What it stores |
|--------|---------------|
| `school_db_data` | MySQL database files |
| `storage_data` | Uploaded files (images, PDFs) |

> These volumes persist across container restarts. Use `docker compose down -v` only if you want a completely fresh start.

---

## 🐛 Troubleshooting

### App keeps restarting
```bash
docker compose logs app --tail=50
```
Check for: migration errors, missing env variables, or DB connection failures.

### Database connection refused
The app waits for MySQL to be healthy. If it takes too long, increase the retries in `docker/entrypoint.sh`.

### Storage files not showing
```bash
docker compose exec app php artisan storage:link
```

### Clear all caches
```bash
docker compose exec app php artisan optimize:clear
docker compose exec app php artisan optimize
```
