import { Router } from "express";
import Message from "../models/message";
import sendMail from "../utils/sendMail";
import validator from "validator";

const router = Router();

router.post("/", async (req, res) => {

  try {

    const { name, email, message } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email"
      });
    }

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

    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    await sendMail(name, email, message);

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }

});

export default router;
