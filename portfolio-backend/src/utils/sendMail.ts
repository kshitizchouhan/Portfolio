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

    // Mail to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Portfolio Message",
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
`
    });

    // Auto reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting me",
      text: `Hi ${name}, thank you for contacting me.`
    });

    console.log("Emails sent successfully");

  } catch (error) {
    console.error("Email error:", error);
  }
};

export default sendMail;