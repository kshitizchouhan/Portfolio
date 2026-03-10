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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      connectionTimeout: 15000, 
      tls: {
        rejectUnauthorized: false
      }
    } as any);

    // This is the magic line that fixes the Render IPv6 error
    (transporter as any).options.dns = { family: 4 };

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Sent ONLY to you
      replyTo: email,           // Click 'Reply' in Gmail to talk to the sender
      subject: `New Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #007bff; border-bottom: 2px solid #eee; padding-bottom: 10px;">Portfolio Inquiry</h2>
          <p><strong>Sender Name:</strong> ${name}</p>
          <p><strong>Sender Email:</strong> ${email}</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-line;">${message}</p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email received successfully! ✅");
    return { success: true, messageId: result.messageId };

  } catch (error: any) {
    console.error("Mail Error:", error.message);
    throw error;
  }
};