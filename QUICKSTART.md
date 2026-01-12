# Quick Start Guide - VPS Deployment

## 🚀 Deploy in 5 Minutes

### Step 1: Prepare Your VPS
```bash
# SSH into your VPS
ssh root@your-vps-ip

# Update system
apt update && apt upgrade -y
```

### Step 2: Upload Project
```bash
# On your local machine
tar -czf school.tar.gz .
scp school.tar.gz root@your-vps-ip:/root/

# On VPS
mkdir -p /var/www/school
cd /var/www/school
tar -xzf /root/school.tar.gz
```

### Step 3: Deploy
```bash
cd /var/www/school
chmod +x deploy-vps.sh

# Set your domain and email
export DOMAIN="yourdomain.com"
export EMAIL="admin@yourdomain.com"

# Run deployment
sudo ./deploy-vps.sh
```

### Step 4: Create Admin User
```bash
docker exec -it school-app-prod php artisan tinker

# In tinker console:
User::create(['name' => 'Admin', 'email' => 'admin@yourdomain.com', 'password' => bcrypt('YourStrongPassword')]);
exit
```

### Done! 🎉
Visit: https://yourdomain.com

---

## 📊 Daily Management

```bash
# View logs
./prod-manage.sh logs

# Check status
./prod-manage.sh status

# Restart
./prod-manage.sh restart

# Backup
./prod-manage.sh backup
```

---

## 🔒 Security Checklist

- [ ] SSL certificates installed
- [ ] Firewall enabled (ports 80, 443, 22)
- [ ] Strong passwords set
- [ ] Backups configured
- [ ] Monitoring enabled

---

## 📚 Need More Help?

Read the full guide: **DEPLOYMENT.md**
