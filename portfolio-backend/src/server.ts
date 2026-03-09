import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import adminRoute from "./routes/admin";
import connectDB from "./config/db";
import contactRoute from "./routes/contact";

dotenv.config();

const app = express();

// Fix for Render proxy
app.set("trust proxy", 1);

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Spam protection
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests
  message: "Too many requests, please try again later."
});

// Apply rate limit to contact API
app.use("/api/contact", limiter);

// Routes
app.use("/api/admin", adminRoute);
app.use("/api/contact", contactRoute);

// Health check route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});