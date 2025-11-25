import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" dir="rtl">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold">صفحه یافت نشد</h2>
        <p className="text-lg text-muted-foreground">
          متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/">بازگشت به صفحه اصلی</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact-us">تماس با ما</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

