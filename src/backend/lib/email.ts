"use server";

import { IContactFormData } from "@/types/type";
import nodemailer from "nodemailer";
import { getEnvConfig } from "./env";
import { logger } from "./logger";

function createTransporter() {
  const envConfig = getEnvConfig();

  if (!envConfig.email.enabled) {
    throw new Error("Email service is not configured");
  }

  if (!envConfig.email.user || !envConfig.email.pass) {
    throw new Error("SMTP credentials not configured");
  }

  return nodemailer.createTransport({
    host: envConfig.email.host,
    port: envConfig.email.port,
    secure: envConfig.email.secure,
    auth: {
      user: envConfig.email.user,
      pass: envConfig.email.pass,
    },
  });
}

export async function sendContactEmail(data: IContactFormData): Promise<void> {
  try {
    const envConfig = getEnvConfig();

    if (!envConfig.email.enabled) {
      logger.warn("Email service is disabled, skipping contact email");
      return;
    }

    const transporter = createTransporter();
    const adminEmail = envConfig.email.adminEmail || envConfig.email.user;

    const mailOptions = {
      from: `"Metalkaran Contact Form" <${envConfig.email.user}>`,
      to: adminEmail,
      subject: `پیام جدید از فرم تماس - ${data.name}`,
      html: `
        <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #3e536b; margin-bottom: 20px;">پیام جدید از فرم تماس</h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 10px 0;"><strong>نام:</strong> ${data.name}</p>
              <p style="margin: 10px 0;"><strong>ایمیل:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p style="margin: 10px 0;"><strong>شماره تماس:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
              <p style="margin: 10px 0;"><strong>نام شرکت:</strong> ${data.company}</p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              این ایمیل به صورت خودکار از فرم تماس وب‌سایت Metalkaran ارسال شده است.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info("Contact email sent successfully", { to: adminEmail });
  } catch (error) {
    logger.error("Error sending contact email", error as Error);
    throw error;
  }
}

export async function sendConfirmationEmail(
  userEmail: string,
  userName: string
): Promise<void> {
  try {
    const envConfig = getEnvConfig();

    if (!envConfig.email.enabled) {
      logger.warn("Email service is disabled, skipping confirmation email");
      return;
    }

    const transporter = createTransporter();

    const mailOptions = {
      from: `"Metalkaran" <${envConfig.email.user}>`,
      to: userEmail,
      subject: "دریافت پیام شما - Metalkaran",
      html: `
        <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #3e536b; margin-bottom: 20px;">سلام ${userName} عزیز</h2>
            
            <p style="color: #333; line-height: 1.8; margin-bottom: 20px;">
              با تشکر از تماس شما با ما. پیام شما با موفقیت دریافت شد و همکاران ما در اسرع وقت با شما تماس خواهند گرفت.
            </p>
            
            <div style="background-color: #dfe5e6; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #3e536b;"><strong>تیم Metalkaran</strong></p>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              این یک ایمیل خودکار است. لطفاً به این ایمیل پاسخ ندهید.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    logger.info("Confirmation email sent successfully", { to: userEmail });
  } catch (error) {
    logger.error("Error sending confirmation email", error as Error);
  }
}
