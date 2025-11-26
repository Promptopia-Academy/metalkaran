# راهنمای کامل Deploy روی سرور لینوکس

این راهنما نحوه deploy کردن پروژه Metalkaran روی یک سرور لینوکس را به شما نشان می‌دهد.

## پیش‌نیازها

### نرم‌افزارهای مورد نیاز روی سرور

```bash
# Node.js (v20 یا بالاتر)
node --version

# npm
npm --version

# Git
git --version

# PM2 (برای مدیریت process)
npm install -g pm2

# Nginx (برای reverse proxy)
sudo apt update
sudo apt install nginx -y

# PostgreSQL (اختیاری - بهتر از SQLite برای production)
sudo apt install postgresql postgresql-contrib -y
```

## مراحل Deployment

### 1. آماده‌سازی پروژه

#### 1.1. Build کردن پروژه

```bash
# در محیط development
npm run build
```

#### 1.2. تست کردن Build

```bash
npm start
# اطمینان حاصل کنید که همه چیز کار می‌کند
```

### 2. انتقال به سرور

#### روش 1: از طریق Git (توصیه می‌شود)

```bash
# روی سرور
cd /var/www
git clone https://github.com/your-username/metalkaran.git
cd metalkaran
```

#### روش 2: از طریق SCP

```bash
# از ماشین local
scp -r ./metalkaran user@your-server:/var/www/
```

### 3. تنظیمات روی سرور

#### 3.1. نصب Dependencies

```bash
cd /var/www/metalkaran
npm ci --production=false
```

#### 3.2. تنظیم Environment Variables

```bash
# ایجاد فایل .env.production
nano .env.production
```

محتوای فایل `.env.production`:

```env
# Database
DATABASE_URL="file:./prisma/dev.db"
# یا برای PostgreSQL:
# DATABASE_URL="postgresql://user:password@localhost:5432/metalkaran"

# Application
NODE_ENV=production
API_BASE_URL=https://yourdomain.com
CORS_ORIGIN=https://yourdomain.com

# Authentication (حتماً تنظیم کنید!)
API_KEY=your-super-secret-api-key-here-minimum-32-characters

# Email (اختیاری)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@yourdomain.com

# Optional
LOG_LEVEL=info
UPLOAD_MAX_SIZE=10485760
```

#### 3.3. ساخت Database و Migration

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# یا استفاده از Migration (توصیه می‌شود)
npm run db:migrate

# Seed داده‌های اولیه (اختیاری)
npm run db:seed
```

#### 3.4. Build کردن برای Production

```bash
npm run build
```

### 4. راه‌اندازی با PM2

#### 4.1. ایجاد PM2 Config

فایل `ecosystem.config.js` را ایجاد کنید (در ریشه پروژه):

```bash
nano ecosystem.config.js
```

#### 4.2. شروع Application

```bash
# Start با PM2
pm2 start ecosystem.config.js

# ذخیره configuration برای restart خودکار
pm2 save

# فعال کردن startup script
pm2 startup
```

### 5. تنظیم Nginx (Reverse Proxy)

#### 5.1. ایجاد Nginx Config

```bash
sudo nano /etc/nginx/sites-available/metalkaran
```

#### 5.2. فعال کردن Site

```bash
sudo ln -s /etc/nginx/sites-available/metalkaran /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. تنظیم SSL (HTTPS)

```bash
# نصب Certbot
sudo apt install certbot python3-certbot-nginx -y

# دریافت SSL Certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 7. تنظیم Firewall

```bash
# فعال کردن UFW
sudo ufw enable

# باز کردن پورت‌های لازم
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS

# بررسی وضعیت
sudo ufw status
```

## دستورات مفید

### PM2 Commands

```bash
# مشاهده وضعیت
pm2 status

# مشاهده لاگ‌ها
pm2 logs metalkaran

# Restart
pm2 restart metalkaran

# Stop
pm2 stop metalkaran

# Delete
pm2 delete metalkaran

# Monitor (real-time)
pm2 monit
```

### Nginx Commands

```bash
# Test configuration
sudo nginx -t

# Reload
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx

# Status
sudo systemctl status nginx
```

### Database Commands

```bash
# مشاهده دیتابیس با Prisma Studio
npm run db:studio

# Backup دیتابیس (برای SQLite)
cp prisma/dev.db prisma/dev.db.backup

# Backup (برای PostgreSQL)
pg_dump -U user metalkaran > backup.sql
```

## Update کردن Application

```bash
cd /var/www/metalkaran

# Pull تغییرات جدید
git pull origin main

# نصب dependencies جدید
npm ci --production=false

# Generate Prisma Client
npm run db:generate

# Run migrations
npm run db:migrate

# Build
npm run build

# Restart PM2
pm2 restart metalkaran
```

## Monitoring

### Health Check

```bash
# بررسی سلامت application
curl http://localhost:3000/api/health

# یا از طریق domain
curl https://yourdomain.com/api/health
```

### Logs

```bash
# Application logs
pm2 logs metalkaran --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Backup Strategy

### روزانه Backup

```bash
# ایجاد یک cron job برای backup
crontab -e

# اضافه کردن این خط (هر روز ساعت 2 صبح)
0 2 * * * /var/www/metalkaran/scripts/backup.sh
```

## Troubleshooting

### Application شروع نمی‌شود

```bash
# بررسی لاگ‌ها
pm2 logs metalkaran --err

# بررسی که پورت 3000 در استفاده است
netstat -tulpn | grep 3000

# بررسی Environment Variables
pm2 env metalkaran
```

### Database Connection Error

```bash
# بررسی DATABASE_URL
echo $DATABASE_URL

# بررسی permissions دیتابیس
ls -la prisma/dev.db

# Test database connection
npm run db:studio
```

### Nginx 502 Bad Gateway

```bash
# بررسی که application در حال اجرا است
pm2 status

# بررسی لاگ‌های Nginx
sudo tail -f /var/log/nginx/error.log

# بررسی که PM2 روی پورت 3000 است
pm2 info metalkaran
```

## Security Checklist

- [ ] Environment variables امن تنظیم شده‌اند
- [ ] API_KEY قوی تنظیم شده
- [ ] SSL/HTTPS فعال است
- [ ] Firewall تنظیم شده
- [ ] Database backup فعال است
- [ ] Logs در حال monitoring هستند
- [ ] Regular updates انجام می‌شوند

## نکات مهم

1. **هرگز** فایل `.env.production` را در Git commit نکنید
2. **همیشه** قبل از deploy، تست کنید
3. **حتماً** backup بگیرید قبل از migration
4. **مرتب** لاگ‌ها را بررسی کنید
5. **به‌روز** نگه دارید dependencies و security patches

---

## راهنمای سریع (Quick Start)

```bash
# 1. Clone و Setup
cd /var/www && git clone <repo-url> metalkaran && cd metalkaran
npm ci --production=false

# 2. Environment
cp .env.example .env.production
nano .env.production  # مقادیر را تنظیم کنید

# 3. Database
npm run db:generate
npm run db:push

# 4. Build
npm run build

# 5. Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 6. Setup Nginx
sudo cp nginx.conf /etc/nginx/sites-available/metalkaran
sudo ln -s /etc/nginx/sites-available/metalkaran /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 7. SSL
sudo certbot --nginx -d yourdomain.com
```

---

برای سوالات بیشتر، به مستندات فایل‌های دیگر مراجعه کنید.

