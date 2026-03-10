import { Router } from "express";
import Message from "../models/message";
import { sendMail } from "../utils/sendMail";
import validator from "validator";

const router = Router();

router.post("/", async (req, res) => {
  try {

    const { name, email, message } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const newMessage = await Message.create({
      name,
      email,
      message
    });

    await sendMail(name, email, message);

    res.status(200).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
});

export default router;