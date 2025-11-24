# مستندات API بکند Metalkaran

## معرفی

این مستندات شامل تمام endpointهای API بکند و نحوه استفاده از آن‌ها است.

## Base URL

```
http://localhost:3000/api
```

## احراز هویت (Authentication)

برای دسترسی به endpointهای محافظت شده، باید یکی از روش‌های زیر را استفاده کنید:

### روش 1: API Key

```
Authorization: Bearer YOUR_API_KEY
```

یا

```
API-Key: YOUR_API_KEY
```

یا

```
X-API-Key: YOUR_API_KEY
```

### روش 2: JWT Token

```
Authorization: Bearer YOUR_JWT_TOKEN
```

**نکته:** در محیط production، حتماً `JWT_SECRET` یا `API_KEY` را در فایل `.env.local` تنظیم کنید.

---

## Endpointها

### 1. Health Check

بررسی وضعیت سلامت سیستم

**Endpoint:** `GET /api/health`

**Authentication:** ❌ نیازی نیست

**Response:**

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600,
  "environment": "development",
  "version": "1.0.0",
  "services": {
    "api": "operational",
    "database": "operational",
    "email": "configured",
    "auth": "configured"
  },
  "checks": {
    "dataDirectory": true,
    "diskSpace": true
  },
  "responseTime": "5ms"
}
```

---

### 2. Articles API

#### 2.1. دریافت همه مقالات

**Endpoint:** `GET /api/article`

**Authentication:** ❌ نیازی نیست

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | ❌ | 1 | شماره صفحه |
| `limit` | number | ❌ | 10 | تعداد آیتم در هر صفحه (حداکثر 100) |
| `search` | string | ❌ | - | جستجو در محتوا |
| `sortBy` | string | ❌ | - | فیلد مرتب‌سازی |
| `sortOrder` | string | ❌ | desc | جهت مرتب‌سازی (asc/desc) |

**Example:**

```
GET /api/article?page=1&limit=10&search=aluminum&sortBy=title&sortOrder=asc
```

**Response:**

```json
{
  "success": true,
  "message": "Articles retrieved successfully",
  "data": [
    {
      "id": 1,
      "image": "https://example.com/image.jpg",
      "title": "مقاله نمونه",
      "introduction": "مقدمه مقاله...",
      "title1": "عنوان 1",
      "content1": "محتوا 1",
      "title2": "عنوان 2",
      "content2": "محتوا 2",
      "title3": "عنوان 3",
      "content3": "محتوا 3",
      "title4": "عنوان 4",
      "content4": "محتوا 4",
      "title5": "عنوان 5",
      "content5": "محتوا 5",
      "sources": "منابع"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

#### 2.2. دریافت یک مقاله

**Endpoint:** `GET /api/article?id={id}`

**Authentication:** ❌ نیازی نیست

**Example:**

```
GET /api/article?id=1
```

**Response:**

```json
{
  "success": true,
  "message": "Article retrieved successfully",
  "data": {
    "id": 1,
    "image": "https://example.com/image.jpg",
    "title": "مقاله نمونه",
    ...
  }
}
```

#### 2.3. ایجاد مقاله جدید

**Endpoint:** `POST /api/article`

**Authentication:** ✅ الزامی

**Request Body:**

```json
{
  "image": "https://example.com/image.jpg",
  "title": "مقاله جدید",
  "introduction": "مقدمه مقاله...",
  "title1": "عنوان 1",
  "content1": "محتوا 1",
  "title2": "عنوان 2",
  "content2": "محتوا 2",
  "title3": "عنوان 3",
  "content3": "محتوا 3",
  "title4": "عنوان 4",
  "content4": "محتوا 4",
  "title5": "عنوان 5",
  "content5": "محتوا 5",
  "sources": "منابع"
}
```

**Validation Rules:**

- `title`: حداقل 3 کاراکتر (الزامی)
- `introduction`: حداقل 10 کاراکتر (الزامی)
- `title1`: الزامی
- `content1`: الزامی
- سایر فیلدها اختیاری هستند

**Response:**

```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "id": 2,
    ...
  }
}
```

#### 2.4. بروزرسانی مقاله

**Endpoint:** `PUT /api/article?id={id}`

**Authentication:** ✅ الزامی

**Request Body:** (همه فیلدها اختیاری)

```json
{
  "title": "عنوان جدید",
  "introduction": "مقدمه جدید"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Article updated successfully",
  "data": {
    "id": 1,
    ...
  }
}
```

#### 2.5. حذف مقاله

**Endpoint:** `DELETE /api/article?id={id}`

**Authentication:** ✅ الزامی

**Example:**

```
DELETE /api/article?id=1
```

**Response:**

```json
{
  "success": true,
  "message": "Article deleted successfully"
}
```

---

### 3. Elements API

همه endpointهای Elements مشابه Articles هستند:

- `GET /api/element` - دریافت همه المنت‌ها (با pagination)
- `GET /api/element?id={id}` - دریافت یک المنت
- `POST /api/element` - ایجاد المنت جدید (محافظت شده)
- `PUT /api/element?id={id}` - بروزرسانی المنت (محافظت شده)
- `DELETE /api/element?id={id}` - حذف المنت (محافظت شده)

**Validation Rules برای Element:**

- `title`: حداقل 3 کاراکتر (الزامی)
- `introduction`: حداقل 10 کاراکتر (الزامی)
- `usage`: الزامی
- سایر فیلدها اختیاری هستند

---

### 4. Contact API

#### 4.1. ارسال پیام تماس

**Endpoint:** `POST /api/contact`

**Authentication:** ❌ نیازی نیست (اما Rate Limited)

**Rate Limit:** 5 درخواست در هر 15 دقیقه به ازای هر IP

**Request Body:**

```json
{
  "name": "نام کاربر",
  "phone": "09123456789",
  "email": "user@example.com",
  "company": "نام شرکت"
}
```

**Validation Rules:**

- `name`: حداقل 5 کاراکتر
- `phone`: حداقل 10 کاراکتر
- `email`: باید ایمیل معتبر باشد
- `company`: حداقل 2 کاراکتر

**Response:**

```json
{
  "success": true,
  "message": "پیام شما با موفقیت ارسال شد",
  "data": {
    "id": "1234567890",
    "name": "نام کاربر",
    "phone": "09123456789",
    "email": "user@example.com",
    "company": "نام شرکت",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Rate Limit Response (429):**

```json
{
  "success": false,
  "message": "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً 10 دقیقه دیگر تلاش کنید."
}
```

#### 4.2. دریافت همه پیام‌های تماس

**Endpoint:** `GET /api/contact`

**Authentication:** ✅ الزامی

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "1234567890",
      "name": "نام کاربر",
      "phone": "09123456789",
      "email": "user@example.com",
      "company": "نام شرکت",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### 5. Upload API

#### 5.1. آپلود فایل

**Endpoint:** `POST /api/upload`

**Authentication:** ✅ الزامی

**Content-Type:** `multipart/form-data`

**Form Data:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | ✅ | فایل تصویری (jpg, png, webp) |

**Limitations:**

- حداکثر حجم فایل: 5MB
- فرمت‌های مجاز: jpg, jpeg, png, webp

**Response:**

```json
{
  "success": true,
  "message": "عکس با موفقیت آپلود شد",
  "data": {
    "url": "/uploads/image-1234567890-abc123.jpg",
    "fileName": "image-1234567890-abc123.jpg",
    "size": 1234567,
    "type": "image/jpeg"
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "فقط فایل‌های تصویری (jpg, png, webp) مجاز هستند"
}
```

---

## کدهای خطا (Error Codes)

| Status Code | معنی |
|-------------|------|
| 200 | موفق |
| 201 | ایجاد شد |
| 400 | درخواست نامعتبر |
| 401 | احراز هویت نشده |
| 404 | یافت نشد |
| 429 | تعداد درخواست بیش از حد |
| 500 | خطای سرور |
| 503 | سرویس در دسترس نیست |

---

## Response Format

همه پاسخ‌ها به این فرمت هستند:

**موفق:**

```json
{
  "success": true,
  "message": "پیام موفقیت",
  "data": { ... }
}
```

**خطا:**

```json
{
  "success": false,
  "message": "پیام خطا",
  "errors": { ... } // در صورت وجود خطای validation
}
```

---

## مثال‌های استفاده

### cURL

```bash
# دریافت مقالات
curl http://localhost:3000/api/article

# ایجاد مقاله (با API Key)
curl -X POST http://localhost:3000/api/article \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "مقاله جدید",
    "introduction": "مقدمه مقاله",
    "title1": "عنوان 1",
    "content1": "محتوا 1"
  }'

# ارسال پیام تماس
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "نام کاربر",
    "phone": "09123456789",
    "email": "user@example.com",
    "company": "نام شرکت"
  }'

# آپلود فایل
curl -X POST http://localhost:3000/api/upload \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@/path/to/image.jpg"
```

### JavaScript/Fetch

```javascript
// دریافت مقالات با pagination
const response = await fetch('/api/article?page=1&limit=10&search=aluminum');
const data = await response.json();

// ایجاد مقاله
const response = await fetch('/api/article', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'مقاله جدید',
    introduction: 'مقدمه',
    title1: 'عنوان 1',
    content1: 'محتوا 1',
  }),
});
const data = await response.json();

// آپلود فایل
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
  },
  body: formData,
});
const data = await response.json();
```

---

## تنظیمات Environment Variables

برای فعال‌سازی تمام قابلیت‌ها، فایل `.env.local` را ایجاد کنید:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ADMIN_EMAIL=admin@metalkaran.com

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
API_KEY=your-api-key-here

# Optional
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=info
UPLOAD_MAX_SIZE=5242880
```

---

## نکات مهم

1. **Rate Limiting:** Contact API دارای محدودیت 5 درخواست در هر 15 دقیقه است.
2. **Backup System:** قبل از هر عملیات write (create/update/delete)، به صورت خودکار backup ایجاد می‌شود.
3. **Logging:** تمام درخواست‌ها و خطاها لاگ می‌شوند.
4. **Validation:** همه داده‌های ورودی با Zod validation بررسی می‌شوند.
5. **Security:** Headerهای امنیتی در همه پاسخ‌ها اعمال می‌شوند.

---

## Support

در صورت نیاز به کمک، با تیم توسعه تماس بگیرید.

