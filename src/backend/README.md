# Backend Documentation

## ساختار بکند

بکند Metalkaran با معماری لایه‌ای (Layered Architecture) طراحی شده است:

```
src/backend/
├── lib/          # کتابخانه‌های مشترک
│   ├── auth.ts           # سیستم احراز هویت
│   ├── email.ts          # سرویس ایمیل
│   ├── env.ts            # اعتبارسنجی Environment Variables
│   ├── logger.ts         # سیستم لاگینگ
│   └── rate-limit.ts     # Rate Limiting
├── routes/       # Route Handlers (API Endpoints)
│   ├── article.route.ts
│   ├── contact.route.ts
│   ├── element.route.ts
│   └── upload.route.ts
├── services/     # Business Logic
│   ├── article.service.ts
│   ├── contact.service.ts
│   ├── element.service.ts
│   └── upload.service.ts
└── utils/        # Utility Functions
    ├── article-storage.ts
    ├── element-storage.ts
    ├── storage.ts
    ├── file-utils.ts
    ├── pagination.ts
    └── backup.ts
```

## ویژگی‌های پیاده‌سازی شده

### ✅ Authentication & Authorization
- پشتیبانی از JWT و API Key
- محافظت از endpointهای write (POST, PUT, DELETE)
- Middleware برای احراز هویت

### ✅ Validation
- Zod schemas برای تمام endpointها
- اعتبارسنجی خودکار داده‌های ورودی
- پیام‌های خطای فارسی

### ✅ Pagination & Search
- صفحه‌بندی برای Articles و Elements
- جستجو در محتوا
- مرتب‌سازی (Sorting)

### ✅ Logging
- سیستم لاگینگ ساختاریافته
- سطوح مختلف: debug, info, warn, error
- لاگ درخواست‌ها با زمان پاسخ

### ✅ Rate Limiting
- محدودیت 5 درخواست در 15 دقیقه برای Contact API
- تشخیص IP از headerهای مختلف

### ✅ Email Service
- ارسال ایمیل به ادمین
- ارسال ایمیل تایید به کاربر
- پشتیبانی از RTL و HTML

### ✅ Backup System
- پشتیبان‌گیری خودکار قبل از write operations
- نگهداری آخرین 10 backup
- مدیریت خودکار backupهای قدیمی

### ✅ Health Check
- Endpoint برای بررسی سلامت سیستم
- بررسی وضعیت سرویس‌ها

### ✅ CORS Configuration
- پیکربندی CORS در Next.js config
- Headerهای امنیتی

### ✅ Request Size Limits
- محدودیت 10MB برای request body

## نحوه استفاده

### 1. تنظیم Environment Variables

فایل `.env.local` را از `.env.example` کپی کنید و مقادیر را تنظیم کنید:

```bash
cp .env.example .env.local
```

### 2. فعال‌سازی Authentication

برای محافظت از API در production:

```env
API_KEY=your-secure-api-key-here
# یا
JWT_SECRET=your-jwt-secret-here
```

### 3. فعال‌سازی Email Service

برای ارسال ایمیل:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@metalkaran.com
```

### 4. استفاده از API

مستندات کامل API در فایل `BACKEND_API_DOCUMENTATION.md` موجود است.

## تست

برای تست endpointها:

```bash
# Health Check
curl http://localhost:3000/api/health

# دریافت مقالات
curl http://localhost:3000/api/article

# ایجاد مقاله (با API Key)
curl -X POST http://localhost:3000/api/article \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "introduction": "Test intro", ...}'
```

## لاگ‌ها

لاگ‌ها در کنسول نمایش داده می‌شوند. سطح لاگ را می‌توانید با `LOG_LEVEL` تنظیم کنید:

```env
LOG_LEVEL=debug  # debug, info, warn, error
```

## Backup

Backupهای خودکار در `data/backups/` ذخیره می‌شوند. آخرین 10 backup نگه داشته می‌شود.

## نکات مهم

1. در production حتماً `API_KEY` یا `JWT_SECRET` را تنظیم کنید
2. Backupهای قدیمی به صورت خودکار پاک می‌شوند (آخرین 10 backup)
3. Rate limiting فقط برای Contact API فعال است
4. Email service در صورت عدم تنظیم، غیرفعال است

