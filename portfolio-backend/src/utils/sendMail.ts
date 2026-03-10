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
    const accessTokenResponse = await oauth2Client.getAccessToken();
    const accessToken = accessTokenResponse?.token;

    if (!accessToken) throw new Error("Failed to generate access token.");

    // ULTIMATE CLOUD CONFIGURATION
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      // THIS BLOCK FORCES RENDER TO USE IPV4
      connectionTimeout: 20000, // Increase timeout for slow cloud starts
      greetingTimeout: 20000,
      socketTimeout: 20000,
      tls: {
        rejectUnauthorized: false,
        servername: "smtp.gmail.com"
      }
    } as any);

    // FORCE IPV4: This is the magic line for Render
    (transporter as any).options.dns = { family: 4 };

    // --- Emails ---
    const adminMail = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Message from ${name}`,
      html: `<p><b>From:</b> ${name} (${email})</p><p><b>Message:</b> ${message}</p>`
    };

    const autoReply = {
      from: `"Kshitiz Chouhan" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting me!",
      html: `<p>Hi ${name},</p><p>I have received your message. I'll get back to you soon!</p>`
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(autoReply);

    console.log("Emails sent successfully via IPv4! ✅");
    return { success: true };

  } catch (error: any) {
    console.error("Critical Mail Error:", error.message);
    
    // Fallback log to see if it's still trying IPv6
    if (error.address) {
       console.log("Attempted Address:", error.address); 
    }
    throw error;
  }
};