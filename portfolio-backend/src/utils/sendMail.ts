import { Resend } from 'resend';
import dotenv from "dotenv";

// Dotenv load karein
dotenv.config();

export const sendMail = async (name: string, email: string, message: string) => {
  try {
    // Key ko function ke andar fetch karein taaki 'undefined' ka error na aaye
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not defined in environment variables");
    }

    // Yahan initialize karein
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'chouhankshitiz25@gmail.com',
      subject: `New Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic;">
            "${message}"
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error details:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully! ID:", data?.id);
    return { success: true };

  } catch (error: any) {
    console.error("Mail Delivery Failed:", error.message);
    throw error;
  }
};