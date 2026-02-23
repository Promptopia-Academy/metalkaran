"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadImage, getImageUrl } from "@/lib/cms/uploadImageApi";

type UsageImageUploaderProps = {
  value: string;
  onChange: (path: string) => void;
  disabled?: boolean;
};

/**
 * آپلودر تصویر برای هر ردیف کاربرد (ریپیتینگ) در فرم محصول ادمین.
 * به‌جای آدرس دستی، فایل آپلود می‌شود و مسیر برگشتی از API ست می‌شود.
 */
export function UsageImageUploader({
  value,
  onChange,
  disabled,
}: UsageImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const path = await uploadImage(file);
      onChange(path);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در آپلود");
    } finally {
      setUploading(false);
    }
  };

  const imageUrl = value ? getImageUrl(value) : "";

  return (
    <div className="flex items-center gap-2 flex-1 min-w-[180px]">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || uploading}
      />
      {imageUrl && (
        <div className="shrink-0 w-10 h-10 rounded border overflow-hidden bg-muted">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading}
        >
          {uploading ? "در حال آپلود…" : value ? "تغییر تصویر" : "آپلود تصویر"}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-destructive hover:text-destructive"
            onClick={() => onChange("")}
            disabled={disabled || uploading}
          >
            حذف تصویر
          </Button>
        )}
        {error && (
          <span className="text-xs text-destructive">{error}</span>
        )}
      </div>
    </div>
  );
}
