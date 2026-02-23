# راهنمای Deploy فرانت روی سرور

این پروژه به بکند (`metalkaranBackend`) وصل شده و آماده deploy است.

---

## مسیر روی سرور

```
/var/www/metalkaran-frontend
```

---

## مراحل Deploy

### ۱. کلون از Git

```bash
cd /var/www
sudo mkdir -p metalkaran-frontend
sudo chown $USER:$USER metalkaran-frontend
cd metalkaran-frontend

# کلون ریپو فرانت (metalkaran)
git clone https://github.com/Promptopia-Academy/metalkaran.git .
```

### ۲. نصب و Build

```bash
npm install
cp .env.example .env.local

# برای Production: NEXT_PUBLIC_API_URL خالی بذار (همان origin)
# ویرایش .env.local:
# NEXT_PUBLIC_API_URL=
# NEXT_PUBLIC_SITE_URL=https://metalkarantech.com

npm run build
```

### ۳. اجرا با PM2

```bash
pm2 start npm --name "metalkaran-frontend" -- start
pm2 save
pm2 startup
```

**یا** با `ecosystem.config.js`:

```javascript
// ecosystem.config.js در پروژه فرانت
module.exports = {
  apps: [{
    name: "metalkaran-frontend",
    script: "node_modules/next/dist/bin/next",
    args: "start",
    cwd: "/var/www/metalkaran-frontend",
    env: { PORT: 3001 },
  }],
};
```

سپس:
```bash
pm2 start ecosystem.config.js
```

### ۴. بروزرسانی بعدی

```bash
cd /var/www/metalkaran-frontend
git pull
npm install
npm run build
pm2 restart metalkaran-frontend
```

---

## تنظیمات Nginx

بکند روی پورت **3000**، فرانت روی **3001**.

**مهم (رفع خطای 413 در افزودن محصول)**: برای آپلود تصویر و FormData محصولات، حد مجاز حجم درخواست را افزایش بده. داخل بلوک `server` این خط را اضافه کن:

```nginx
client_max_body_size 20M;
```

مثال کامل:

```nginx
server {
    listen 80;
    server_name metalkarantech.com www.metalkarantech.com;

    # حد مجاز حجم بدنه درخواست (برای آپلود تصویر محصول و FormData) — رفع 413
    client_max_body_size 20M;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /uploads {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
    }
}
```

---

## متغیرهای محیطی

| متغیر | Production | Development |
|-------|-----------|-------------|
| `NEXT_PUBLIC_API_URL` | خالی یا حذف | `http://localhost:3001` |
| `NEXT_PUBLIC_SITE_URL` | `https://metalkarantech.com` | `http://localhost:3000` |
