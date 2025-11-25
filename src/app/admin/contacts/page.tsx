"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IContact } from "@/types/type";
import { api } from "@/lib/api";
import { Mail, Phone, Building, Calendar } from "lucide-react";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const savedApiKey = localStorage.getItem("admin_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      loadContacts(savedApiKey);
    } else {
      setLoading(false);
    }
  }, []);

  const loadContacts = async (key: string) => {
    try {
      setLoading(true);
      const response = await api.getContacts(key);
      if (response.success) {
        setContacts(response.data || []);
      }
    } catch (error: any) {
      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        alert("لطفاً ابتدا API Key را در تنظیمات وارد کنید");
      }
      console.error("Error loading contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (!apiKey) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">
            برای مشاهده پیام‌های تماس، لطفاً ابتدا API Key را در تنظیمات وارد
            کنید
          </p>
          <a href="/admin/settings" className="text-primary hover:underline">
            رفتن به تنظیمات
          </a>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">پیام‌های تماس</h1>
        <p className="text-muted-foreground">
          مشاهده و مدیریت پیام‌های دریافتی از کاربران
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">در حال بارگذاری...</div>
      ) : contacts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            پیامی دریافت نشده است
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{contact.name}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {formatDate(contact.createdAt)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">ایمیل</p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        شماره تماس
                      </p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-primary hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:col-span-2">
                    <Building className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">نام شرکت</p>
                      <p>{contact.company}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
