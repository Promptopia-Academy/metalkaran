"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center space-y-4 max-w-md">
            <h1 className="text-4xl font-bold text-destructive">خطای سیستم!</h1>
            <p className="text-lg text-muted-foreground">
              خطای جدی در سیستم رخ داده است. لطفاً صفحه را refresh کنید.
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

