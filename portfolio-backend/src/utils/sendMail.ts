import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (name: string, email: string, message: string) => {
  try {

    // Email to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Message",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
`,
    });

    // Auto reply to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting me",
      text: `
Hi ${name},

Thank you for contacting me through my portfolio website.
I have received your message and will reply soon.

Best regards,
Kshitiz Chouhan
`,
    });

    console.log("Emails sent successfully");

  } catch (error) {
    console.error("Email error:", error);
  }
};

export default sendMail;