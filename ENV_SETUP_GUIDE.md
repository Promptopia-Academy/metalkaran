# راهنمای تنظیم فایل .env.local

## مکان فایل

فایل `.env.local` باید در **ریشه پروژه** (هم‌مسیر با `package.json`) ایجاد شود:

```
metalkaran/
├── .env.local  ← اینجا
├── package.json
├── next.config.ts
└── ...
```

## نحوه ایجاد

### روش 1: به صورت دستی

1. در ریشه پروژه فایل جدیدی با نام `.env.local` ایجاد کنید
2. محتوای زیر را در آن کپی کنید:

```env
# Email Configuration (اختیاری)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@metalkaran.com

# Authentication (توصیه می‌شود)
API_KEY=your-secure-api-key-here

# Optional
NODE_ENV=development
CORS_ORIGIN=*
LOG_LEVEL=info
```

### روش 2: از طریق Terminal

```bash
# در ریشه پروژه
copy .env.example .env.local
```

## تنظیمات

### 1. Email Configuration

برای فعال‌سازی ارسال ایمیل، مقادیر زیر را تنظیم کنید:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@metalkaran.com
```

**نکته:** برای Gmail باید App Password ایجاد کنید (نه رمز اصلی)

### 2. Authentication

برای محافظت از API endpoints، یکی از این دو را تنظیم کنید:

```env
# روش 1: API Key (ساده‌تر)
API_KEY=your-secure-api-key-here

# روش 2: JWT Secret
JWT_SECRET=your-jwt-secret-here
```

**توصیه:** در production حتماً یک کلید قوی و منحصر به فرد استفاده کنید.

### 3. Optional Settings

```env
NODE_ENV=development  # یا production
CORS_ORIGIN=*         # آدرس frontend برای production
LOG_LEVEL=info        # debug, info, warn, error
```

## نکات مهم

1. ✅ فایل `.env.local` در `.gitignore` است و commit نمی‌شود
2. ✅ بعد از تغییر فایل، سرور را restart کنید
3. ✅ هرگز فایل `.env.local` را در Git commit نکنید
4. ✅ در production، مقادیر واقعی و امن استفاده کنید

## بررسی فایل

برای بررسی اینکه فایل به درستی ایجاد شده:

```bash
# Windows
dir /a .env.local

# Linux/Mac
ls -la .env.local
```

## استفاده در کد

متغیرهای محیطی در کد به این شکل استفاده می‌شوند:

```typescript
process.env.API_KEY
process.env.SMTP_HOST
// ...
```

## مشکل‌یابی

### فایل پیدا نمی‌شود؟
- مطمئن شوید در ریشه پروژه (هم‌مسیر با `package.json`) است
- نام فایل دقیقاً `.env.local` باشد (نه `env.local`)

### تغییرات اعمال نمی‌شوند؟
- سرور را restart کنید
- در Next.js باید dev server را stop و دوباره start کنید

### خطای Environment Variable؟
- مطمئن شوید نام متغیرها درست است
- فاصله‌ها و کاراکترهای اضافی ندارند
- مقادیر در خط جدید نباشند

