import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendMail = async (name: string, email: string, message: string) => {
  try {

    // Email notification to you
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Portfolio Message",
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
`
    });

    // Auto reply to user
    await transporter.sendMail({
      from: `"Kshitiz Portfolio" <${process.env.EMAIL_USER}>`,
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
    console.error("Email error:", error);
  }
};

export default sendMail;