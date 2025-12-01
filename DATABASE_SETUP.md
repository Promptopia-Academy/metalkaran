# راهنمای راه‌اندازی دیتابیس

## مراحل نصب و راه‌اندازی

### 1. نصب Prisma

```bash
npm install prisma @prisma/client
npm install -D prisma tsx
```

### 2. تنظیم DATABASE_URL

در فایل `.env.local` اضافه کنید:

```env
DATABASE_URL="file:./prisma/dev.db"
```

### 3. تولید Prisma Client

```bash
npm run db:generate
```

### 4. ایجاد دیتابیس و Migration

```bash
npm run db:push
```

یا برای استفاده از Migration (توصیه می‌شود):

```bash
npm run db:migrate
```

### 5. اضافه کردن داده‌های Mock

```bash
npm run db:seed
```

### 6. مشاهده دیتابیس (اختیاری)

```bash
npm run db:studio
```

این دستور Prisma Studio را باز می‌کند که یک رابط گرافیکی برای مشاهده و ویرایش داده‌ها است.

---

## ساختار دیتابیس

### Tables (Tables)

#### 1. Article
- `id` (Int, Primary Key, Auto Increment)
- `image` (String, Optional)
- `title` (String, Required)
- `introduction` (Text, Required)
- `title1` تا `title5` (String, Optional)
- `content1` تا `content5` (Text, Optional)
- `sources` (Text, Optional)
- `createdAt` (DateTime, Auto)
- `updatedAt` (DateTime, Auto Updated)

**Index:** `title`

#### 2. Element
- `id` (Int, Primary Key, Auto Increment)
- `image` (String, Optional)
- `title` (String, Required)
- `introduction` (Text, Required)
- `usage` (Text, Required)
- سایر فیلدها (Optional)
- `createdAt` (DateTime, Auto)
- `updatedAt` (DateTime, Auto Updated)

**Index:** `title`

#### 3. Contact
- `id` (String, Primary Key, CUID)
- `name` (String, Required)
- `phone` (String, Required)
- `email` (String, Required)
- `company` (String, Required)
- `createdAt` (DateTime, Auto)

**Indexes:** `email`, `createdAt`

#### 4. RateLimit
- `id` (Int, Primary Key, Auto Increment)
- `ip` (String, Required)
- `count` (Int, Default: 1)
- `resetTime` (BigInt, Required)
- `createdAt` (DateTime, Auto)

**Indexes:** `ip`, `resetTime`
**Unique:** `(ip, resetTime)`

---

## داده‌های Mock

پس از اجرای `npm run db:seed`، داده‌های زیر اضافه می‌شوند:

### Articles (2 مورد)
1. نوار آلومینیوم
2. ورق فولاد

### Elements (3 مورد)
1. آلومینیوم 6061
2. فولاد ضد زنگ 304
3. آلیاژ قلع

### Contacts (2 مورد نمونه)

---

## دستورات Prisma

### Generate Client
```bash
npm run db:generate
```
تولید Prisma Client بر اساس Schema

### Database Push
```bash
npm run db:push
```
اعمال تغییرات Schema به دیتابیس بدون Migration

### Migration
```bash
npm run db:migrate
```
ایجاد و اعمال Migration

### Seed
```bash
npm run db:seed
```
اضافه کردن داده‌های اولیه

### Studio
```bash
npm run db:studio
```
باز کردن Prisma Studio برای مدیریت داده‌ها

---

## تفاوت با سیستم قبلی

### ✅ مزایای دیتابیس
- **عملکرد بهتر:** Queryهای بهینه و Indexed
- **Reliability:** ACID compliance
- **Relations:** امکان ایجاد روابط بین جداول
- **Type Safety:** Type-safe queries با Prisma
- **Migration:** مدیریت نسخه‌های Schema
- **Backup:** امکان Backup و Restore آسان‌تر

### 📊 Migration از JSON
داده‌های موجود در `data/*.json` به دیتابیس منتقل نشده‌اند. اگر داده‌ای دارید:

1. از Prisma Studio استفاده کنید: `npm run db:studio`
2. یا یک Script Migration بنویسید

---

## نکات مهم

1. **Prisma Client:** بعد از هر تغییر Schema، باید `npm run db:generate` را اجرا کنید
2. **Migration:** در Production از `db:migrate` استفاده کنید
3. **Backup:** فایل `prisma/dev.db` را در `.gitignore` نگه دارید
4. **Production:** برای Production می‌توانید از PostgreSQL استفاده کنید

---

## تغییر به PostgreSQL (اختیاری)

در `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

و در `.env.local`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/metalkaran"
```

