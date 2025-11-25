"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" dir="rtl">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-4xl font-bold text-destructive">خطا!</h1>
        <p className="text-lg text-muted-foreground">
          متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.
        </p>
        {process.env.NODE_ENV === "development" && (
          <div className="p-4 bg-destructive/10 rounded-lg text-sm text-left">
            <p className="font-semibold mb-2">جزئیات خطا (فقط در development):</p>
            <pre className="whitespace-pre-wrap break-words">
              {error.message}
            </pre>
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <Button onClick={reset} variant="default">
            تلاش مجدد
          </Button>
          <Button onClick={() => (window.location.href = "/")} variant="outline">
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </div>
    </div>
  );
}

