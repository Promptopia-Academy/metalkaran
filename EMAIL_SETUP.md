# راهنمای تنظیم ارسال ایمیل

## تنظیمات Environment Variables

برای فعال‌سازی ارسال ایمیل، باید فایل `.env.local` در ریشه پروژه ایجاد کنید و متغیرهای زیر را تنظیم کنید:

```env
# تنظیمات SMTP برای ارسال ایمیل
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# ایمیل ادمین (ایمیلی که پیام‌های فرم تماس به آن ارسال می‌شود)
ADMIN_EMAIL=admin@metalkaran.com
```

## تنظیمات برای Gmail

1. **فعال‌سازی 2-Step Verification:**

   - به [Google Account Settings](https://myaccount.google.com/) بروید
   - Security → 2-Step Verification را فعال کنید

2. **ایجاد App Password:**
   - Security → App passwords
   - یک App Password جدید برای "Mail" ایجاد کنید
   - این رمز را در `SMTP_PASS` قرار دهید (نه رمز اصلی Gmail)

## تنظیمات برای سایر سرویس‌های ایمیل

### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Yahoo

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

### سایر سرویس‌ها

- `SMTP_HOST`: آدرس سرور SMTP
- `SMTP_PORT`: پورت (معمولاً 587 برای TLS یا 465 برای SSL)
- `SMTP_SECURE`: `true` برای SSL (پورت 465) یا `false` برای TLS (پورت 587)

## تست تنظیمات

پس از تنظیم متغیرهای محیطی:

1. سرور را restart کنید
2. یک فرم تماس را پر کنید و ارسال کنید
3. بررسی کنید که ایمیل به `ADMIN_EMAIL` ارسال شده باشد
4. بررسی کنید که ایمیل تایید به کاربر ارسال شده باشد

## نکات امنیتی

- **هرگز** فایل `.env.local` را در Git commit نکنید
- از App Password استفاده کنید، نه رمز اصلی
- در production، از سرویس‌های ایمیل حرفه‌ای استفاده کنید (SendGrid, Mailgun, etc.)
