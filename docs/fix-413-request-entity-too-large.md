# رفع خطای 413 (Request Entity Too Large) در افزودن محصول

وقتی با `POST /api/cms/products-full` محصول اضافه می‌کنید و درخواست شامل تصویر یا FormData حجیم است، سرور ممکن است **413 Request Entity Too Large** برگرداند.

این محدودیت در **دو جا** باید بررسی شود:

---

## ۱. Nginx (پیشنهاد اول)

اگر جلوی بک‌اند Nginx دارید، حد مجاز حجم بدنهٔ درخواست به‌طور پیش‌فرض کم است (مثلاً ۱ مگ).

**کار:** داخل بلوک `server` مربوط به دامنه (مثلاً `metalkarantech.ir` یا `metalkarantech.com`) این خط را اضافه کنید:

```nginx
client_max_body_size 20M;
```

مثال:

```nginx
server {
    listen 80;
    server_name metalkarantech.ir www.metalkarantech.ir;

    client_max_body_size 20M;   # برای آپلود تصویر محصول و FormData

    location / {
        proxy_pass http://localhost:3001;
        # ...
    }

    location /api {
        proxy_pass http://localhost:3000;
        # ...
    }
}
```

بعد از تغییر، Nginx را ریلود کنید:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## ۲. بک‌اند (Express / Multer)

اگر 413 از خود اپلیکیشن Node (قبل از Nginx) بیاید، باید در پروژه **metalkaranBackend** این موارد را چک کنید:

- **Body parser**: اگر از `express.json()` یا `express.urlencoded()` استفاده می‌کنید، می‌توانید حد را زیاد کنید، مثلاً:
  ```js
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));
  ```
- **Multer** (برای آپلود فایل در `POST /api/cms/products-full`): در تنظیمات multer حد حجم فایل را افزایش دهید، مثلاً:
  ```js
  const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 20 * 1024 * 1024 }  // 20 MB
  });
  ```

اگر محدودیت در multer باشد، ممکن است به‌جای 413، خطای **400** با پیام `LIMIT_FILE_SIZE` برگردد (طبق `BACKEND-AUTH-INTEGRATION.md`).

---

## خلاصه

| منبع خطا | کار |
|----------|-----|
| Nginx    | در `server` اضافه کنید: `client_max_body_size 20M;` و سپس `nginx -t && systemctl reload nginx` |
| Express  | `express.json({ limit: '20mb' })` و `express.urlencoded({ limit: '20mb' })` |
| Multer   | `limits: { fileSize: 20 * 1024 * 1024 }` (۲۰ مگابایت) |

بعد از تغییر هر دو (در صورت استفاده از Nginx و بک‌اند)، دوباره افزودن محصول با تصویر را تست کنید.
