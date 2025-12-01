# 🚀 راهنمای سریع Deploy

این یک راهنمای سریع برای deploy کردن پروژه روی سرور لینوکس است.

## ⚡ مراحل سریع

### 1️⃣ آماده‌سازی سرور

```bash
# نصب Node.js (اگر نصب نیست)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# نصب PM2
sudo npm install -g pm2

# نصب Nginx
sudo apt update && sudo apt install nginx -y
```

### 2️⃣ انتقال پروژه به سرور

```bash
# Clone از Git
cd /var/www
sudo git clone <repository-url> metalkaran
sudo chown -R $USER:$USER metalkaran
cd metalkaran
```

### 3️⃣ تنظیمات اولیه

```bash
# نصب dependencies
npm ci --production=false

# کپی و تنظیم environment variables
cp .env.production.example .env.production
nano .env.production  # مقادیر را تنظیم کنید

# Generate Prisma Client
npm run db:generate

# ساخت دیتابیس
npm run db:push

# Seed داده‌های اولیه (اختیاری)
npm run db:seed

# Build
npm run build
```

### 4️⃣ راه‌اندازی با PM2

```bash
# تنظیم مسیر در ecosystem.config.js
nano ecosystem.config.js  # مسیر cwd را بررسی کنید

# Start
pm2 start ecosystem.config.js

# Save و Startup
pm2 save
pm2 startup  # دستور نمایش داده شده را اجرا کنید
```

### 5️⃣ تنظیم Nginx

```bash
# تنظیم domain در nginx.conf
sudo nano /etc/nginx/sites-available/metalkaran
# محتوای nginx.conf را کپی کنید و domain را تغییر دهید

# فعال کردن
sudo ln -s /etc/nginx/sites-available/metalkaran /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6️⃣ تنظیم SSL

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 7️⃣ Firewall

```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

## ✅ بررسی

```bash
# بررسی PM2
pm2 status

# بررسی Nginx
sudo systemctl status nginx

# Test health endpoint
curl https://yourdomain.com/api/health
```

## 🔄 Update کردن

```bash
cd /var/www/metalkaran
npm run deploy
# یا
bash scripts/deploy.sh
```

## 📋 چک‌لیست

- [ ] Node.js و npm نصب شده
- [ ] PM2 نصب و پیکربندی شده
- [ ] Nginx نصب و پیکربندی شده
- [ ] `.env.production` تنظیم شده
- [ ] Database ساخته شده
- [ ] Application با PM2 در حال اجرا است
- [ ] Nginx در حال اجرا است
- [ ] SSL فعال شده
- [ ] Firewall تنظیم شده
- [ ] Domain به IP سرور اشاره می‌کند

## 🆘 مشکل‌یابی

### Application شروع نمی‌شود
```bash
pm2 logs metalkaran
pm2 restart metalkaran
```

### Nginx 502 Error
```bash
sudo tail -f /var/log/nginx/error.log
pm2 status  # بررسی که application در حال اجرا است
```

### Database Error
```bash
ls -la prisma/dev.db  # بررسی وجود فایل
npm run db:generate
```

---

**برای راهنمای کامل، به فایل `DEPLOYMENT_GUIDE.md` مراجعه کنید.**

