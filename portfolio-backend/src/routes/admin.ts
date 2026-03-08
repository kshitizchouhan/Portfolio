import { Router } from "express";
import Message from "../models/message";
import adminAuth from "../middleware/adminAuth";    

const router = Router();
router.use(adminAuth);
router.get("/messages", async (req, res) => {

  try {

    const messages = await Message.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: messages
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});

export default router;
