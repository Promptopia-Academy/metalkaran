# راهنمای اضافه کردن Auth Middleware به بک‌اند

## ۱. ایجاد فایل middleware

فایل `middleware/auth.ts` رو توی پروژه **metalkaranBackend** بساز (یا محتوای `backend-auth-middleware.ts` رو کپی کن):

```ts
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production";

export interface JwtPayload {
  id: number;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "توکن ارسال نشده است" });
    return;
  }

  const token = authHeader.slice(7);
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "توکن نامعتبر یا منقضی است" });
  }
}
```

## ۲. اضافه کردن import در server

بالای فایل سرور:

```ts
import { authMiddleware } from "./middleware/auth";
```

## ۳. اعمال middleware روی مسیرهای محافظت‌شده

**جای دقیق**: بعد از تعریف `jsonGet` و `jsonPost` و **قبل از اولین خط `app.get("/api/cms/..."`** این دو خط رو اضافه کن:

```ts
// محافظت از CMS - همه مسیرهای /api/cms نیاز به توکن JWT دارن
app.use("/api/cms", authMiddleware);

// محافظت از آپلود - فقط کاربر لاگین‌شده
app.post("/api/upload-image", authMiddleware, (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "حجم فایل نباید بیشتر از ۵ مگابایت باشد" });
      }
      return res.status(400).json({ error: (err as Error).message || "خطا در آپلود" });
    }
    next();
  });
}, (req, res) => {
  if (!req.file) return res.status(400).json({ error: "فایل تصویر ارسال نشده است" });
  res.json({ path: "/uploads/" + req.file.filename });
});
```

**نکته**: خط `app.post("/api/upload-image", ...)` قبلی رو حذف کن و همین بلوک جایگزینش کن.

همین‌طور `app.post("/api/upload", ...)` رو با نسخه‌ی محافظت‌شده عوض کن:

```ts
app.post("/api/upload", authMiddleware, (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "حجم فایل نباید بیشتر از ۵ مگابایت باشد" });
      }
      return res.status(400).json({ error: err.message || "خطا در آپلود" });
    }
    next();
  });
}, (req, res) => {
  // ... handler قبلی
});
```

## ۴. لیست routeهایی که با `app.use("/api/cms", authMiddleware)` محافظت می‌شن

همه این‌ها باید **authMiddleware** قبل از handler داشته باشن:

- `POST /api/upload-image`
- `POST /api/upload`
- همه `POST /api/cms/*`
- همه `PUT /api/cms/*`
- همه `DELETE /api/cms/*`

روت‌های `GET /api/cms/*` هم بهتره محافظت بشن تا فقط ادمین لاگین‌شده بتونه بخونه.

## ۵. فرانت‌اند

فرانت باید توکن JWT رو بعد از لاگین از `POST /api/auth/login` بگیره و توی `localStorage` ذخیره کنه (کلید: `admin_api_key`) و در هر درخواست به CMS این هدر رو بفرسته:

```
Authorization: Bearer <token>
```

**نکته مهم**: توکن برگشتی از لاگین یک JWT است (فقط کاراکترهای ASCII) و مشکلی برای هدرهای HTTP ایجاد نمی‌کند. صفحه تنظیمات فعلی می‌تونه برای ذخیره دستی توکن استفاده بشه (بعد از لاگین در یک صفحه جدا، توکن رو کپی کن و بذار) ولی پیشنهاد می‌شه صفحه لاگین واقعی بسازید که با `api.login(username, password)` لاگین کنه و توکن رو خودکار ذخیره کنه.
