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
      throw new Error("Failed to generate access token.");
    }

    // 2. Create Transporter using 'service' instead of host/port
    // This helps bypass the IPv6 ENETUNREACH error on Render
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
      // Force IPv4 and TLS settings
      tls: {
        rejectUnauthorized: false
      }
    } as any);

    // --- 3. ADMIN NOTIFICATION (English) ---
    const adminMailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Message from ${name} via Portfolio`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #007bff;">New Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 4px; font-style: italic;">
            "${message}"
          </div>
        </div>
      `,
    };

    // --- 4. AUTO-REPLY (English) ---
    const autoReplyOptions = {
      from: `"Kshitiz Chouhan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out!",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Hi ${name},</h2>
          <p>Thank you for your message! I've successfully received your inquiry through my portfolio website.</p>
          <p>I will get back to you as soon as possible. In the meantime, feel free to check out my latest projects on GitHub.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Kshitiz Chouhan</strong><br />MERN Stack Developer</p>
        </div>
      `,
    };

    // 5. Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(autoReplyOptions);

    console.log("Both emails sent successfully! ✅");
    return { success: true };

  } catch (error: any) {
    console.error("Mail Delivery Error:", error.message);
    throw error;
  }
};