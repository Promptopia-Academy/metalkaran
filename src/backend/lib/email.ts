import { IContactFormData } from "@/types/type";
import nodemailer from "nodemailer";

const emailConfig = {
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

function createTransporter() {
  if (!emailConfig.auth.user || !emailConfig.auth.pass) {
    throw new Error("SMTP credentials not configured");
  }

  return nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: emailConfig.auth,
  });
}

export async function sendContactEmail(data: IContactFormData): Promise<void> {
  try {
    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || emailConfig.auth.user;

    const mailOptions = {
      from: `"Metalkaran Contact Form" <${emailConfig.auth.user}>`,
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
    console.log("Contact email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendConfirmationEmail(
  userEmail: string,
  userName: string
): Promise<void> {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Metalkaran" <${emailConfig.auth.user}>`,
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
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
}
