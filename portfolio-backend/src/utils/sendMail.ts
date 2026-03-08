import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465
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
`
    });

  } catch (error) {
    console.error("Email sending failed:", error);
  }

};

export default sendMail;
// import dotenv from "dotenv";
// dotenv.config();

// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// const sendMail = async (name: string, email: string, message: string) => {

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_USER,
//     subject: "New Portfolio Message",
//     text: `
// Name: ${name}
// Email: ${email}
// Message: ${message}
// `
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Thanks for contacting me",
//     text: `
// Hi ${name},

// Thank you for contacting me through my portfolio website.

// I have received your message and will reply soon.

// Best regards,
// Kshitiz Chouhan
// `
//   });

// };

// export default sendMail;
