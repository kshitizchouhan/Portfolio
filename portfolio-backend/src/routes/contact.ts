import { Router } from "express";
import Message from "../models/message";
import sendMail from "../utils/sendMail";
import validator from "validator";

const router = Router();

router.post("/", async (req, res) => {
  try {

    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address"
      });
    }

    // Block fake/test emails
    const blockedEmails = [
      "test@test.com",
      "test@gmail.com",
      "example@gmail.com",
      "admin@gmail.com"
    ];

    if (blockedEmails.includes(email.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Please use a real email address"
      });
    }

    // Save message to MongoDB
    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    // Try sending email but don't fail API if email fails
    try {
      await sendMail(name, email, message);
    } catch (mailError) {
      console.error("Email sending failed:", mailError);
    }

    // Success response
    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {

    console.error("Contact API error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
});

export default router;