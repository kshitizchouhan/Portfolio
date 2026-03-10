import { Resend } from 'resend';
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (name: string, email: string, message: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'chouhankshitiz25@gmail.com', // Aapka login/verified email
      subject: `New Message from ${name}`,
      replyTo: email, // Jab aap reply karenge toh user ko jayega
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
      console.error("Resend API Error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent via Resend successfully! ✅", data?.id);
    return { success: true };

  } catch (error: any) {
    console.error("Mail Delivery Failed:", error.message);
    throw error;
  }
};