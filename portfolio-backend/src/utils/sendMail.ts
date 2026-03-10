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

    // Using Port 587 (Often more open on Render than 465)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Port 587 ke liye false hona chahiye
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      // Render's slow network ke liye timeouts badha diye hain
      connectionTimeout: 30000, 
      greetingTimeout: 30000,
      socketTimeout: 30000,
      tls: {
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
      }
    } as any);

    // FORCE IPv4 (This is crucial for Render)
    (transporter as any).options.dns = { family: 4 };

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Direct Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
          <h3>New Message Received</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        </div>
      `,
    };

    console.log("Attempting to send email via Port 587...");
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully! ✅");
    return { success: true };

  } catch (error: any) {
    console.error("Backend Mail Error:", error.message);
    throw error;
  }
};