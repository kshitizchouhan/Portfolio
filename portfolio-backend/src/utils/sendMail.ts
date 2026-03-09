import dotenv from "dotenv";
dotenv.config();

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (name: string, email: string, message: string) => {
  try {

    // Email to you
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.EMAIL_USER!,
      subject: "New Portfolio Message",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
`
    });

    // Auto reply to user
    await resend.emails.send({
      from: "Kshitiz Portfolio <onboarding@resend.dev>",
      to: email,
      subject: "Thanks for contacting me",
      text: `
Hi ${name},

Thank you for contacting me through my portfolio website.

I have received your message and will reply soon.

Best regards,
Kshitiz Chouhan
`
    });

    console.log("Emails sent successfully");

  } catch (error) {
    console.error("Resend email error:", error);
  }
};

export default sendMail;