# پارامتر بک‌اند — جداول و APIها

این سند را به تیم بک‌اند بدهید تا جداول دیتابیس و APIهای موردنیاز فرانت را پیاده‌سازی کنند.

---

## ۱. جداول دیتابیس

### ۱.۱ احراز هویت و تماس
| جدول | ستون‌ها |
|------|---------|
| **users** | id (PK), username (unique), password (hash), created_at |
| **contacts** | id (PK), name, phone, email, company, created_at |
| **contact_form_data** | id (PK), name, phone, email, company, created_at |

### ۱.۲ محتوای اصلی (محصولات و دسته‌بندی)
| جدول | ستون‌ها |
|------|---------|
| **categories** | id (PK), slug (unique), title, image (nullable), created_at |
| **usages** | id (PK — می‌تواند integer یا string/UUID باشد؛ فرانت id را string می‌خواند), title, image, created_at |
| **product_usages** | product_id (FK → products_full.id), usage_id (FK → usages.id) — جدول رابطه N:N |
| **products_full** | id (PK), category_id (FK → categories.id), image, title, slug (unique), introduction, description, standards, thermal_expansion, corrosion_resistance, heat_resistance, manufacturing, hot_forming, cold_forming, welding, machining, created_at |
| **chemical_compositions** | id (PK), product_id (FK → products_full.id), slug, title, value |
| **mechanical_properties** | id (PK), product_id (FK → products_full.id, unique), hardness, elastic_modulus, elongation, yield_strength, tensile_strength |
| **physical_properties** | id (PK), product_id (FK → products_full.id, unique), density, electrical_resistivity, melting_point, molar_heat_capacity |

**نکته:** یک محصول می‌تواند علاوه بر لینک به usages از طریق product_usages، کاربردهای «ریپیتینگ» (عنوان + تصویر) هم داشته باشد که یا در جدول جدا ذخیره می‌شوند یا در یک ستون JSON در products_full.

### ۱.۳ مقالات و کاربردها
| جدول | ستون‌ها |
|------|---------|
| **applications** | id (PK), slug, fa_title, description |
| **article_applications** | article_id (FK → articles.id), application_id (FK → applications.id) — جدول رابطه N:N |
| **articles** | id (PK), image, title, introduction, title1, content1, title2, content2, title3, content3, title4, content4, title5, content5, application_title (nullable), created_at |
| **article_sources** | id (PK), article_id (FK → articles.id), title, url |

### ۱.۴ صفحات سایت (CMS)
| جدول | ستون‌ها |
|------|---------|
| **hero_sections** | id (PK), src, alt — برای اسلایدر و لوگو |
| **home_page_about** | id (PK), title, detail, extra_title, extra_detail |
| **about_us_page_cards** | id (PK), image, title |
| **about_us_page_why_us** | id (PK), title, description |
| **about_us_page_descriptions** | id (PK), image, alt, width, height, title, content_class_name, description |
| **contact_us_page_data** | id (PK), main_paragraph, sub_paragraph |
| **company_information** | id (PK), phone_number, email_address, company_address (nullable) |
| **company_social_links** | id (PK), company_information_id (FK، اختیاری) یا بدون FK در صورت یک رکورد company, title, url |
| **questions** | id (PK), question, answer |

---

## ۲. APIهای موردنیاز

**پایه آدرس:** همه زیر `/api` هستند.  
**احراز ادمین:** هر endpoint که با `[Auth]` مشخص شده باید با توکن Bearer محافظت شود.  
**فرمت پاسخ:** ترجیحاً snake_case در JSON؛ فرانت در صورت نیاز به camelCase تبدیل می‌کند.

---

### ۲.۱ احراز هویت
| متد | مسیر | Auth | بدنه درخواست | پاسخ |
|-----|------|------|---------------|------|
| POST | /api/auth/login | خیر | `{ "username": string, "password": string }` | `{ "token": string }` یا `{ "error": string }` |

---

### ۲.۲ آپلود
| متد | مسیر | Auth | بدنه | پاسخ |
|-----|------|------|------|------|
| POST | /api/upload-image | بله | FormData با فیلد `image` (فایل) | `{ "path": string }` — مسیر نسبی/کامل تصویر |

---

### ۲.۳ دسته‌بندی (Categories)
| متد | مسیر | Auth | توضیح |
|-----|------|------|--------|
| GET | /api/site/categories | خیر | لیست دسته‌بندی‌ها برای سایت. پاسخ: آرایه اشیاء با id, slug, title, image |
| GET | /api/cms/categories | بله | لیست دسته‌بندی‌ها برای ادمین |
| GET | /api/cms/categories/:id | بله | یک دسته با id |
| POST | /api/cms/categories | بله | ایجاد. بدنه: `{ slug, title, image? }` |
| PUT | /api/cms/categories/:id | بله | ویرایش. بدنه: `{ slug, title, image? }` |
| DELETE | /api/cms/categories/:id | بله | حذف |

---

### ۲.۴ کاربردها (Usages)
| متد | مسیر | Auth | توضیح |
|-----|------|------|--------|
| GET | /api/cms/usages | بله | لیست کاربردها. پاسخ: آرایه با id, title, image (id در فرانت به صورت string استفاده می‌شود) |

---

### ۲.۵ محصولات (Products Full)
| متد | مسیر | Auth | توضیح |
|-----|------|------|--------|
| GET | /api/site/products | خیر | لیست محصولات. هر آیتم شامل: category (object), usage (آرایه), chemicalComposition, mechanicalProperties, physicalProperties و بقیه فیلدهای محصول |
| GET | /api/site/products/:id | خیر | یک محصول با همان ساختار برای سایت |
| GET | /api/cms/products-full | بله | لیست محصولات ادمین (با pagination در صورت نیاز) |
| GET | /api/cms/products-full/:id | بله | یک محصول برای ادمین؛ علاوه بر فیلدهای بالا، `usageIds` (آرایه یا رشته جدا شده با کاما) برای ویرایش |
| POST | /api/cms/products-full | بله | ایجاد محصول. بدنه: FormData — title, slug, introduction, description, categoryId (عدد یا خالی), standards?, thermalExpansion?, corrosionResistance?, heatResistance?, manufacturing?, hotForming?, coldForming?, welding?, machining?, image? (فایل), usageIds? (رشته مثلاً "1,2,3"), usages? (JSON string آرایه `[{title, image}]`), chemicalComposition? (JSON string آرایه `[{slug, title, value}]`). **برای جلوگیری از 413:** حد body (و در صورت استفاده از multer، حد حجم فایل) را حداقل ۱۰–۲۰ مگابایت قرار دهید؛ Nginx هم باید `client_max_body_size` مناسب داشته باشد (ر.ک. docs/fix-413-request-entity-too-large.md). |
| PUT | /api/cms/products-full/:id | بله | ویرایش. بدنه: JSON — همان فیلدها به صورت JSON (image می‌تواند URL رشته باشد؛ usageIds به صورت رشته یا آرایه) |
| DELETE | /api/cms/products-full/:id | بله | حذف محصول |

---

### ۲.۶ مقالات (Articles)
| متد | مسیر | Auth | توضیح |
|-----|------|------|--------|
| GET | /api/site/articles | خیر | لیست مقالات. هر آیتم شامل: sources (آرایه), application (آرایه اشیاء با id, slug, faTitle, description) |
| GET | /api/site/articles/:id | خیر | یک مقاله با sources و application |
| GET | /api/cms/articles | بله | لیست مقالات ادمین |
| GET | /api/cms/articles/:id | بله | یک مقاله برای ادمین با sources و application؛ در صورت نیاز applicationIds برای فرم |
| POST | /api/cms/articles | بله | ایجاد. بدنه JSON: title, image?, introduction, title1, content1, title2?, content2?, title3?, content3?, title4?, content4?, title5?, content5? |
| PUT | /api/cms/articles/:id | بله | ویرایش. بدنه JSON: همان فیلدها + applicationTitle? |
| DELETE | /api/cms/articles/:id | بله | حذف |

---

### ۲.۷ فرم تماس و داده تماس
| متد | مسیر | Auth | توضیح |
|-----|------|------|--------|
| POST | /api/cms/contact-form-data | خیر | ثبت فرم تماس. بدنه: `{ name, phone, email, company }` — پاسخ: `{ message?: string }` |
| GET | /api/cms/contact-form-data | بله | لیست پیام‌های فرم تماس. پاسخ: آرایه با id, name, phone, email, company, createdAt |

---

### ۲.۸ صفحات و محتوای سایت
| متد | مسیر | Auth | توضیح |
|-----|------|------|--------|
| GET | / | خیر | سلامت سرور (health check) |
| GET | /api/site/about-us | خیر | داده صفحه درباره ما (ترکیب whyUs, cards, descriptions مطابق فرانت) |
| GET | /api/cms/hero-sections | بله | لیست hero_sections |
| GET | /api/cms/home-page-about | بله | یک رکورد home_page_about |
| GET | /api/cms/contact-us-page | بله | یک رکورد contact_us_page_data |
| PUT | /api/cms/contact-us-page | بله | به‌روزرسانی. بدنه: `{ mainParagraph, subParagraph }` |
| GET | /api/cms/about-us-page | بله | داده درباره ما (whyUs + aboutUsCards + aboutUsDescription) |
| PUT | /api/cms/about-us-page | بله | به‌روزرسانی کل. بدنه: `{ whyUs: {title, description}, aboutUsCards: [{id?, image, title}], aboutUsDescription: [...] }` |
| GET | /api/cms/website-content | بله | ترکیب لوگو، اسلایدر، هیرو، about، company، contact برای لندینگ |
| PUT | /api/cms/website-content | بله | به‌روزرسانی جزئی محتوا |
| GET | /api/cms/company-information | بله | یک رکورد company_information |
| PUT | /api/cms/company-information | بله | بدنه: `{ phoneNumber, emailAddress, companyAddress? }` |
| GET | /api/cms/company-social-links | بله | لیست company_social_links |
| POST | /api/cms/company-social-links | بله | بدنه: `{ title, url }` |
| PUT | /api/cms/company-social-links/:id | بله | بدنه: `{ title, url }` |
| DELETE | /api/cms/company-social-links/:id | بله | حذف لینک |
| GET | /api/cms/questions | بله | لیست سوالات (id, question, answer) |

---

## ۳. خلاصه ارتباطات جدول

- **categories** 1 ──< N **products_full**
- **usages** N ◄── **product_usages** ──► N **products_full**
- **products_full** 1 ──< N **chemical_compositions**
- **products_full** 1 ── 1 **mechanical_properties**
- **products_full** 1 ── 1 **physical_properties**
- **applications** N ◄── **article_applications** ──► N **articles**
- **articles** 1 ──< N **article_sources**

---

## ۴. نکات

- پاسخ‌های لیست می‌توانند به صورت `{ data: [], pagination: { page, limit, total, totalPages } }` یا فقط آرایه باشند؛ فرانت هر دو را هندل می‌کند.
- خطاها: وضعیت ۴۰۱ برای عدم احراز هویت؛ بدنه خطا ترجیحاً `{ error: "متن خطا" }`.
- در GET محصول/مقاله برای سایت و ادمین، روابط (category, usage, application, sources, chemicalComposition, mechanicalProperties, physicalProperties) باید join یا کوئری جدا برگردانده شوند.
