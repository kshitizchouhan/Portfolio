import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

/**
 * Google OAuth2 Client Setup
 * Ensure the Redirect URI matches exactly what you set in Google Cloud Console.
 */
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
      throw new Error("Failed to generate access token. Please check your Refresh Token.");
    }

    // 2. Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    } as any);

    // --- 3. ADMIN NOTIFICATION EMAIL (Sent to you) ---
    const adminMailOptions = {
      from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, 
      replyTo: email, 
      subject: `New Message from ${name} via Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #ddd; padding: 20px;">
          <h2 style="color: #007bff;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 10px; border-radius: 5px;">
            ${message}
          </div>
        </div>
      `,
    };

    // --- 4. AUTO-REPLY EMAIL (Sent to the User) ---
    const autoReplyOptions = {
      from: `Kshitiz Chouhan <${process.env.EMAIL_USER}>`,
      to: email, 
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #007bff;">Hello ${name},</h2>
          <p>Thank you for contacting me through my portfolio. I have received your message and I appreciate you reaching out!</p>
          <p>I will review your message and get back to you as soon as possible.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Kshitiz Chouhan</strong><br />MERN Stack Developer</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(autoReplyOptions);

    console.log("Admin notification and Auto-reply sent successfully! ✅");
    return { success: true };

  } catch (error: any) {
    console.error("Mail Delivery Error:", error.message);
    throw error;
  }
};