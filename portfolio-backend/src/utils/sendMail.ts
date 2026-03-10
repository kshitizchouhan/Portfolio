import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const sendMail = async (name: string, email: string, message: string) => {
  try {
    // 1. Generate fresh access token
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    if (!accessToken) {
      throw new Error("Failed to generate access token. Check your credentials.");
    }

    // 2. Create Transporter with Cloud-Friendly Settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,              // Switched to 587 for better compatibility on Render
      secure: false,          // Must be false for port 587
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        // This helps bypass the ENETUNREACH/Network issues on cloud servers
        rejectUnauthorized: false 
      }
    } as any);

    // --- 3. ADMIN NOTIFICATION (To You) ---
    const adminMailOptions = {
      from: `"Portfolio Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 10px;">${message}</blockquote>
        </div>
      `,
    };

    // --- 4. AUTO-REPLY (To User) ---
    const autoReplyOptions = {
      from: `"Kshitiz Chouhan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h3>Hello ${name},</h3>
          <p>Thanks for visiting my portfolio. I've received your message and will get back to you shortly.</p>
          <p>Best Regards,<br><strong>Kshitiz Chouhan</strong></p>
        </div>
      `,
    };

    // 5. Execute sending
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(autoReplyOptions);

    console.log("Email sent successfully! ✅");
    return { success: true };

  } catch (error: any) {
    console.error("Mail Delivery Error:", error.message);
    throw error;
  }
};